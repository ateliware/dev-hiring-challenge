<?php

namespace App\Services;

use App\Models\Repository;
use GuzzleHttp\Client;

class RepositoryService implements RepositoryServiceInterface
{
    public function getAll()
    {
        return Repository::orderBy('stargazers_count', 'desc')->paginate(10, [ '*' ], 'p');
    }

    public function skip20AndDelete($language)
    {
        return Repository::where('language', $language)->orderBy('stargazers_count', 'desc')->skip(20)->delete();
    }

    public function firstOrCreate($repository)
    {
        return Repository::firstOrCreate($repository);
    }

    public function search($language)
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
