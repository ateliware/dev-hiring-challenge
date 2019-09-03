<?php

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


/*
|--------------------------------------------------------------------------
| Painel Routes
|--------------------------------------------------------------------------
|
| Rotas de autenticação e painel de busca por repositórios
|
*/

Auth::routes();

Route::group(['prefix' => '/', 'middleware' => 'auth'], function (){

    Route::resource('/repositories', 'RepositoryController');
    Route::post('/', 'RepositoryController@search')->name('search');
});
