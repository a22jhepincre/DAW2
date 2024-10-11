<?php

use App\Http\Controllers\AuthenticatorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//autho
Route::get('/login', [AuthenticatorController::class, 'login'])->name('login');
Route::get('/register', [AuthenticatorController::class, 'register'])->name('register');
Route::post('/authenticate', [AuthenticatorController::class, 'authenticate'])->name('authenticate');

//category controller
Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/delete', [CategoryController::class, 'delete'])->name('category.delete');
    Route::post('/store', [CategoryController::class, 'store'])->name('category.store');
    Route::post('/update', [CategoryController::class, 'update'])->name('category.update');
});


//user controller
Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('user.index');
    Route::get('/delete', [UserController::class, 'delete'])->name('user.delete');
    Route::post('/store', [UserController::class, 'store'])->name('user.store');
    Route::post('/update', [UserController::class, 'update'])->name('user.update');
});


//notes controller
Route::prefix('note')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('note.index');
    Route::get('/delete', [UserController::class, 'delete'])->name('note.delete');
    Route::post('/store', [UserController::class, 'store'])->name('note.store');
    Route::post('/update', [UserController::class, 'update'])->name('note.update');
});

