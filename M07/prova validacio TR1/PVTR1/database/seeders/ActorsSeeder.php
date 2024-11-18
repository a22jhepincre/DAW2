<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $actors = [
            ['first_name' => 'John', 'last_name' => 'Doe', 'experience_years' => 5],
            ['first_name' => 'Jane', 'last_name' => 'Doene', 'experience_years' => 10],
            ['first_name' => 'Jim', 'last_name' => 'Jane', 'experience_years' => 5],
            ['first_name' => 'Johnny', 'last_name' => 'Jones', 'experience_years' => 5],
            ['first_name' => 'Kevin', 'last_name' => 'Jones', 'experience_years' => 15],
        ];

        DB::table('actors')->insert($actors);
    }
}
