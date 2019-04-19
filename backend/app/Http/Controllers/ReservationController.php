<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ad;
use App\Reservation;
use App\User;
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
     * @param id (Ad id)
     */
    public function book(Request $request, $id){
        // Verify user role
        if(! auth()->user()->hasRole(User::$ROLES["partner"])){
            return response()->json(["message" => "Unauthorized, only partners can book cars"], 404);
        }
        // Check if Ad exists
        $ad = Ad::find($id);
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);

        // Check if User is not the Ad owner
        if($ad->car->user == auth()->user()){
            return response()->json(["message" => "You cannot book your own car"], 401);
        }
        // Check if Ad status is false
        if($ad->status)
            return response()->json(["message" => "This car was already booked"], 401);
        
        // Check if user has an ongoing Reservation

        // Everything OK => Insert Reservation with ad id and authenticated user id
        $reservation = new Reservation;
        $reservation->comment = request('comment');
        $reservation->ad_id = $id;
        $reservation->user_id = auth()->user()->id;
        if($reservation->save()){
            // Make Ad unavailable
            $ad->status = true;
            $ad->save();
            return response()->json(["message" => "Reservation successfully added"], 200);
        }
        return response()->json(["message" => "There was a problem inserting the reservation"], 500);

    }

}
