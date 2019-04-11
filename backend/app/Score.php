<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    // Score relationship with User
    public function user(){
        return $this->belongsTo('\App\User');
    }

    // Score relationship with Reservation
    public function reservation(){
        return $this->belongsTo('\App\Reservation');
    }


}
