<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['status', 'ad_id', 'reservator_id', 'created_at', 'updated_at', 'reservator_id'];
    // Relationship with Score
    public function scores(){
        return $this->hasMany('\App\Score');
    }
    
    // Relationship with Ad
    public function ad(){
        return $this->belongsTo('\App\Ad');
    }

    // Relationship with User(Reservator)
    public function reservator(){
        return $this->belongsTo('\App\User');
    }
}
