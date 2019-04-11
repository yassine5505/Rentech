<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    // Relationship with Reservation
    public function ad(){
        return $this->hasOne('\App\Reservation');
    }

    //Relationship with Car
    public function car(){
        return $this->hasOne('\App\Car');
    }

    // Relationship with City
    public function city(){
        return $this->hasOne('\App\City');
    }

}
