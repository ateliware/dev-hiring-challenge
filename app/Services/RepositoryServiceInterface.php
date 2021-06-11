<?php

namespace App\Services;

interface RepositoryServiceInterface
{
    public function getAll();

    public function skip20AndDelete($language);

    public function firstOrCreate($repository);

    public function search($language);
}
