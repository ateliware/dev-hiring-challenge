<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model {
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function languages() {
        return $this->hasMany(Language::class, 'language_id', 'id');
    }
}
