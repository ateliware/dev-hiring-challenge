<?php

namespace App\Domain\Github\Controller;

use App\Domain\Github\Service\GithubService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GithubController extends Controller
{
    private GithubService $service;

    public function __construct(GithubService $githubService)
    {
        $this->service = $githubService;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'topics' => 'required|exists:topics,name'
            ], [
                'topics.required' => "O campo tópico é obrigatório",
                'topics.exists' => "Tópico incorreto",
            ]);

            return response()->json([
                'data' => $this->service->listRepository($request->get('topics'))
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return response()->json([
                'errors' => $e->getMessage()
            ], Response::HTTP_BAD_GATEWAY);
        }
    }
}