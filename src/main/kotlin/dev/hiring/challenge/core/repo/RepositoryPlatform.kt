package dev.hiring.challenge.core.repo

interface RepositoryPlatform {

    suspend fun loadSpotlightRepositoryByLanguage(languages: List<String>): List<Repo>
}
