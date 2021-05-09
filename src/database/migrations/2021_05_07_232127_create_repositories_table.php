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
            $table->string('name')->nullable();
            $table->integer('stargazers_count')->nullable();
            $table->integer('watchers_count')->nullable();
            $table->integer('forks_count')->nullable();
            $table->integer('open_issues_count')->nullable();
            $table->bigInteger('size')->nullable();
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->string('language')->nullable();
            $table->bigInteger('topic_id');
            $table->timestamps();

            $table->foreign('topic_id')->references('id')->on('topics');
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
