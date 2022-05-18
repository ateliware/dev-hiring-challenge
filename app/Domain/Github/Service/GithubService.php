<?php

namespace App\Domain\Github\Service;

use GrahamCampbell\GitHub\GitHubManager;

class GithubService
{
    private GitHubManager $github;

    public function __construct(GitHubManager $github)
    {
        $this->github = $github;
    }

    public function button()
    {

    }

    public function listRepository(string $programming): array
    {
        return $this->github->search()->repositories($programming, null);
    }

    public function viewRepository()
    {

    }
}