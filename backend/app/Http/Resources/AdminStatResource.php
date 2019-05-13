<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Car;
use App\Ad;
class AdminStatResource extends JsonResource
{

    /**
     * Override parent Construcor
     */
    public function __construct(){

    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'total_partners' => User::totalPartners(),
            'total_clients' => User::totalClients(),
            'total_users' => User::totalUsers(),
            'total_cars' => Car::totalCars(),
            'total_revenues' => Ad::totalRevenues(),
            'lost_revenues' => Ad::lostRevenues(),
            'entreprise_revenue' => Ad::entrepriseRevenue(),
            'ads' => Ad::adStat()
        ];
    }

    
}
