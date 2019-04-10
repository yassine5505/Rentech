<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    

    /**
     * City Relationship With User
     *
     */
    public function users(){
        return $this->hasMany('\App\User');
    }
}
