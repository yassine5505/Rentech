<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create the City 
        $city = factory(App\City::class)->create();

        // Create a range of films for each users
        factory(App\User::class)->create(
            [
                'city_id' => $city->id,
                'role' => "ADMIN",
            ]);
        $this->command->info(' City and User Created!');
    }
}
