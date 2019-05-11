<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Score;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Reservation;
use App\Http\Resources\UserResource;
use App\Http\Resources\CarResource;
use App\Http\Resources\AdResource;

class ScoreController extends Controller
{
    
    // Constructor
    public function __construct(){
        $this->middleware('auth:api');
    }

    /**
     * 
     * Evaluate a Client
     * 
     * @param Request
     */
    public function evaluateUser(Request $request){
        $validator = $this->verifyRequest($request);
        if($validator != null)
            return $validator;
        $score = $this->createScore($request, 'user');
        if(! $score)
            return response()->json(["message" => "There was an error evaluating the user"], 500);
        return response()->json(["message" => "Score created successfully"], 200);
    }


    /**
     * 
     * Evaluate a Car
     * 
     * @param Request
     */
    public function evaluateCar(Request $request){
        $validator = $this->verifyRequest($request, "car");
        if($validator != null)
            return $validator;
        $score = $this->createScore($request, 'car');
        if(! $score)
            return response()->json(["message" => "There was an error evaluating the user"], 500);
        return response()->json(["message" => "Score created successfully"], 200);
    }


    /**
     * 
     * Verify if the ( car/ad_owner) | (reservation) 
     * has been scored by the current user
     * 
     * @param Request
     */
    public function verify(Request $request){

        if(!auth()->user()->hasRole(User::$ROLES["partner"])
         && !auth()->user()->hasRole(User::$ROLES["client"]) ){
            return response()->json(["message" => "Unauthorized"], 401);
            
        }
        $reservation = Reservation::find(request('reservation_id'));

        // If it's a client
        if( $reservation && $reservation->reservator_id == auth()->user()->id){
            $scores = \DB::table("reservations")
            // status = 1 for validated reservations
            ->where("reservations.id", "=" , $reservation->id)
            ->where("reservations.status", "=" , 1)
            ->join('scores', function ($join) {
                $join->on('scores.reservation_id', '=', 'reservations.id')
                ->where("scores.user_id", "=" , auth()->user()->id);
            })
            ->select("scores.to_id", "scores.car_id")
            ->get();
            // Si il a déja noté le client
            if(count($scores) > 1) {
                return response()->json(["message" => "Vous avez déja évalué la prestation de cet utilisateur !"], 404); 
            }

            // Si il a noté 0 | 1 fois
            return response()->json(
                [
                    "status" => 
                        ["carReview" => 
                            (count($scores) == 0 ) ||
                            (count($scores) == 1 && $scores[0]["car_id"] !== null),
                        "ownerReview" =>
                            (count($scores) == 0 ) ||
                            (count($scores) == 1 && $scores[0]["to_id"] !== null),
                         "to_info" => new UserResource($reservation->ad->user),
                         "car_info" => new CarResource($reservation->ad->car),
                         "ad_info" => new AdResource($reservation->ad) 
                        ]
                ]
            , 200);
        }

        // If the user is the owner of the reservation's ad
        if( $reservation && $reservation->ad->user_id == auth()->user()->id){
            $scores = \DB::table("reservations")
            // status = 1 for validated reservations
            ->where("reservations.id", "=" , $reservation->id)
            ->where("reservations.status", "=" , 1)
            ->join('scores', function ($join) {
                $join->on('scores.reservation_id', '=', 'reservations.id')
                ->where("scores.user_id", "=" , auth()->user()->id);
            })
            ->select("scores.to_id", "scores.car_id")
            ->get();
            // Si il a déja noté le client
            if(count($scores) > 0) {
                return response()->json(["message" => "Vous avez déja noté cet utilisateur !"], 404); 
            }

            // Si il n a pas encore noté le client
            return response()->json(
                [
                    "status" => 
                        [
                            "carReview" => false,
                            "ownerReview" => true,
                            "to_info" => new UserResource($reservation->reservator),
                            "car_info" => new CarResource($reservation->ad->car),
                            "ad_info" => new AdResource($reservation->ad) 
                        ]
                ]
            , 200);
        }
        return response()->json(["message" => "This reservation don't concern yourself !"], 404); 
  }


    /**
     * Verify Request
     * 
     * @param Request
     */
    public function verifyRequest(Request $request, $type = "user"){
        $validator = Validator::make(request()->all(), $this->rule($type));
        if($validator->fails())
            return response()->json(["message" => $validator->messages()->toArray()], 422);
        return null;
    }


    /**
     * Create Score from Request
     * 
     * @param Request
     */
    public function createScore(Request $request, $scoreType = "user"){
        $score = new Score;
        $score->amount = request('amount');
        $score->positive_comment = request('positive_comment');
        $score->negative_comment = request('negative_comment');
        $score->user_id = auth()->user()->id;
        $score->reservation_id = request('reservation_id');
        if($scoreType == 'car')
            $score->car_id = request('car_id');
        else
            $score->to_id = request('to_id');
        if($score->save())
            return $score;
        return false;
    }
    /**
     * 
     * Rule used to evaluate an entity (Car or User)
     * 
     * @param Request
     */
    public function rule($type = 'user'){
        if($type == 'user'){
            return [
                'amount' => ['required', 'integer', 'between:1,5'],
                'positive_comment' => ['string', 'max:191'],
                'negative_comment' => ['string', 'max:191'],
                'to_id' => ['required', 'integer', 'exists:users,id'],
                'reservation_id' => ['required', 'integer', 'exists:reservations,id']
            ];
        }

        else if($type == 'car'){
            return [
                'amount' => ['required', 'integer', 'between:1,5'],
                'positive_comment' => ['required', 'string', 'max:191'],
                'negative_comment' => ['required', 'string', 'max:191'],
                'car_id' => ['required', 'integer', 'exists:cars,id'],
                'reservation_id' => ['required', 'integer', 'exists:reservations,id']
            ];
        }
    }
}
