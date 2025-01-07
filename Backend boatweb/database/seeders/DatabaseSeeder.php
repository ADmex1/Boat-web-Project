<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
//This is the seeder file for the boats table
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            BoatSeeder::class
        ]);
    }
}
