<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class FlightResource extends JsonResource
{
    private $date;
    public function __construct($resource, $date)
    {
        parent::__construct($resource);
        $this->date = $date;
    }

    public function toArray($request)
    {
        return [
            'flight_id' => $this->id,
            'flight_code' => $this->flight_code,
            'from' => [
                'city' => $this->stationFrom->city,
                'station' => $this->stationFrom->name,
                'iata' => $this->stationFrom->iata,
                'date' => $this->date,
                'time' => Carbon::createFromFormat('H:i:s', $this->time_from)->format('H:i')
            ],
            'to' => [
                'city' => $this->stationTo->city,
                'station' => $this->stationTo->name,
                'iata' => $this->stationTo->iata,
                'date' => $this->date,
                'time' => Carbon::createFromFormat('H:i:s', $this->time_to)->format('H:i')
            ],
            'cost' => $this->cost,
            'availability' => $this->getAvailability($this->date)
        ];
    }
}
