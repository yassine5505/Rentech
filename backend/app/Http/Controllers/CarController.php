<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Database\QueryException ;
use App\User;
use App\Image;
use App\Car;
use App\Http\Resources\CarResource;
use App\Http\Resources\CarCollection;
class CarController extends Controller
{


    /**
     * 
     * Auth Middleware
     * 
     */
    public function __construct(){
        $this->middleware('auth:api');
    }

    /**
     * List all Cars
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new CarCollection(Car::all());
    }

    /**
     * Create a new Car
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validateRequest($request, "create");
        $user = auth()->user();
        if(! $user->hasRole(User::$ROLES["admin"]))
            return response()->json(["message" => "Unauthorized. User must be of type Partner"],401);
        $user->car = new Car;
        $user->car->user_id  = $user->id;
        $user->car->brand = request("brand");
        $user->car->model = request("model");
        $user->car->production_year = request("production_year");
        $user->car->mileage = request("mileage");
        $user->car->color = request("color");
        $user->car->category = request("category");
        $user->car->matricule = request("matricule");
        $user->car->transmission = request("transmission");
        $user->car->motor = request("motor");
        $user->car->airbag = request("airbag");
        $user->car->centralized = request("centralized");
        $user->car->abs = request("abs");
        if(! $user->car->save()){
            return response()->json(["message" => "Car not inserted"], 500);
        }
        if($request->hasFile("images")){
            $user->car->images = $request->file('images');
            foreach($user->car->images as $uploadedImage){
                $image = new Image;
                $image->url = $uploadedImage->store('car-images');
                $image->description = $user->car->brand . " " . $user->car->model;
                $image->car_id = $user->car->id;
                if(! $image->save()){
                    return response()->json(["message" => "Image not inserted"], 500);
                }
            }
        }
        return response()->json(["message" => "Car inserted successfully"], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $car = Car::find($id)->first();
        if($car == null)
            return response()->json(["message" => "Car not found"],404);

        $this->validateRequest($request, "update");
        $car->update($request->all());
        if($request->hasFile("images")){
            foreach($request->file("images") as $image){
                $car->image = new Image;
                $car->image->car_id = $id;
                $car->image->url = $image->store('car-images');
                $car->image->description = $car->model . " " . $car->Brand;
                $car->image->save();
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        //
    }

    /**
     * Validate Request when Creating or Updating a Car
     * 
     * @return Response
     */
    public function validateRequest(Request $request, $validationType)
    {
        $rule = [];
        if($validationType == "create"){
            $rule = [
                'images[]' => ['required', 'mimes:jpg,jpeg,png,svg'],
                'name' => ['required', 'string', 'max:191'],
                'brand' => ['required', 'string', 'max:191'],
                'model' => ['required', 'string' , 'max:191'],
                'production_year' => ['required', 'string', 'max:191'],
                'mileage' => ['int'],
                'color' => ['max:191'],
                'category' => ['max:191'],
                'matricule' => ['max:191'],
                'transmission' => ['max:191', 'in:automatic,manual'],//Automatique Ou Vitesse
                'motor' => ['max:191', 'in:electric,diesel,gasoil,hybrid'],
                'airbag' => ['boolean'],
                'centralized' => ['boolean'],
                'abs' => ['boolean']
            ];
        }
        else if ($validationType == "update"){
            $rule = [
                'images[]' => ['mimes:jpg,jpeg,png,svg'],
                'name' => ['string', 'max:191'],
                'brand' => ['string', 'max:191'],
                'model' => ['string' , 'max:191'],
                'production_year' => ['string', 'max:191'],
                'mileage' => ['int'],
                'color' => ['string', 'max:191'],
                'category' => ['string', 'max:191'],
                'matricule' => ['string', 'max:191'],
                'transmission' => ['string', 'max:191', 'in:automatic,manual'],//Automatique Ou Vitesse
                'motor' => ['string', 'max:191', 'in:electric,diesel,gasoil,hybrid'],
                'airbag' => ['boolean'],
                'centralized' => ['boolean'],
                'abs' => ['boolean']
            ];
        }

        $validator = Validator::make($request->all(), $rule);
        if ($validator->fails()){
            return response()->json(["message" => $validator->messages()->toArray()]);
        }
        return true;
    }
}
