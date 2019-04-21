<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CityCollection;
use App\Http\Resources\CityResource;
use App\City;
class CityController extends Controller
{

    /**
     * Get all Cities as Collection
     * 
     * @return CityCollection
     */
    public function index(){
        return new CityCollection(City::all());
    }


    /**
     * Create  new City
     * 
     */
    public function create(Request $request){
        $this->validateRequest($request, "create");
        City::create([
            'name' => request('name'),
            'description' => request('description')
        ]);
        return response()->json(["message" => "City created successfully"], 200);
    }


    /**
     * Update a City
     */
    public function update(Request $request){
        $city = City::find(request('id'));
        if($city == null)
            return response()->json(["message" => "City not found", 404]);

        $city->update(["name" => request('name'), "description" => request("description")]);
        return response()->json(["message" => "City updated successfully"], 200);
    }


    /**
     * Get one City as A Resource
     */
    public function show(Request $request){
        $city = City::find(request('id'));
        if ($city == null) 
            return response()->json(["message" => "City not found"], 404);
        return new CityResource($city);
    }

    
    /**
     * Validate Request 
     */
    public function validateRequest(Request $request, $validationType = "create"){
        $rule = [
            "name" => ['required', 'string', 'max:191'],
            "description" => ['string', 'max:191']
        ];
        if($validationType == "update"){
            $rule = [
                "name" => ['string', 'max:191'],
                "description" => ['string', 'max:191']
            ];
        }
        $validator = Validator::make(request()->all(), $rule);
        if($validator->fails()){
            return response()->json(["message" => $validator->messages()->toArray()], 422);
        }
        return true;
    }
}
