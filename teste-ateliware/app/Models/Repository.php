<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{

    //-------------------------------------------------------------------
    //          Attributes
    //-------------------------------------------------------------------

    protected $table = 'repositories';

    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = [
        'full_name',
        'name',
        'owner_name',
        'description',
        'avatar_url',
        'language',
        'stars',
        'query'
    ];

    //-------------------------------------------------------------------
    //          Accessor Methods
    //-------------------------------------------------------------------
}
