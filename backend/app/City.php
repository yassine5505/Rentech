<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    
    protected $fillable = [
        "name", "description"  
    ];

    /**
     * City Relationship With User
     *
     */
    public function users(){
        return $this->hasMany('\App\User');
    }

    // Relationship with City
    public function city(){
        return $this->hasOne('\App\Ad');
    }
}
