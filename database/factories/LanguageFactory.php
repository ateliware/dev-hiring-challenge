<?php

namespace Database\Factories;

use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

class LanguageFactory extends Factory {
    protected $model = Language::class;

    public function definition() {
        return [
            'name' => $this->faker->name
        ];
    }
}