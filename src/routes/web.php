<?php

use App\Http\Controllers\StoreRepositoriesByTopicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [StoreRepositoriesByTopicController::class, 'index'])->name('repositories.index');
Route::get('/{id}', [StoreRepositoriesByTopicController::class, 'show'])->name('repositories.show');
