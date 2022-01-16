<?php

namespace Tests\Feature;

use App\Models\Language;
use Tests\TestCase;

class IntegrationTest extends TestCase {
    public function testSaveLanguages() {
        $language = Language::firstOrCreate(['name' => 'Typescript']);
        $this->assertTrue($language->id <> NULL);
        $this->assertEquals('Typescript', $language->name);
    }
}
