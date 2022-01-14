<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use Illuminate\Http\Request;

class SaveRepositoriesController extends Controller {
    public function index(Request $request) {
        $repositories = Repository::latest()->paginate(10);

        return view('repositories.index', compact('repositories'))->with('i', ($request->input('page', 1) - 1) * 5);
    }
}
