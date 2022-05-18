<?php

namespace Database\Seeders;

use App\Domain\Topics\Entities\Topics;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicsTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Topics::create(['name' => 'Python']);
        Topics::create(['name' => 'PHP']);
        Topics::create(['name' => 'Go']);
        Topics::create(['name' => 'C#']);
        Topics::create(['name' => 'Node']);
    }
}
