<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function topics()
    {
        return $this->hasMany(Repository::class, 'topic_id', 'id');
    }
}
