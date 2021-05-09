<?php


namespace App\Services;


use App\Models\Repository;
use App\Models\Topic;
use GuzzleHttp\Client;

class FindRepositoriesByTopicService
{
    public static function refreshTopicsAndRepositories($topics) {
        $repositories = collect($topics)->map(function ($topic) {
            $topicCreated = Topic::firstOrCreate([
                'name' => $topic
            ]);

            self::deleteAllRepositoriesInTopic($topicCreated->id);

            $response = FindRepositoriesByTopicService::findByTopic($topicCreated->name);

            return self::formatToRepositoriesIfFound($response, $topicCreated);
        })->flatten(1)->toArray();

        Repository::insert($repositories);
    }

    public static function deleteAllRepositoriesInTopic($topicId){
        Repository::where('topic_id', $topicId)->delete();
    }

    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \JsonException
     */
    public static function findByTopic($topic){
        $client = new Client();
        $url = "https://api.github.com/search/repositories";


        $response = $client->request('GET', $url, [
            'query' => [
                'q' => $topic,
                'sort' => 'stars',
                'order' => 'desc',
                'page' => '1',
                'per_page' => '10'
            ]
        ]);

        return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }

    private static function formatToRepositoriesIfFound($response, $topicCreated)
    {
        if($response && array_key_exists('items', $response)) {
            return collect($response['items'])->map(function($repository) use ($topicCreated){
                return [
                    'name' => $repository['name'],
                    'stargazers_count' => $repository['stargazers_count'],
                    'watchers_count' => $repository['watchers_count'],
                    'open_issues_count' => $repository['open_issues_count'],
                    'forks_count' => $repository['forks_count'],
                    'size' => $repository['size'],
                    'description' => $repository['description'],
                    'language' => $repository['language'] ?? $topicCreated->name,
                    'url' => $repository['html_url'],
                    'topic_id' => $topicCreated->id
                ];
            });
        }
        return [];
    }
}
