<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
//This is the seeder file for the boats table
class BoatSeeder extends Seeder
{
    public function run()
    {
        DB::table('boats')->insert([
            [
                'boat_name' => 'Dolphin Seeker I',
                'capacity' => 8,
                'price_range' => 'IDR 350,000 - 400,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'boat_name' => 'Ocean Explorer',
                'capacity' => 12,
                'price_range' => 'IDR 450,000 - 500,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'boat_name' => 'Lovina Star',
                'capacity' => 10,
                'price_range' => 'IDR 400,000 - 450,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'boat_name' => 'Sunrise Voyager',
                'capacity' => 15,
                'price_range' => 'IDR 500,000 - 600,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'boat_name' => 'Dolphin Watch Pro',
                'capacity' => 6,
                'price_range' => 'IDR 300,000 - 350,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'boat_name' => 'Bali Explorer',
                'capacity' => 20,
                'price_range' => 'IDR 600,000 - 700,000',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}
