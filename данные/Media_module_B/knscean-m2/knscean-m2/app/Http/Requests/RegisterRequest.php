<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\ApiRequest;

class RegisterRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'=>['required', 'string'],
            'last_name'=>['required', 'string'],
            'phone'=>['required','string','unique:users'],
            'document_number'=>['required','string','digits:10'],
            'password'=>['required','string']
        ];
    }

}
