<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // Rutas para el controlador de categorías
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::delete('/delete/{id}', [CategoryController::class, 'delete'])->name('category.delete');
        Route::post('/store', [CategoryController::class, 'store'])->name('category.store');
        Route::post('/update', [CategoryController::class, 'update'])->name('category.update');
    });

    // Rutas para el controlador de notas
    Route::prefix('note')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('note.index');
        Route::delete('/delete/{id}', [NoteController::class, 'delete'])->name('note.delete');
        Route::post('/store', [NoteController::class, 'store'])->name('note.store');
        Route::post('/update', [NoteController::class, 'update'])->name('note.update');
    });
});
