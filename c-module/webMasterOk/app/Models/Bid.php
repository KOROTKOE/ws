<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $fillable = [
        'address','description','max_price','agreed_price','photo_before_url','photo_after_url','status','category_id','user_id'
    ];
}
