<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if(! is_null($this->car)){
            return [
                'id' => $this->id,
                'amount' => $this->amount,
                'positive_comment' => $this->positive_comment,
                'negative_comment' => $this->negative_comment,
                'user_info' => $this->commentor,
                'car_info' => $this->car,
                'reservation' => $this->reservation
            ];
        }
        if(! is_null($this->commentee)){
            return [
                'id' => $this->id,
                'amount' => $this->amount,
                'positive_comment' => $this->positive_comment,
                'negative_comment' => $this->negative_comment,
                'user_info' => $this->commentor,
                'to_info' => $this->commentee,
                'reservation' => $this->reservation
            ];
        }
    }
}
