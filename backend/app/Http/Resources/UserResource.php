<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CityResource;
use App\User;
use App\Http\Resources\CarCollection;
use App\Http\Resources\ImageResource;
use App\Http\Resources\Scoreollection;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {   
        $cars = null;
        if($this::hasRole(User::$ROLES["partner"]))
            // Get User Cars
            $cars =  new CarCollection($this->cars);

        return [
            "id" => $this->id,
            "cin" => $this->cin,
            "name" => $this->name,
            "driving_license_number" => $this->driving_license_number,
            "address" => $this->address,
            "telephone" => $this->telephone,
            "role" => $this->role,
            "status" => $this->status,
            "scores" => new ScoreCollection(ScoreCollection::$ALL, $this->latestScores($this->id)),
            "city" => new CityResource($this->city),
            "image" => new ImageResource($this->image),
            "cars" => $cars,
        ];
    }
}
