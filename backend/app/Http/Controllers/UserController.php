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
class UserController extends Controller
{
    /**
     * New Authentiation 
     * 
     * 
     */
    public function __construct(){
        $this->middleware('auth:api');
    }
    /**
     * 
     * Get All Users
     * 
     * @return Response
     * 
     */
    public function index(){
        if(auth()->user()->hasRole("admin")){
            return response()->json(User::all());
        }
        return response()->json(["message" => "Unauthorized"], 409);
    }

    /**
     * 
     * Get User by Id
     * 
     * @return Response
     * 
     */
    public function user(){
        $user = User::find(request("id"));
        if($user == null)
            return response()->json(["message" => "User not found"], 404);
        return response()->json($user->only(['id', 'name', 'email', 'driving_license_number', 'address', 'telephone', 'role', 'status', 'city_id', 'image', 'city']));  
    }

    /**
     * 
     * Delete User by Id
     * 
     * @return Response
     * 
     */
    public function delete(){
        $userToDelete = User::find(request('id'));
        if(User::destroy(request('id'))){
            return response()->json(["message" => "User deleted"]);
        }
        return response()->json(["message" => "User not deleted"], 404);
    }
    
}
