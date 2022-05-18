<?php

namespace App\Domain\Topics\Controller;

use App\Domain\Topics\Service\TopicsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TopicsController extends Controller
{
    private TopicsService $service;

    public function __construct(TopicsService $githubService)
    {
        $this->service = $githubService;
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->service->get()
        ], Response::HTTP_OK);
    }
}