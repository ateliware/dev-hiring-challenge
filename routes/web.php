<?php

use App\Http\Controllers\AddFavController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\MedicamentoController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\PrescricroesController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ApiController;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::prefix('/apis')->middleware(['auth'])->name('api.')->group( function(){
    Route::get('/', [ApiController::class, 'index'])->name('index');
    Route::post('/listar', [ApiController::class, 'listar'])->name('listar');
    Route::get('/listar', [ApiController::class, 'listar'])->name('listar');
    Route::put('/listar', [AddFavController::class, 'store'])->name('store');
    Route::get('/listar2', [ApiController::class, 'listar2'])->name('listar2');
    Route::post('/listar2', [ApiController::class, 'listar2'])->name('listar2');
    Route::put('/listar2', [AddFavController::class, 'store'])->name('store');
});

Route::prefix('/fav')->middleware(['auth'])->name('apifav.')->group( function(){
    Route::get('/', [AddFavController::class, 'index'])->name('index');
    Route::delete('/{id}', [AddFavController::class, 'destroy'])->name('destroy');
});

require __DIR__.'/auth.php';