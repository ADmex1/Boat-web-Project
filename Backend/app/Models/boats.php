<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class boats extends Model
{
    protected $table = 'boats'; 

    protected $fillable = [
        'boat_name',
        'capacity',
        'price_range'
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class, 'boat_id');
    }
}