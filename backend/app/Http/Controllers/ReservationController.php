<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ad;
use App\Reservation;
use App\User;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\ReservationCollection;
use App\Http\Resources\AdResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use App\Mail\PartnerMustConfirmReservation;
use Illuminate\Support\Facades\Mail;
use App\Mail\CancelEmail;

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
        // Check if Ad has not expired 
        if($ad->end_date < \Carbon\Carbon::now())
            return response()->json(["message" => "Ad has already expired"], 422);
        // Check if Ad status is available (status == false)
        if($ad->status)
            return response()->json(["message" => "This car was already booked"], 409);
        
        // Check if user has an ongoing Reservation
        $ads = \DB::table('ads')
                ->whereBetween('start_date', [$ad->start_date, $ad->end_date])
                    ->join('reservations', 'ads.id', '=', 'reservations.ad_id')
                    ->where('reservations.reservator_id', '=', $request->id)
                ->get();
                
        if(count($ads))
            return response()->json(["message" => "You have ongoing or pending reservations in this period"], 409);
        
        // Validate Request
        $validation = $this->verifyRequest($request);
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
            Mail::to($reservation->ad->user->email)->send(new PartnerMustConfirmReservation($reservation));
            // Start CRON Job Now (Partner has to validate reservation)
            return response()->json(["message" => "Reservation successfully added"], 200);
        }
        return response()->json(["message" => "There was a problem inserting the reservation"], 500);
    }


    /**
     * Partner validates Reservation
     * 
     * @return JSONResponse
     */
    public function valid($id){
        $reservation = Reservation::find($id);
        if($reservation == null)
            return response()->json(["message" => "Reservation was not found"], 404);
        $ad = $reservation->first()->ad;
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);
        if(!auth()->user()->ads->contains($ad))
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
    
        $ad = $reservation->ad;
        if($ad == null)
            return response()->json(["message" => "Ad was not found"], 404);
        if(! $ad->status)
            return response()->json(["message" => "Ad was already cancelled"], 422);
            
        if(auth()->user()->ads->contains($ad))
            $sendTo = $reservation->reservator->email;

        if(auth()->user()->email == $reservation->reservator->email){
            $sendTo = auth()->user()->email;
        }
        // Cancel reservation
        $reservation->status = false;
        $reservation->ad->status = false;
        if($reservation->save() and $reservation->ad->save()){
            $whoCanceled = auth()->user();
            Mail::to($sendTo)->send(new CancelEmail($reservation, $whoCanceled));
            return response()->json(["message" => "Reservation cancelled successfully"], 200);
        }
        return response()->json(["message" => "There was a problem cancelling the reservation"], 500);
    }


    /**
     * Get Authenticated Partner Ads' Reservations
     * 
     */
    public function index(){
        // Check if User is a Partner
        if(auth()->user()->hasRole(User::$ROLES["partner"])){
            // return reservations associated to parnter's ads  
            $ads = auth()->user()->ads;
            $reservations = \DB::table('reservations')
            ->join('ads', 'ads.id', '=', 'reservations.ad_id')
            ->select('reservations.*')
            ->where('ads.user_id', '=', auth()->user()->id)
            ->get();
            foreach($reservations as $reservation){
                $reservation->ad = new AdResource(Ad::find($reservation->ad_id));
                $reservation->reservator = new UserResource(User::find($reservation->reservator_id));
            }
            return response()->json(["reservations" => $reservations->toArray()], 200);
        }
        else if(auth()->user()->hasRole(User::$ROLES["client"])){
            $reservations = auth()->user()->reservations;
            foreach($reservations as $reservation){
                $reservation->ad = new AdResource(Ad::find($reservation->ad_id));
            }
            return response()->json(["reservations" => $reservations->toArray()], 200);            
        }
        return response()->json(["message" => "Unauthorized"], 401);
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
            return response()->json(["message" => $validator->messages()->toArray()], 422);
        return null;
    }

}
