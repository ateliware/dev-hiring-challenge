package dev.hiring.challenge.core

interface RepositoryPlatform {

    fun loadSpotlightRepositoryByLanguage(language: String): List<Repo>
}
