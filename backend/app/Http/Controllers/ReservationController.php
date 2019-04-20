<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ad;
use App\Reservation;
use App\User;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\ReservationCollection;
use Illuminate\Support\Arr;
class ReservationController extends Controller
{
    /**
     * Require authentication
     * 
     */
    public function __construct(){
        $this->middleware('auth:api');
    }

    /**
     * Book a Car via an Ad 
     * 
     * Partner has to validate Reservation within 2 hours
     * 
     * @param id (Ad id)
     */
    public function create(Request $request){
        // Verify user role
        if(! auth()->user()->hasRole(User::$ROLES["client"])){
            return response()->json(["message" => "Unauthorized, only clients can book cars"], 404);
        }
        // Check if Ad exists
        $ad = Ad::find(request('ad_id'));
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);

        // Check if Ad status is available (status == false)
        if($ad->status)
            return response()->json(["message" => "This car was already booked"], 409);
        
        // Check if user has an ongoing Reservation
        $ads = \DB::table('ads')
                ->whereBetween('start_date', [$ad->start_date, $ad->end_date])
                ->get();
        if($ads)
            return response()->json(["message" => "You have ongoign or pending reservations in this period"], 409);
        
        // Validate Request
        $validation = $this>verifyRequest($request);
        if($validation != null) 
            return $validation;// Validation failed => Return JSON Response

        // Everything OK => Insert Reservation with ad id and authenticated user id
        $reservation = new Reservation;
        $reservation->ad_id = request('ad_id');
        $reservation->reservator_id = auth()->user()->id;
        if($reservation->save()){
            // Make Ad unavailable
            $ad->status = true;
            $ad->save();
            return response()->json(["message" => "Reservation successfully added"], 200);
        }
        return response()->json(["message" => "There was a problem inserting the reservation"], 500);
    }


    /**
     * Partner validates Reservation
     * 
     * @return JSONResponse
     */
    public function validate($id){
        $reservation = Reservation::find($id);
        if($reservation == null)
            return response()->json(["message" => "Reservation was not found"], 404);
        $ad = $reservation->first()->ad;
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);
        if(auth()->user()->ads->contains($ad))
            return response()->json(["message" => "Unauthorized"], 401);
        $reservation->status = true;
        if($reservation->save())
            return response()->json(["message" => "Reservation validated successfully"], 200);
        return response()->json(["message" => "There was a problem updating the reservation"], 500);
    }


    /**
     * Cancel Reservation
     * 
     * @return JSONResponse
     */
    public function cancel($id){
        $reservation = Reservation::find($id);
        if($reservation == null)
            return response()->json(["message" => "Reservation was not found"], 404);
        $ad = $reservation->first()->ad;
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);
        if(auth()->user()->ads->contains($ad))
            return response()->json(["message" => "Unauthorized"], 401);
        if($reservation->delete())
            return response()->json(["message" => "Reservation cancelled"]);
    }


    /**
     * Get Authenticated Partner Ads' Reservations
     * 
     */
    public function index(){
        // Check if User is a Partner
        if(! auth()->user()->hasRole(User::$ROLES["partner"]))
            return response()->json(["message" => "Unauthorized"], 401);
        // return reservations associated to parnter s ads  
        $ads = auth()->user()->ads;
        $reservations = array();
        foreach($ads as $ad){
            $reservations[] = $ad->reservations;
        }
        $reservations = Arr::flatten($reservations);
        return new ReservationCollection($reservations);
    }
    


    /**
     * Verify Request
     * 
     * @return JSONResponse 
     */
    public function verifyRequest(Request $request){
        $rule = [
            "status" => ["boolean"],
            "ad_id" => ["required" ,"integer", "exists:ads,id"]
        ];
        $validator = Validator::make(request()->all(), $rule);
        if($validator->fails())
            return response()->json(["message" => $validator->messages()->toArray()]);
        return null;
    }

}
