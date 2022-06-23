<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlightSearchRequest;
use App\Http\Resources\FlightCollection;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function search(FlightSearchRequest $request)
    {
        $flightsTo = new FlightCollection(Flight::select('flights.*')
            ->join('stations','stations.id','=','flights.from_id')
            ->where('stations.iata',$request->from)
            ->join('stations as stationsTwo','stationsTwo.id','=','flights.to_id')
            ->where('stationsTwo.iata',$request->to)
            ->get(),$request->date1);
        $flightsBack = [];
        if ($request->date2)
            $flightsBack = new FlightCollection(Flight::select('flights.*')
                ->join('stations','stations.id','=','flights.from_id')
                ->where('stations.iata',$request->to)
                ->join('stations as stationsTwo','stationsTwo.id','=','flights.to_id')
                ->where('stationsTwo.iata',$request->from)
                ->get(),$request->date2);

        return response()->json([
            'data' => [
                'flights_to' => $flightsTo,
                'flights_back' => $flightsBack
            ]
        ]);
    }
}
