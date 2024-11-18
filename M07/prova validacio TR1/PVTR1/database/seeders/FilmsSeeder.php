<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $films = [
            ['title' => 'Jurassic Park v2.2',
                'slug' => 'jurassic-park-v2',
                'release_date' => '2015-11-02',
                'rating' => 2.5],
        ];

        DB::table('films')->insert($films);
    }
}
