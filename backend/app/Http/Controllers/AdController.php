<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use App\User;
use App\Ad;
use App\Car;
use App\City;
use App\Http\Resources\AdResource;
use App\Http\Resources\AdCollection;
class AdController extends Controller
{
    
    /**
     * Require User Authentication
     * 
     */
    public function __construct(){
        $this->middleware('auth:api', ["except" => ["all", "show"]]);
    }

    /**
     * Create New Ad if User Role is Partner
     * 
     */
    public function create(Request $request){
        if(auth()->user()->hasRole(User::$ROLES["partner"]) and auth()->user()->status){
            $validation = $this->verifyRequest($request, "create");
            if($validation != null){
                return $validation;
            }
            if( Car::carExists(request('car_id')) && City::cityExists(request('city_id')) && auth()->user()->cars->contains(request("car_id"))){
                $ad = new Ad;
                $ad->car_id = request('car_id');
                $ad->city_id = request('city_id');
                $ad->user_id = auth()->user()->id;
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
     * Get Authenticated User's Ads
     * 
     * @return AdResource
     */
    public function index(){
        // Verify User 
        if(! auth()->user()->hasRole(User::$ROLES["partner"])){
            return response()->json(["message" => "Unauthorized"], 404);
        }
        return new AdCollection(auth()->user()->ads);
    }


    /**
     * Get All Active Ads
     * 
     * @return Response
     */
    public function all(){
        return new AdCollection(Ad::where('status', 0)->get());
    }


    /**
     * Update Ad Only If requested By Owner
     * 
     */
    public function update(Request $request, $id){
        $ad = Ad::find($id);
        if($ad == null)
            return response()->json(["message" => "Ad not found"], 404);
        if(! auth()->user()->ads->find($id) == $ad)
            return response()->json(["message" => "Unauthorized", 401]); 
        $validation = $this->verifyRequest($request, "update");
        if($validation != null){
            return $validation;

        }
        $ad->description = $request->description;
        $ad->start_date = $request->start_date;
        $ad->end_date = $request->end_date;
        $ad->price = $request->price;
        if($ad->save())
            return response()->json(["message" => "Ad updated successfully"], 200);
        return response()->json(["message" => "Ad not updated", 500]);
    }


    /**
     * Update Ad 
     * 
     * @return JsonResponse
     * 
     */
    public function delete($id){
        // Only Ad Owner can delete the Ad
        $ad = Ad::find($id);
        if($ad == null)
            return response()->json(["message" => "Ad not found"], 404);
        if(! auth()->user()->ads->find($id) == $ad)
            return response()->json(["message" => "Unauthorized", 401]); 
        // Delete the Ad
        if(Ad::destroy($id))
            return response()->json(["message" => "Ad deleted successfully"], 200);
        return response()->json(["message" => "There was an error deleting the Ad"], 500);
    }


    /**
     * Show one Ad 
     * 
     * @return AdResource
     * 
     */
    public function show($id){
        $ad = Ad::find($id);
        if($ad == null)
            return response()->json(["message" => "Ad not found"], 404);
        return new AdResource($ad);
    }

    /**
     * Verify Request
     * 
     * @return Response
     */
    public function verifyRequest(Request $request, $validationType = "create"){
        $rule = [
            'description' => ['required', 'string', 'max:191'],
            'start_date' => ['required', 'date_format:Y/m/d H:i', 'after:'. date("Y/m/d H:i")],
            'end_date' => ['required', 'date_format:Y/m/d H:i', 'after:start_date'],
            'status' => ['boolean'],
            'price' => ['required', 'regex:/^\d*(\.\d{2})?$/'],
            'car_id' => ['required', 'integer'],
            'city_id' => ['required', 'integer']
        ];
        if($validationType == "update"){
            $rule = [
                'description' => ['string', 'max:191'],
                'start_date' => ['date_format:Y/m/d H:i', 'after:'. date("Y/m/d H:i")],
                'end_date' => ['date_format:Y/m/d H:i', 'after:start_date'],
                'status' => ['boolean'],
                'price' => ['regex:/^\d*(\.\d{2})?$/'],
                'car_id' => ['integer'],
                'city_id' => ['integer']
            ];
        }
        $validator = Validator::make(request()->all(), $rule);
        if($validator->fails()){
            return response()->json(["message" => $validator->messages()->toArray()]);
        }
        return null;
    }


    /**
     * Verify User Role
     * 
     * @return Response
     */
    public function verifyRole($role){
        if(! auth()->user()->hasRole($role)){
            return response()->json(["message" => "Unauthorized"], 404);
        }
        return;
    }
}
