<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','cin', 'driving_license_number', 'address', 'telephone','role', 'status', 'city_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The Role Types a User can have
     * 
     * @var array
     */
    public static $ROLES = [
        "admin" => "ADMIN",
        "partner" => "PARTNER",
        "client" => "CLIENT"
    ];
    // Custom Model Methods 

    /*
     * User Relationship with Image
     * 
     */ 
    public function image(){
        return $this->hasOne('\App\Image');
    }



    /*
     * Get User Cars 
     * 
     */ 
    public function cars(){
        return $this->hasMany('\App\Car');  
    }


    /*
     * User relationship With City 
     * 
     */ 
    public function city(){
        return $this->belongsTo('\App\City');
    }

    /*
     * User relationship With Score : Given Scores
     * 
     */
    public function scores(){
        return $this->hasMany('\App\Score', 'user_id');
    }

    /**
     * User Relationship with Score: Received Scores
     */
    public function reviews(){
        return $this->hasMany('\App\Score', 'to_id');
    }


    /**
     * User Relationship with Ad
     */
    public function ads(){
        return $this->hasMany('\App\Ad');
    }


    /**
     * Relationship with Reservation 
     * 
     * Describes which reservations the user has reservated
     */
    public function reservations(){
        return $this->hasMany('\App\Reservation', 'reservator_id');
    }

    /*
     * Verify User role
     * 
     * @param String 
     * 
     * @return boolean
     * 
     */ 
    public function hasRole($role){
        if(strtoupper($this->role) == strtoupper($role)){
            return true;
        }
        return false;
    }

    /**
     * 
     * Get lstest Scores
     */
    public function latestScores(){
        return Score::where('to_id', '=', $this->id)
                     ->orderBy('created_at', 'desc')
                     ->limit(10)
                     ->get();
    }


    /**
     * Get Total Partners
     * @return int
     */
    public static function totalPartners(){
        $partners = User::where('role', '=', User::$ROLES['partner'])->get();
        return count($partners);
    }
 
    /**
     * Get Total Clients
     * @return int
     */
     public static function totalClients(){
         $clients = User::where('role', '=', User::$ROLES['client'])->get();
         return count($clients);
    }
 
    /**
     * Get total Users
     * @return int
     */
     public static function totalUsers(){
         return User::totalPartners() + User::totalClients();
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
