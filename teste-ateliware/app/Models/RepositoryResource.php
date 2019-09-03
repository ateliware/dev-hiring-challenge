<?php

namespace App\Models;

/**
 * Class RepositoryResource
 * @package App\Models
 */
class RepositoryResource
{
    private $body;
    private $data;

    /**
     * RepositoryResource constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return bool
     */
    public function exists(): bool
    {
        return !!$this->data;
    }

    /**
     * @return array
     */
    public function getBody()
    {
        if (!$this->exists()) {
            return [];
        }

        if (!$this->body) {
            $this->body = [
                'full_name' => $this->data->full_name,
                'name' => $this->data->name,
                'owner_name' => $this->data->owner->login,
                'description' => $this->data->description,
                'avatar_url' => $this->data->owner->avatar_url,
                'language' => $this->data->language,
                'stars' => $this->data->stargazers_count,
            ];
        }

        return $this->body;
    }

    /**
     * @return mixed
     */
    public function getLanguage()
    {
        $body = $this->getBody();

        return $body['language'];
    }

    /**
     * @return mixed
     */
    public function getStars()
    {
        $body = $this->getBody();

        return $body['stars'];
    }
}
