<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepositoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repositories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_name');
            $table->text('description')->nullable();
            $table->string('language', 50)->nullable();
            $table->bigInteger('stargazers_count')->nullable();
            $table->bigInteger('watchers_count')->nullable();
            $table->bigInteger('open_issues_count')->nullable();
            $table->bigInteger('forks_count')->nullable();
            $table->bigInteger('size')->nullable();
            $table->boolean('private')->default(1);
            $table->string('url')->nullable();
            $table->string('clone_url')->nullable();
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
        Schema::dropIfExists('repositories');
    }
}
