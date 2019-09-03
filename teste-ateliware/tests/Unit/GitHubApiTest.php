<?php

namespace Tests\Unit;

use App\Github\RequestApi;
use Tests\TestCase;

class GitHubApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCanSearch()
    {
        $githubApi = new RequestApi();

        $result = $githubApi->searchRepositories('PHP');

        $this->assertTrue($result->exists());
        $this->assertTrue(!!$result->getLanguage());
        $this->assertTrue(!!$result->getStars());

    }
}
