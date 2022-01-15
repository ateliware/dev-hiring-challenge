<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use App\Services\RepositoryService;
use Illuminate\Http\Request;

class SaveRepositoriesController extends Controller {
    private $languages = [
        'php',
        'javascript',
        'java',
        'python',
        'ruby',
    ];

    public function index(Request $request) {
        $repositories = Repository::latest()->paginate(10);

        return view('repositories.index', compact('repositories'))->with('i', ($request->input('page', 1) - 1) * 5);
    }

    public function save(Request $request) {
        RepositoryService::findNewRepositories($this->languages);
        return redirect()->route('repositories.index')->with('success', 'Repositórios salvos com sucesso!');
    }
}
