<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use App\Models\Topic;
use App\Services\FindRepositoriesByTopicService;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StoreRepositoriesByTopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index(Request $request)
    {
        $repositories = Repository::latest()->paginate(10);

        return view('repositories.index', compact('repositories'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws \JsonException|GuzzleException
     */
    public function store(Request $request)
    {
        $requestData = collect($request->validate([
            'topics' => [
                'array'
            ],
            'topics.*' => [
                'string'
            ]
        ]));

        FindRepositoriesByTopicService::refreshTopicsAndRepositories($requestData['topics']);

        return redirect()->route('repositories.index');
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function show(Request $request, $id)
    {
        $repository = Repository::find($id);
        return view('repositories.show', compact('repository'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
