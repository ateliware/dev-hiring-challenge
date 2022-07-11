<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apifavs', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 100);
            $table->text('description', 1000);
            $table->string('html_url', 100)->nullable();
            $table->string('language', 30)->nullable();
            $table->string('name', 100)->nullable();
            $table->string('visibility', 30)->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apifavs');
    }
};
