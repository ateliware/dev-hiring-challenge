<?php

use App\Domain\Github\Controller\GithubController;
use Illuminate\Support\Facades\Route;

Route::controller(GithubController::class)->group(function () {
    Route::get('/github', 'index');
});