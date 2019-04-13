<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('amount')->nullable();
            $table->string('comment')->nullable();
            $table->string('to_id')->nullable(); // User qui va etre commente
            $table->integer('user_id')->nullable()->unsigned();
            $table->integer('car_id')->nullable()->unsigned();
            $table->foreign('user_id')->references('id')->on('users');    
            $table->foreign('car_id')->references('id')->on('cars');    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
}
