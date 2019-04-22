<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CarResource;
use App\Http\Resources\CityResource;
class AdResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // dd($this);
        return [
            "id" => $this->id,
            "description"=>$this->description,
            "start_date"=>$this->start_date,
            "end_date"=>$this->end_date,
            "status"=>$this->status,
            "price"=>$this->price,
            "car" => new CarResource($this->car),
            "city" => new CityResource($this->city)
        ];
    }
}
