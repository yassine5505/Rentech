<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Score;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Reservation;
use App\Mail\ClientEvaluationMail;
use Illuminate\Support\Facades\Mail;

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
