<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Repository;

class RepositoryTest extends TestCase
{
    #use RefreshDatabase;

    /**
     * @test
     */
    public function a_user_can_access_the_homepage()
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee('Most Stars Projects on Github');
    }

    /**
     * @test
     */
    public function a_user_can_view_a_fresh_list_of_github_projects()
    {
        $this->get(route('refresh'))
            ->assertSee(route('home'));

        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee('JavaScript');
    }

    /**
     * Obs: este teste pode causar 403 na API do Github (API rate limit exceeded), ao chamar a rota refresh
     * @test
     */
    public function a_user_can_access_the_details_page()
    {
        $this->get(route('refresh'));
        
        $firstRepo = Repository::first();

        $this->get(route('show', $firstRepo))->assertSee($firstRepo->full_name);
    }
}
