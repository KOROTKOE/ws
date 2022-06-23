<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_code','from_id','to_id','time_from','time_to','cost'
    ];

    public function stationFrom()
    {
        return $this->belongsTo(Station::class,
            'from_id',
            'id');
    }

    public function stationTo()
    {
        return $this->belongsTo(Station::class,
            'to_id',
            'id');
    }

    public function getAvailability($date)
    {
        $bookings = Booking::where('date_from',$date)
            ->orWhere('date_back',$date);
        $bookings = $bookings->where('flight_back',$this->id)
            ->orWhere('flight_from',$this->id);
        $bookings = $bookings->get();
        $bookings_count = 0;
        foreach($bookings as $booking) {
            $bookings_count+=$booking->passengers->count();
        }
        return 100 - $bookings_count;
    }
}
