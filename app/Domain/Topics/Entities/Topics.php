<?php

namespace App\Domain\Topics\Entities;

use Illuminate\Database\Eloquent\Model;

class Topics extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}