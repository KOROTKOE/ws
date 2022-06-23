<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\BookingResource;
use App\Http\Resources\UserInfoResource;
use App\Models\Passenger;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    { 
		User::create($request->all());
		
		return response()->json()->setStatusCode(204);		
		
    }

    public function login(LoginRequest $request)
    {
        if ($user = User::where('phone',$request->phone)->first() and
        $user->password === $request->password) {
            $user->generateToken();
            return response()->json([
                'data' => ['token' => $user->api_token]
            ], 200);
        }
        return response()->json([
            'error' => [
                'code' => 401,
                'message' => 'Unauthorized',
                'errors' => [
                    'phone' => ['phone or password incorrect']                ]
            ]
        ], 401);
    }

    public function getBookings()
    {
        $passengers = Passenger::where('document_number', Auth::user()->document_number)->get();
        $response = [
            'data' => [
                'items' => []
            ]
        ];
        foreach ($passengers as $passenger) {
            $response['data']['items'][] = new BookingResource($passenger->booking);
        }
        return response()->json($response);
    }

    public function show() {
        return response()->json(new UserInfoResource(Auth::user()));
    }

    public function logout()
    {
        Auth::user()->api_token = null;
        Auth::user()->save();
    }
}
