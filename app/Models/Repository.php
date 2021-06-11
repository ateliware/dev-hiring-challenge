<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'name',
        'full_name',
        'description',
        'language',
        'stargazers_count',
        'watchers_count',
        'open_issues_count',
        'forks_count',
        'size',
        'private',
        'url',
        'clone_url',
        'created_at',
        'updated_at'
    ];
}
