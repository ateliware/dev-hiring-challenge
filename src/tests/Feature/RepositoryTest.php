<?php


namespace Tests\Feature;


use App\Models\Repository;
use Tests\TestCase;

class RepositoryTest extends TestCase
{

    public function test_show_view_can_be_rendered(): void
    {
        $repository = Repository::factory()->create();

        $view = $this->view('repositories.show', ['repository' => $repository]);

        $view->assertSee($repository['name']);
    }

    public function test_store_topic(): void
    {
        $this->json('POST', '/api/repositories/store', [
            "topics" => [
                "Ruby",
            ]
        ])->assertRedirect('/');

        $this->assertDatabaseHas('topics', ['name' => 'Ruby']);
    }
}
