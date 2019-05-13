<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    //protected $fillable = ["user_id", "brand", "model", "driving_license_number", "production_year", "color", "mileage"];
    protected $guarded = [];

    // Custom Model Methods
    public $scores;
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
     * Car relationship with Score
     */
    public function scores(){
        return $this->hasMany('\App\Score');
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


    /**
     * 
     * Return 5 Latest Scores that belong to a Car
     * @return Score
     */
    public function latestScores($id){
        return Score::where('car_id', '=', $id)
                      ->orderBy('created_at', 'desc')
                      ->limit(10)
                      ->get();
    }

    /**
     * Count Cars
     */
    public static function totalCars($partner_id = null){
        $total =  count(Car::all());
        if(! is_null($partner_id)){
            // Get all cars belonging to this partner
            $total  = count(Car::where('user_id', '=', $partner_id)->get());
        }
        return $total;
    }
}
