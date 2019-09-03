<?php

namespace App\Github;


use App\Models\RepositoryResource;
use GuzzleHttp\Client;

class RequestApi
{
    const BASE_URL = 'https://api.github.com/search/repositories';
    const SORT = 'stars';
    const ORDER = 'desc';

    private $client;

    /**
     * RequestApi constructor.
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * @param $search
     * @return RepositoryResource
     */
    public function searchRepositories($search)
    {
        $response = $this->client->get(self::BASE_URL, ['query' => $this->buildQuery($search)]);

        $data = json_decode($response->getBody()->getContents());

        return new RepositoryResource(reset($data->items));
    }

    /**
     * @param $search
     * @return array
     */
    private function buildQuery($search): array
    {
        $query = [
             'q' => $search,
             'sort' => self::SORT,
             'order' => self::ORDER
        ];

        return $query;
    }
}
