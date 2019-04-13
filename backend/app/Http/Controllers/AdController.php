<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use App\User;
use App\Ad;
use App\Car;
use App\City;

class AdController extends Controller
{
    /**
     * Require User Authentication
     * 
     */
    public function __construct(){
        $this->middleware('auth:api');
    }

    /**
     * Create New Ad if User Role is Partner
     * 
     */
    public function create(Request $request){
        if(auth()->user()->hasRole(User::$ROLES["partner"])){
            $this->validateRequest($request, "create");
            if( Car::carExists(request('car_id')) && City::cityExists(request('city_id')) && auth()->user()->cars->contains(request("car_id"))){
                $ad = new Ad;
                $ad->car_id = request('car_id');
                $ad->city_id = request('city_id');
                $ad->description = request('description');
                $ad->start_date = request('start_date');
                $ad->end_date = request('end_date');
                $ad->status = request('status');
                $ad->price = request('price');
                if($ad->save()){
                    return response()->json(["message" => "Ad created successfully"]);
                }
                return response()->json(["message" => "There was a problem creating the ad"], 500);
            }
            return response()->json(["message" => "Car or city does not exist "], 404); 
        }
        return response()->json(["message" => "Unauthorized"], 401);
    }

    /**
     * Validate Request
     * 
     */
    public function validateRequest(Request $request, $validationType = "create"){
        $rule = [
            'description' => ['required', 'string', 'max:191'],
            'start_date' => ['date', 'date_format:Y-m-d'],
            'end_date' => ['required', 'date', 'date_format:Y-m-d', 'after:start_date'],
            'status' => ['boolean'],
            'price' => ['required', 'regex:/^\d*(\.\d{2})?$/'],
            'car_id' => ['required', 'integer'],
            'city_id' => ['required', 'integer']
        ];
        if($validationType == "update"){
            $rule = [
                'description' => ['string', 'max:191'],
                'start_date' => ['date', 'date_format:Y-m-d'],
                'end_date' => ['date', 'date_format:Y-m-d', 'after:start_date'],
                'status' => ['boolean'],
                'price' => ['regex:/^\d*(\.\d{2})?$/'],
                'car_id' => ['integer'],
                'city_id' => ['integer']
            ];
        }
        $validator = Validator::make(request()->all(), $rule);
        if($validator -> fails()){
            return response()->json(["message" => $validator->messages()->toArray()]);
        }
        return true;
    }

    /**
     * Verify That Car Exists Or Redirect
     */
    public function checkCar($id){
        if(! Car::carExists($id)){
            return response()->json(["message" => "error"], 404);
        }
        return true;
    }

    /**
     * Verify That City Exists Or Redirect
     */
    public function checkCity($id){
        if(! City::cityExists($id)){
            return response()->json(["message" => "City not found"], 404);
        }
        return true;
    }
}
