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
            return response()->json(["message" => "This car was already booked"], 401);
        
        // Check if user has an ongoing Reservation
        $ads = \DB::table('ads')
                ->whereBetween('start_date', [$ad->start_date, $ad->end_date])
                ->where('status', true)
                ->get();
        if($ads)
            return response()->json(["message" => "You have ongoing reservations."], 401);
        // Everything OK => Insert Reservation with ad id and authenticated user id
        $reservation = new Reservation;
        $reservation->comment = request('comment');
        $reservation->ad_id = request('ad_id');
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
