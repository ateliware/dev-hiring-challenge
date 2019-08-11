package dev.hiring.challenge.core.repo

import dev.hiring.challenge.application.repo.RepoRequest
import dev.hiring.challenge.commons.NUMBER_OF_LANGUAGES
import dev.hiring.challenge.commons.errors.exception.NumberOfLanguagesException
import dev.hiring.challenge.commons.errors.exception.RepoNotFoundException

class RepoService(
        private val repoRepository: RepoRepository,
        private val repositoryPlatform: RepositoryPlatform
) {

    suspend fun load(request: RepoRequest) {
        require(request.languages.size == NUMBER_OF_LANGUAGES) {
            throw NumberOfLanguagesException(request.languages.size)
        }

        repositoryPlatform
                .loadSpotlightRepositoryByLanguage(request.languages)
                .filter { repoDoesNotExist(it.id) }
                .let { repoRepository.saveAll(it) }
    }

    fun list() = repoRepository.list()

    fun findById(id: Long) = repoRepository.findById(id) ?: throw RepoNotFoundException(id)

    private fun repoDoesNotExist(id: Long) = repoRepository.findById(id) == null
}
