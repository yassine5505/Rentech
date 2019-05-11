<?php

use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        "id" => null,
        'cin' => $faker->sentence(5),
        'name' => $faker->name,
        'driving_license_number'  => $faker->isbn10,
        'address' => $faker->streetAddress ,
        'telephone' => $faker->phoneNumber ,
        'role' => $faker->randomElement($array = array ('CLIENT','ADMIN','PARTNER')),
        'status' => 1 ,
        'email' => $faker->unique()->safeEmail,
        'password' => 'ValdoRValdoR'
    ];
});
