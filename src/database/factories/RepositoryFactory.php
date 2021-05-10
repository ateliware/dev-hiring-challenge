<?php

namespace Database\Factories;

use App\Models\Repository;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepositoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Repository::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'stargazers_count' => $this->faker->numberBetween(0, 20000),
            'watchers_count' => $this->faker->numberBetween(0, 20000),
            'description' => $this->faker->text,
            'language' => $this->faker->languageCode,
            'url' => $this->faker->url,
            'open_issues_count' => $this->faker->numberBetween(0, 20000),
            'forks_count' => $this->faker->numberBetween(0, 20000),
            'size' => $this->faker->numberBetween(0, 20000),
            'topic_id' => Topic::factory()
        ];
    }
}
