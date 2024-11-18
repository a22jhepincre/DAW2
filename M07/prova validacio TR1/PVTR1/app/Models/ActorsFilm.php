<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActorsFilm extends Model
{
    //
    public function actor()
    {
        return $this->belongsTo(Actor::class);
    }
}
