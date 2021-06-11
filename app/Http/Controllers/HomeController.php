<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repository;
use App\Services\RepositoryServiceInterface;

class HomeController extends Controller
{
    private $repositoryService;

    public function __construct(RepositoryServiceInterface $repositoryService)
    {
        $this->repositoryService = $repositoryService;
    }

    public function index(Request $request)
    {
        $items = $this->repositoryService->getAll();
        return view('index', compact('items'));
    }

    public function show(Repository $repository)
    {
        return view('show', compact('repository'));
    }

    public function refresh()
    {
        # lista de linguagens escolhidas
        $languages = ['Python', 'PHP', 'JavaScript', 'C#', 'Java'];

        foreach ($languages as $lang) {
            $response = $this->repositoryService->search($lang);
            $items = collect();
            if (!empty($response)) {
                $items = collect($response['items'])->map(function($item){
                    return [
                        'name' => $item['name'],
                        'full_name' => $item['full_name'],
                        'description' => $item['description'],
                        'language' => $item['language'],
                        'stargazers_count' => $item['stargazers_count'],
                        'watchers_count' => $item['watchers_count'],
                        'open_issues_count' => $item['open_issues_count'],
                        'forks_count' => $item['forks_count'],
                        'size' => $item['size'],
                        'private' => $item['private'],
                        'url' => $item['html_url'],
                        'clone_url' => $item['clone_url'],
                        'created_at' => $item['created_at'],
                        'updated_at' => $item['updated_at']
                    ];
                });

                $this->repositoryService->skip20AndDelete($lang);
                foreach ($items as $item) {
                    $this->repositoryService->firstOrCreate($item);
                }
            }
        }

        return redirect()->route('home');
    }
}
