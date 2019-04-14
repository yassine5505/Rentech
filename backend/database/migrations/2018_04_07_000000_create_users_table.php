<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\User;
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cin')->nullable();
            $table->string('name');
            $table->string('driving_license_number')->nullable();
            $table->string('address')->nullable();
            $table->string('telephone')->nullable();
            $table->string('role')->default(User::$ROLES["client"]); //["accepted_values" => "client", "partner" , "admin"]
            $table->boolean('status')->default(false);
            $table->integer('city_id')->unsigned();
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('city_id')->references('id')->on('cities');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
