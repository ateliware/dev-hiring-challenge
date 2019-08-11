package dev.hiring.challenge.core.repo

interface RepositoryPlatform {

    suspend fun loadSpotlightRepositoryByLanguage(languages: Set<String>): List<Repo>
}
