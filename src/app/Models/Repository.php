<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'stargazers_count',
        'watchers_count',
        'description',
        'language',
        'url',
        'open_issues_count',
        'forks_count',
        'size',
        'topic_id'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id', 'id');
    }
}
