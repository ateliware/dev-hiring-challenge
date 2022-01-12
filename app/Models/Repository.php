<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model {
    use HasFactory;
    protected $fillable = [
        'name',
        'html_url',
        'description',
        'created_at',
        'updated_at',
        'pushed_at',
        'stargazers_count',
        'watchers_count',
        'language',
        'open_issues_count',
        'language_id',
    ];

    public function language() {
        return $this->belongsTo(Language::class, 'language_id', 'id');
    }
}
