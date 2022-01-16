<?php

namespace App\Services;

use App\Models\Language;
use App\Models\Repository;
use GuzzleHttp\Client;

class RepositoryService {

    public static function findNewRepositories($languages) {
        $repositories = [];
        foreach ($languages as $key => $name) {
            $language = Language::firstOrCreate(['name' => $name]); // Faz um insert da linguagem caso não exista
            self::deleteAllRepositoriesByLanguage($language->id); // Deleta todos os repositórios da linguagem

            $reponse = self::findByLanguage($language->name); // Busca os repositórios da linguagem
            $repositories[] = self::formatReponse($reponse, $language); // Formata a resposta
        }

        foreach ($repositories as $repository) {
            Repository::insert($repository); // Salva os repositórios
        }
    }

    public static function deleteAllRepositoriesByLanguage($language){
        Repository::where('language_id', $language)->delete();
    }

    public static function findByLanguage($language) {
        $config = [];
        if (env('APP_ENV') == 'local') {
            $config = ['verify' => 'C:\xampp\php\cacert.pem'];
        }

        $client = new Client($config);
        $url = "https://api.github.com/search/repositories";

        $response = $client->request('GET', $url, [
            'query' => [
                'q' => $language,
                'sort' => 'stars',
                'order' => 'desc',
                'page' => '1',
                'per_page' => '10'
            ]
        ]);

        return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }

    private static function formatReponse($response, $language) {
        $repositories = [];
        if ($response && array_key_exists('items', $response)) {
            foreach ($response['items'] as $repository) {
                $repositories[] = [
                    'name'=> $repository['name'],
                    'html_url'=> $repository['html_url'],
                    'description'=> $repository['description'],
                    'created_at'=> self::formatDate(strtotime($repository['created_at'])),
                    'updated_at'=> self::formatDate(strtotime($repository['updated_at'])),
                    'pushed_at'=> self::formatDate(strtotime($repository['pushed_at'])),
                    'stargazers_count'=> $repository['stargazers_count'],
                    'watchers_count'=> $repository['watchers_count'],
                    'open_issues_count'=> $repository['open_issues_count'],
                    'language_id'=> $language->id
                ];
            }
        }

        return $repositories;
    }

    public static function formatDate($date) {
        if (!isset($date)) {
            return null;
        }

        return date('Y-m-d H:i:s', strtotime($date));
    }
}

?>