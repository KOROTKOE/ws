<?php

namespace App\Http\Controllers;

use App\Http\Resources\StationSearchResource;
use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function search(Request $request)
    {
        $station = StationSearchResource::collection(Station::where('name','like','%'.$request['query'].'%')
            ->orWhere('city','like','%'.$request['query'].'%')
            ->orWhere('iata','like','%'.$request['query'].'%')
            ->get());
        return response()->json([
            'data' =>['items' => $station]
        ],200);
    }
}
