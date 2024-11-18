<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriesFilm extends Model
{
    //
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
