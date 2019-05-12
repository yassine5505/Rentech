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
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password does\'t exist'], 401);
        }
        return $this->respondWithToken($token);
    }


    public function signup(Request $request)
    {
        $this->validateRequest($request, "signup");
        $request["status"] = false;
        if($this->hasParams($request, ["driving_license_number", "address", "telephone", "cin"])){
            $request["status"] = true;
        }
        try{
            // First Create User (Might throw DB or Validator exceptions)
            $user = User::create(request(["cin", "name", "driving_license_number", "address", "telephone", "role", "city_id", "email", "password", "status"]));
            
            // Then Upload Image and Insert in DB
            if($request->hasFile('image')){
                $imageToInsert = new Image();
                $imageToInsert->url = $request->file('image')->store('user-images');
                $imageToInsert->user_id = $user->id;
                $imageToInsert->save();
            }
        }
        catch(QueryException $ex){
            return response()->json(["message" => $ex->errorInfo], 409);
        }
        return $this->login();
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user()->only(['id', 'name', 'email', 'driving_license_number', 'address', 'telephone', 'role', 'status', 'image', 'city']));
    }


    /**
     * Update authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request){
        $validator = $this->validateRequest($request, "update");
        if($validator != true)
            return $validator;
        auth()->user()->address = $request->address;
        auth()->user()->telephone = $request->telephone;
        if(!is_null($request->password) and ! is_null($request->city_id)){
            auth()->user()->password = $request->password;
            auth()->user()->city_id = $request->city_id;
        }
            
        if(auth()->user()->save())  
            return response()->json(['message' => 'Profile updated successfully'], 200);
        return response()->json(['message' => 'Error while updating profile'], 500);
        
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 300,
            'user' => auth()->user()->only(['id', 'name', 'email', 'driving_license_number', 'address', 'telephone', 'role', 'status', 'city', 'image']),
        ]);
    }


    /*
     * Validate User Input when  Signing Up or Updating
     * 
     * @param Request 
     * 
     * @return Response || true
     * 
     */
    public function validateRequest(Request $request, $validationType)
    {
        $rule = [];
        if($validationType == "signup"){
            $rule = [
                'image' => ['mimes:jpg,jpeg,png,svg'],
                'cin' => ['string', 'max:191'],
                'name' => ['required', 'string', 'max:191'],
                'driving_license_number' => ['string', 'max:191'],
                'address' => ['string' , 'max:191'],
                'telephone' => ['string', 'max:191'],
                'role' => ['string', 'max:191'],
                'city_id' => ['required', 'int'],
                'email' => ['required', 'string', 'email', 'max:191', 'unique:users'],
                'password' => ['required', 'string']
            ];
        }
        else if ($validationType == "update"){
            $rule = [
                'address' => ['string' , 'max:191'],
                'telephone' => ['string', 'max:191'],
                'city_id' => ['int'],
                'password' => ['string' , 'max:191']
            ];
        }

        $validator = Validator::make($request->all(), $rule);
        if ($validator->fails()){
            return response()->json(["message" => $validator->messages()->toArray()], 422);
        }
        return true;
    }
    
    /**
     * Verify that request has specified parameters
     * 
     * @param $params
     */
    public function hasParams(Request $request, $params){
        foreach($params as $p){
            if(! $request->has($p)){
                return false;
            }
        }
        return true;
    }
}
