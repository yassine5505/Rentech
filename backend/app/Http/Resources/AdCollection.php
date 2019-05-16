<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\AdResource;

class AdCollection extends ResourceCollection
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
            'ads' => AdResource::collection($this->collection)->sortBy('start_date'),
            'ad_count' => $this->collection->count(),
        ];
    }
}
