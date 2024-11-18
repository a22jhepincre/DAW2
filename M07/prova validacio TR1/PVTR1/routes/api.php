<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('film')->group(function () {
    Route::post('/store', [FilmController::class, 'store']);
    Route::post('/update/{id}', [FilmController::class, 'update']);

    Route::get('/get-all', [FilmController::class, 'getAllFilms'])->name('film.getAllFilms');
    Route::get('/get-by-category/{id}', [FilmController::class, 'getByCategory'])->name('film.getByCategory');
    Route::get('/get-by-actor/{id}', [FilmController::class, 'getByActors'])->name('film.getByActors');
});
