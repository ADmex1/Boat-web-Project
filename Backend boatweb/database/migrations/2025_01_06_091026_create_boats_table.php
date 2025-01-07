<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoatsTable extends Migration
{
    public function up()
    {
        Schema::create('boats', function (Blueprint $table) {
            $table->id();
            $table->string('boat_name');
            $table->integer('capacity');
            $table->string('price_range');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('boats');
    }
} 