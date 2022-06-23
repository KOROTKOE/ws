<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/station', [\App\Http\Controllers\StationController::class, 'search']);
    Route::get('/flight', [\App\Http\Controllers\FlightController::class, 'search']);
    Route::post('/booking', [\App\Http\Controllers\BookingController::class, 'store']);
    Route::get('/booking/{code}', [\App\Http\Controllers\BookingController::class, 'show']);
    Route::get('/booking/{code}/seat', [\App\Http\Controllers\BookingController::class, 'getSeats']);
    Route::patch('/booking/{code}/seat', [\App\Http\Controllers\PassengerController::class, 'takePlace']);

    Route::middleware('auth:api')->get('/user/booking', [\App\Http\Controllers\UserController::class, 'getBookings']);
    Route::middleware('auth:api')->get('/user', [\App\Http\Controllers\UserController::class, 'show']);
    Route::middleware('auth:api')->delete('/logout', [App\Http\Controllers\UserController::class, 'logout']);

