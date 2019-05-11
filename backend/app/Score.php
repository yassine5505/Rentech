<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    

    // Score relationship with Reservation
    public function reservation(){
        return $this->belongsTo('\App\Reservation');
    }

    // Relationship with User : Who Scored
    public function commentor(){
        return $this->belongsTo('\App\User', 'user_id');
    }

    // Relationship with User : Who received the Score
    public function commentee(){
        return $this->belongsTo('\App\User', 'to_id');
    }

    // Relationship with Car
    public function car(){
        return $this->belongsTo('\App\Car', 'car_id');
    }
    
}
