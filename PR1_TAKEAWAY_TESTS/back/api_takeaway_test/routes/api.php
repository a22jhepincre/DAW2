<?php

use App\Http\Controllers\AuthenticatorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthenticatorController::class, 'register'])->name('register');
Route::post('/login', [AuthenticatorController::class, 'authenticate'])->name('login');
Route::get('/logout', [AuthenticatorController::class, 'logout'])->name('logout');
