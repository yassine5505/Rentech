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
        $this->validateSignUpRequest($request);
        try{
            // First Create User
            $user = User::create($request->all());
            // Then Upload Image and Insert in DB
            if($request->hasFile('image')){
                $path = $request->file('image')->store('user-images');
                $imageToInsert = new Image();
                $imageToInsert->url = $path;
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
        return response()->json(Auth::user());
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
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    /*
     * Validate User Input when Signing up or Updating thei info
     * 
     * @param Request 
     * 
     * @return Response || true
     * 
     */
    public function validateSignUpRequest(Request $request)
    {
        $validator = Validator::make($request->toArray(), [
            'image' => ['required', 'mimes:jpg,jpeg,png,svg'],
            'cin' => ['required', 'string', 'max:191'],
            'name' => ['required', 'string', 'max:191'],
            'driving_license_number' => ['required', 'string', 'max:191'],
            'address' => ['required', 'string' , 'max:191'],
            'telephone' => ['required', 'string', 'max:191'],
            'role' => ['required', 'string', 'max:191'],
            'status' => ['required', 'boolean'],
            'city_id' => ['required', 'int'],
            'email' => ['required', 'string', 'email', 'max:191', 'unique:users'],
            'password' => ['required', 'string']
        ]);
        
        if ($validator->fails()){
            return response()->json(["message" => $validator->messages()->toArray()]);
        }
        return true;
    }
}