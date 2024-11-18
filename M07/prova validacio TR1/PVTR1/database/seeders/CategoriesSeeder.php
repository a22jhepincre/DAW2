<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            ['name' => 'Acción', 'slug' => 'accion'],
            ['name' => 'Aventura', 'slug' => 'aventa'],
            ['name' => 'Catástrofe', 'slug' => 'catastrofe'],
            ['name' => 'Ciencia Ficción', 'slug'=>'ciencia-ficcion'],
            ['name' => 'Comedia', 'slug' => 'comedia'],
            ['name' => 'Documentales', 'slug' => 'documentales'],
            ['name' => 'Drama', 'slug' => 'drama'],
            ['name' => 'Fantasía', 'slug' => 'fantasia'],
        ];

        DB::table('categories')->insert($categories);
    }
}
