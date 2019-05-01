<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Htp\Resources\AdResource;
use App\Htp\Resources\UserResource;
class ReservationResource extends JsonResource
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
            'status' -> $this->status,
            // 'created_at' -> $this->created_at,
            // 'updated_at' -> $this->updated_at,
            // 'ad' => new AdResource($this->ad),
            // 'reservator' => new UserResource($this->reservator)
        ];
    }
}
