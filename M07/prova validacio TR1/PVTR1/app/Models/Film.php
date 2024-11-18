<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    //
    public function actors()
    {
        return $this->hasMany(ActorsFilm::class, 'film_id', 'id')->with(['actor']);
    }

    public function categories()
    {
        return $this->hasMany(CategoriesFilm::class, 'film_id', 'id')->with(['category']);
    }
}
