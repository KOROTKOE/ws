<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_from','flight_back','date_from','date_back','code'
    ];

    public function passengers()
    {
        return $this->hasMany(Passenger::class);
    }

    protected static function boot()
    {
        parent::boot();
        self::creating(function ($query) {
            $query->code = self::generateCode();
        });
    }
    public static function generateCode() {
        do {
            $letterns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $code = '';
            for ($i = 0; $i<5; $i++) {
                $code .=$letterns[rand(0,25)];
            }
        } while (Booking::where('code',$code)->count());
        return $code;
    }

    public function flightFrom()
    {
        return $this->belongsTo(Flight::class,
            'flight_from',
            'id');
    }

    public function flightBack()
    {
        return $this->belongsTo(Flight::class,
            'flight_back',
            'id');
    }
}
