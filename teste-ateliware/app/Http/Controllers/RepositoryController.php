<?php

namespace App\Http\Controllers;

use App\Github\RequestApi;
use App\Models\Repository;
use Illuminate\Http\Request;

class RepositoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $repositories = Repository::orderByDesc('stars')
            ->orderBy('name')
            ->get();

        return view('repositories.index')
            ->with(['repositories' => $repositories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Repository $repository)
    {
        abort_if(!$repository, 404);

        return view('repositories.show')
            ->with(['repository' => $repository]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function search(Request $request)
    {
        $githubApi = new RequestApi();

        if ($request->exists('languages')){

            $languages = $request->input('languages');

            foreach ($languages as $language) {
                $this->getRepositoryByLanguage($language, $githubApi);
            }

        }

        return redirect()->route('repositories.index');

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Repository $repository
     */
    public function edit(Repository $repository)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Repository $repository)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Repository $repository
     */
    public function destroy(Repository $repository)
    {
        //
    }

    /**
     * @param $language
     * @param RequestApi $githubApi
     * @return Repository|null
     */
    private function getRepositoryByLanguage($language, RequestApi $githubApi): ?Repository
    {
        $result = $githubApi->searchRepositories($language);

        if (!$result->exists()) {
            return null;
        }

        $repository = Repository::whereQuery($language)->first();

        if (!$repository) {
            $body = $result->getBody();
            $body['query'] = $language;
            $repository = Repository::create($body);
        }

        if ($repository->stars < $result->getStars()) {
            $repository->update($result->getBody());
        }

        return $repository;
    }
}
