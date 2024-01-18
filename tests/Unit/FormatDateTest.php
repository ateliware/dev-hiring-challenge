<?php

namespace Tests\Unit;

use App\Services\RepositoryService;
use PHPUnit\Framework\TestCase;

class FormatDateTest extends TestCase {
    public function testValidDate() {
        $date = RepositoryService::formatDate('01/01/2022 00:00:00');
        $this->assertEquals('2022-01-01 00:00:00', $date);
    }

    public function testNullDate() {
        $date = RepositoryService::formatDate(null);
        $this->assertNull($date);
    }
}
