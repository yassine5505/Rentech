<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Car;
use App\Ad;
class PartnerStatResource extends JsonResource
{
    /**
     * @var User id
     */
    public $partnerId;
    /**
     * Override parent constructor
     */
    public function __construct($id){
        $this->partnerId = $id;
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
            'total_cars' => Car::totalCars($this->partnerId),
            'total_revenues' => Ad::totalRevenues($this->partnerId),
            'lost_revenues' => Ad::lostRevenues($this->partnerId),
            'ads' => Ad::adStat($this->partnerId),
            'revenues_stats' => Ad::revenueStat(2, $this->partnerId), // 2 = Finished ads
            'lost_revenues_stats' => Ad::revenueStat(3, $this->partnerId), // 3 = Finished ads status
        ];
    }
}
