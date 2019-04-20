<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    /**
     * Fillable Property
     * 
     * @var mixed
     */
    protected $fillable = [
        "description","start_date","end_date","status","price","car_id","city_id"
    ];

    // Relationship with Reservation
    public function reservations(){
        return $this->hasMany('\App\Reservation');
    }

    //Relationship with Car
    public function car(){
        return $this->hasOne('\App\Car', 'id');
    }

    // Relationship with City
    public function city(){
        return $this->belongsTo('\App\City');
    }

    // Relationship with User
    public function user(){
        return $this->belongsTo('\App\User');
    }
}
