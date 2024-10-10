<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


//category controller
Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
Route::get('/category/delete', [CategoryController::class, 'delete'])->name('category.delete');
Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
Route::post('/category/update', [CategoryController::class, 'update'])->name('category.update');

//user controller
Route::get('/user', [UserController::class, 'index'])->name('user.index');
Route::get('/user/delete', [UserController::class, 'delete'])->name('user.delete');
Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
Route::post('/user/update', [UserController::class, 'update'])->name('user.update');

//notes controller
Route::get('/note', [UserController::class, 'index'])->name('note.index');
Route::get('/note/delete', [UserController::class, 'delete'])->name('note.delete');
Route::post('/note/store', [UserController::class, 'store'])->name('note.store');
Route::post('/note/update', [UserController::class, 'update'])->name('note.update');
