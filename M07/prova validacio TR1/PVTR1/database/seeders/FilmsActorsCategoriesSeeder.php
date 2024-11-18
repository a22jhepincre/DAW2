<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilmsActorsCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $filmsActor = [
            [
                'film_id'=>1,
                'actor_id'=>1,
            ],
            [
                'film_id'=>1,
                'actor_id'=>3,
            ],
        ];

        $filmsCategory = [
            [
                'film_id'=>1,
                'category_id'=>1,
            ],
            [
                'film_id'=>1,
                'category_id'=>3,
            ],
        ];

        DB::table('actors_films')->insert($filmsActor);
        DB::table('categories_films')->insert($filmsCategory);
    }
}
