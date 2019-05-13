<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Ad extends Model
{
    /**
     * Fillable Property
     * 
     * @var mixed
     */
    protected $fillable = [
        "description","start_date","end_date","status","price","car_id","city_id"
    ];

    // Relationship with Reservation
    public function reservations(){
        return $this->hasMany('\App\Reservation');
    }

    //Relationship with Car
    public function car(){
        return $this->belongsTo('\App\Car');
    }

    // Relationship with City
    public function city(){
        return $this->belongsTo('\App\City');
    }

    // Relationship with User
    public function user(){
        return $this->belongsTo('\App\User');
    }


    /**
     * 
     * Get total revenue(Price) from Completed Ads
     */
    public static function totalRevenues(){
        return  Ad::where('status', '=', 2)
                  ->sum('price');
    }


    /**
     * 
     * Lost Revenue (From Canceled Ads)
     * @return int
     */
    public static function lostRevenues(){
        return  Ad::where('status', '=', 3)
                  ->sum('price');
    }


    /**
     * 
     * Entreprise Revenue : 10% of total Revenues
     */
    public static function entrepriseRevenue(){
        return Ad::totalRevenues() * (20 / 100);
    }


    /**
     * Number of finished Ads from past year
     * @return int
     */
    public static function adStat(){
        $from = Carbon::now()->subYear();
        $to = Carbon::now();
        $finishedAds = Ad::whereBetween('start_date', [$from, $to])
                          ->orderBy('start_date', 'desc')
                          ->get();
        
        // Current Dates
        $month = (int)date('m') - 1;
        $year = date('Y');
        // Array to return
        $finishedAdsAssoc = array();
        // Init first element with current month
        $finishedAdsAssoc[Ad::monthFR(Carbon::now()) . '-' . $year] =  [
            'finished_ads' => 0,
            'canceled_ads' => 0 
        ];
        
        // Initialize all elements starting from current month
        for($i = 1; $i < 12; $i++, $month--){
            if($month == 0) {
                $month = 12;
                $year--;
            }
            $monthFRStr = Ad::monthFRFromNumeric($month);
            $finishedAdsAssoc[$monthFRStr . '-' . $year ] = [
                'finished_ads' => 0,
                'canceled_ads' => 0 
            ];
        }
        foreach($finishedAds as $ad){
            // Map ads to the corresponding month
            // 
            if($ad->status == 2)
                $finishedAdsAssoc[Ad::monthFR($ad->start_date) . '-' . $ad->year()]['finished_ads']++;
            else if($ad->status == 3)
                $finishedAdsAssoc[Ad::monthFR($ad->start_date) . '-' . $ad->year()]['canceled_ads']++;
        }
        return $finishedAdsAssoc;
    }

    /**
     * Get Ad month
     * @return int
     */
    public function month(){
        return Ad::monthFR($this->start_date);
    }


    /**
     * Get Ad year
     * @return int
     */
    public function year(){
        return (int) date("Y", strtotime($this->start_date));
    }


    /**
     * Get month Name (FR) from date
     * @return String
     */
    public static function monthFR($dateString){
        switch(date("F", strtotime($dateString))){
            case 'January' : return 'Janvier';
            case 'February' : return 'Fevrier';
            case 'March' : return 'Mars';
            case 'April' : return 'Avril';
            case 'May' : return 'Mai';
            case 'June' : return 'Juin';
            case 'July' : return 'Juillet';
            case 'August' : return 'Aout';
            case 'September' : return 'Septembre';
            case 'October' : return 'Octobre';
            case 'November' : return 'Novembre';
            case 'December' : return 'Decembre';
        }
    }


    /**
     * Get MonthFR from Month(Numeric)
     */
    public static function monthFRFromNumeric($month){
        switch($month){
            case 1 : return 'Janvier';
            case 2 : return 'Fevrier';
            case 3 : return 'Avril';
            case 4 : return 'Avril';
            case 5 : return 'Mai';
            case 6 : return 'Juin';
            case 7 : return 'Juillet';
            case 8 : return 'Aout';
            case 9 : return 'Septembre';
            case 10 : return 'Octobre';
            case 11 : return 'Novembre';
            case 12 : return 'Decembre';
        }
    }
}