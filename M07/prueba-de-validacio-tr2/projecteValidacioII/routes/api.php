<?php

use App\Http\Controllers\AuthenticatorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthenticatorController::class, 'register']);
Route::post('/login', [AuthenticatorController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/getUserInfo', [AuthenticatorController::class, 'getAuthenticatedUser']);
    Route::post('/setUserInfo', [AuthenticatorController::class, 'setUserInfo']);
    Route::post('/logout', [AuthenticatorController::class, 'logout']);
});
