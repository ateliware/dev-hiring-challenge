<?php

use App\Domain\Topics\Controller\TopicsController;
use Illuminate\Support\Facades\Route;

Route::controller(TopicsController::class)->group(function () {
    Route::get('/topics', 'index');
});