<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\ScoreCollection;

class ScoreCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'scores' => ScoreResource::collection($this->collection),
            'score_count' => $this->collection->count(),
            'score_average' => $this->average(),
        ];
    }

    /**
     * 
     * Return Scores Average Amount
     */
    public function average(){
        $i = 0;
        $total = 0;
        for($i = 0; $i < count($this->collection); $i++){
            $total += $this->collection[$i]->amount;
        }
        return (int)round($total/$i);
    }
}
