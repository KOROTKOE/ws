<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlightSearchRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'from' => ['required', 'string', 'exists:stations,iata'],
            'to' => ['required', 'string', 'exists:stations,iata'],
            'date1' => ['required', 'date','date_format:"Y-m-d"'],
            'date2' => ['required', 'date','date_format:"Y-m-d"'],
            'passengers' => ['required', 'integer', 'between:1,6'],
        ];
    }
}
