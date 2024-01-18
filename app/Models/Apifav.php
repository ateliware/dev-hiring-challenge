<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apifav extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'description',
        'html_url',
        'language',
        'visibility',
        'updated_at',
        'created_at',
        'name'
    ];
}
