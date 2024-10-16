<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/movies', [MovieController::class, 'index']);
Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/profile', [ProfileController::class, 'index']);
Route::post('/update-profile', [ProfileController::class, 'update']);
Route::get('/example', 'ExampleController@index')->middleware('cors');
Route::get('/movies/{id}', [MoviesController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);