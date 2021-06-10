<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Repository;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $items = Repository::orderBy('stargazers_count', 'desc')->paginate(10, [ '*' ], 'p');
        return view('index', compact('items'));
    }

    public function refresh()
    {
        # lista de linguagens escolhidas
        $languages = ['Python', 'PHP', 'JavaScript', 'C#', 'Java'];

        foreach ($languages as $lang) {
            $response = $this->searchInGithub($lang);
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

                Repository::where('language', $lang)->orderBy('stargazers_count', 'desc')->skip(20)->delete();
                foreach ($items as $item) {
                    Repository::firstOrCreate($item);
                }
            }
        }

        return redirect()->route('home');
    }

    public static function searchInGithub($language)
    {
        $client = new Client();
        $response = $client->request('GET', 'https://api.github.com/search/repositories', [
            'query' => [
                'q' => 'language:'.$language,
                'sort' => 'stars',
                'order' => 'desc',
                'per_page' => '10',
                'page' => '1'
            ]
        ]);

        if ($response->getStatusCode() != 200) {
            request()->session()->flash('error', 'Não foi possível estabelecer conexão com a API do Github. Tente novamente em alguns minutos :)');
            return null;
        }
            

        return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }
}
