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
        return $this->belongsTo('\App\User');
    }

    // Relationship with User : Who received the Score
    public function commentee(){
        return $this->belongsTo('\App\User');
    }

}
