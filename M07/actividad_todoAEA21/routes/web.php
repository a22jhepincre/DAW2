<?php

use App\Http\Controllers\AuthenticatorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Ruta pública de bienvenida
Route::get('/', function () {
    return view('welcome');
});

// Rutas para autenticación
Route::get('/login', [AuthenticatorController::class, 'login'])->name('login');
Route::get('/register', [AuthenticatorController::class, 'register'])->name('register');
Route::post('/authenticate', [AuthenticatorController::class, 'authenticate'])->name('authenticate');
Route::post('/create-credentials', [AuthenticatorController::class, 'createCredentials'])->name('create.credentials');
Route::get('/logout', [AuthenticatorController::class, 'logout'])->name('logout');
Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');

// Agrupar las rutas protegidas con middleware 'auth'
Route::middleware(['auth'])->group(function () {

    // Rutas para el controlador de categorías
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::delete('/delete/{id}', [CategoryController::class, 'delete'])->name('category.delete');
        Route::post('/store', [CategoryController::class, 'store'])->name('category.store');
        Route::post('/update', [CategoryController::class, 'update'])->name('category.update');
    });

    // Rutas para el controlador de usuarios
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('/delete', [UserController::class, 'delete'])->name('user.delete');
        Route::post('/update', [UserController::class, 'update'])->name('user.update');
    });

    // Rutas para el controlador de notas
    Route::prefix('note')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('note.index');
        Route::delete('/delete/{id}', [NoteController::class, 'delete'])->name('note.delete');
        Route::post('/store', [NoteController::class, 'store'])->name('note.store');
        Route::post('/update', [NoteController::class, 'update'])->name('note.update');
    });
});
