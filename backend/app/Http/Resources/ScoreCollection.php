<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\ScoreCollection;

class ScoreCollection extends ResourceCollection
{

    /**
     * @var Collection type
     */
    public $type;

    /**
     * @var all variable to get all Scores
     */
    public static $ALL = 'all';

    /**
     * @var single variable to get all Scores
     */
    public static $SINGLE = 'single';


    /**
     * 
     * Constructor
     */
    public function __construct($type, $resource){
        parent::__construct($resource);
        $this->type = $type;
    }


    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if($this->type == ScoreCollection::$ALL){
            return [
                'scores' => ScoreResource::collection($this->collection),
                'score_count' => $this->collection->count(),
                'score_average' => $this->average(),
            ];
        }
        else if($this->type == ScoreCollection::$SINGLE){
            return [
                'score_count' => $this->collection->count(),
                'score_average' => $this->average(),
            ];
        }
        
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
        if($i == 0)
            return 3;
        return (int)round($total/$i);
    }
}
