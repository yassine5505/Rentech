<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ["user_id", "brand", "model", "driving_license_number", "production_year", "color", "mileage"];


    // Custom Model Methods

    /*
     * Get Car Image
     * 
     * @return \App\Image
     *
     */
    public function images(){
        return $this->hasMany('\App\Image');
    }

    /*
     * Get Car Owner (User)
     * 
     * @return \App\User
     *
     */
    public function user(){
        return $this->belongsTo('\App\User');
    }

    /*
     * Relationship with Ad
     *
     */
    public function ad(){
        return $this->hasMany('\App\Ad');
    }

    /**
     * 
     * Check if Car exists
     */
    public static function carExists($id){
        if(Car::find($id) == null){
            return false;
        }
        return true;
    }

}
