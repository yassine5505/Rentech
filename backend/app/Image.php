<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Car;
class Image extends Model
{
    protected $fillable = ["url", "description", "user_id", "car_id"];

    // Custom Model Methods

    /*
     * Get User associated to this image 
     * 
     * @return \App\User or null
     * 
     */
    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }


    /*
     * Get Car associated to this image 
     * 
     * @return \App\Car or null
     * 
     */
    public function car(){
        return $this->belongsTo('App\Car', 'car_id');
    }
}
