<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Car;
use App\Http\Resources\CarCollection;
use App\Http\Resources\ImageResource;
use App\Http\Resources\ImageCollection;
use App\Http\Resources\ScoreCollection;
use App\Image;
class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'brand' => $this->brand,
            'model' => $this->model,
            'production_year' => $this->production_year,
            'mileage' => $this->mileage,
            'color' => $this->color,
            'category' => $this->category,
            'matricule' => $this->matricule,
            'transmission' => $this->transmission,
            'motor' => $this->motor,
            'airbag' => $this->airbag,
            'centralized' => $this->centralized,
            'abs' => $this->abs,
            'images' => new ImageCollection($this->images),
            'score' => new ScoreCollection('single', $this->scores)
        ];
    }
}
