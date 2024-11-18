<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ActorsFilm;
use App\Models\CategoriesFilm;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    //
    public function getAllFilms()
    {
        $films = Film::with('actors', 'categories')->get();

        return response()->json([
            'status' => "success",
            'message' => 'Lista de films',
            'films' => $films
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'slug' => 'required',
            'release_date' => 'required',
            'rating' => 'required',
        ],
            [
                'title.required' => 'El campo Titulo es obligatorio',
                'slug.required' => 'El campo Slug es obligatorio',
                'release_date.required' => 'El campo Fecha de Release es obligatorio',
                'rating.required' => 'El campo Rating es obligatorio',
            ]
        );

        $film = new Film();
        $film->title = $data['title'];
        $film->slug = $data['slug'];
        $film->release_date = $data['release_date'];
        $film->rating = $data['rating'];
        $film->save();

        return response()->json([
            'status' => "success",
            'message' => "Film creado correctamente",
            'data' => $film
        ]);
    }

    public function update(Request $request, $id)
    {
        $status = "success";
        try {
            $film = Film::findOrFail($id);

            $film->title = $request->title;
            $film->slug = $request->slug;
            $film->release_date = $request->release_date;
            $film->rating = $request->rating;
            $film->save();

            return response()->json([
                'status' => $status,
                'message' => "Film actualizado correctamente",
                'data' => $film
            ]);
        } catch (\Exception $e) {
            $status = "error";
            return response()->json([
                'status' => $status,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getByCategory($id)
    {
//        return $id;
        try {
            $films = Film::with(['actors', 'categories'])
                ->whereIn('id', CategoriesFilm::where('category_id', $id)->get('film_id'))
                ->get();

            return response()->json([
                'status' => "success",
                'message' => 'Lista de films',
                'films' => $films
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => "error",
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getByActors($id)
    {
//        return $id;
        try {
            $films = Film::with(['actors', 'categories'])->whereIn('id', ActorsFilm::where('actor_id', $id)->get('film_id'))->get();

            return response()->json([
                'status' => "success",
                'message' => 'Lista de films',
                'films' => $films
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => "error",
                'message' => $e->getMessage()
            ]);
        }
    }

}
