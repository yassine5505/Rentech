<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\AdminStatResource;
class StatController extends Controller
{
    /**
     * Constructor
     */
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function stat(){
        if(auth()->user()->hasRole(User::$ROLES['admin']))
            return new AdminStatResource();
        else if(auth()->user()->hasRole(User::$ROLES['partner']))
            return new PartnerStatResource();

    }
}
