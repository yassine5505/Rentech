<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // Relationship with Score
    public function scores(){
        return $this->hasMany('\App\Score');
    }
    
    // Relationship with Ad
    public function ad(){
        return $this->hasOne('\App\Ad');
    }

    // Relationship with User(Reservator)
    public function reservator(){
        return $this->hasOne('\App\User');
    }
}
