<?php

use Illuminate\Database\Seeder;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $this->command->info("Creating a city.");

        // Create the City
        $city = factory(App\City::class, 1)->create();

        $this->command->info('City Created!');
    }
}
