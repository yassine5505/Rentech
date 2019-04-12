<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('brand');
            $table->string('model');
            $table->string('production_year')->nullable();
            $table->integer('mileage')->nullable();
            $table->string('color')->nullable();
            $table->string('category')->nullable();
            $table->string('matricule')->nullable();
            $table->string('transmission')->nullable(); // Vitesse
            $table->string('motor')->nullable();
            $table->boolean('airbag')->default(false);
            $table->boolean('centralized')->default(false);
            $table->boolean('abs')->default(false);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
