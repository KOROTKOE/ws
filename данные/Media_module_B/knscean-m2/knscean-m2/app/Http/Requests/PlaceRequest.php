<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceRequest extends ApiRequest
{

    public function rules()
    {
        return [
            'passenger' => ['required','integer','exists:passengers,id'],
            'seat' => ['required','string','max:3'],
            'type' => ['required', 'in:from,back']
        ];
    }
}
