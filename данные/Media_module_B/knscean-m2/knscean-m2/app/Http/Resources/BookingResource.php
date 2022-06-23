<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Booking;

class BookingResource extends JsonResource
{
    private function getFlights() {
        $flights = [];
        $flights[] = new FlightResource($this->flightFrom,$this->date_from);
        if ($this->flightBack)
            $flights[] = new FlightResource($this->flightBack, $this->date_back);
        return $flights;
    }
    public function toArray($request)
    {
        return [
            'code' => $this->code,
            'cost' => ($this->flightFrom['cost'] + $this->flightBack['cost']) * $this->passengers->count(),
            'flights' => $this->getFlights(),
            'passengers' => PassengerBookingResource::collection($this->passengers)
        ];
    }
}
