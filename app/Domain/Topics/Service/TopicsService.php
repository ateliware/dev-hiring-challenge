<?php

namespace App\Domain\Topics\Service;

use App\Domain\Topics\Entities\Topics;
use Illuminate\Database\Eloquent\Collection;

class TopicsService
{
    private Topics $entities;

    public function __construct(Topics $topics)
    {
        $this->entities = $topics;
    }

    public function get(): Collection
    {
        return $this->entities->get();
    }
}