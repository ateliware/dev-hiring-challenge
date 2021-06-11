<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApplicationTest extends TestCase
{
    /**
     * tests php version
     * @test
     * @requires PHP 7.3.16
     */
    public function the_app_has_required_php_version()
    {
        $this->assertTrue(true);
    }

    /**
     * tests required php extensions for run the project
     * @test
     * @requires extension curl
     * @requires extension mbstring
     * @requires extension exif
     * @requires extension mysqli
     * @requires extension openssl
     * @requires extension pdo_mysql
     * @requires extension pdo_sqlite
     */
    public function the_app_has_required_php_extensions()
    {
        $this->assertTrue(true);
    }
}
