<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Carbon;

class FlightCollection extends ResourceCollection
{
   private $date;
   public function __construct($resource, $dateFromController = null)
   {
       parent::__construct($resource);
       $this->date = $dateFromController;
   }

    public function toArray($request)
    {
        return $this->collection->map(function ($flight){
            return [
                'flight_id' => $flight->id,
                'flight_code' =>$flight->flight_code,
                'from' => [
                    'city' => $flight->stationFrom->city,
                    'station' => $flight->stationFrom->name,
                    'iata' => $flight->stationFrom->iata,
                    'date' => $this->date,
                    'time' => Carbon::createFromFormat('H:i:s',$flight->time_from)->format('H:i')
                ],
                'to' => [
                    'city' => $flight->stationTo->city,
                    'station' => $flight->stationTo->name,
                    'iata' => $flight->stationTo->iata,
                    'date' => $this->date,
                    'time' => Carbon::createFromFormat('H:i:s',$flight->time_to)->format('H:i')
                ],
                'cost'=> $flight->cost,
                'availability' => $flight->getAvailability($this->date)
            ];
        });
    }
}
