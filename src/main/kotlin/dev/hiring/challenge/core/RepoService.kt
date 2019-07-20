package dev.hiring.challenge.core

import dev.hiring.challenge.application.repository.RepoRequest
import dev.hiring.challenge.commons.MANDATORY_NUMBER_OF_LANGUAGES
import dev.hiring.challenge.commons.errors.exception.NumberOfLanguagesException
import dev.hiring.challenge.commons.errors.exception.RepoNotFoundException
import dev.hiring.challenge.infrastructure.repo.RepoTable.private

class RepoService(
        private val repoRepository: RepoRepository,
        private val repositoryPlatform: RepositoryPlatform
) {

    fun load(request: RepoRequest) {
        require(request.languages.size == MANDATORY_NUMBER_OF_LANGUAGES) {
            throw NumberOfLanguagesException(request.languages.size)
        }

        request.languages
                .flatMap { repositoryPlatform.loadSpotlightRepositoryByLanguage(it) }
                .filter { repoDoesNotExist(it.id) }
                .let { repoRepository.saveAll(it) }
    }

    fun list() = repoRepository.list()

    fun findById(id: Long) = repoRepository.findById(id) ?: throw RepoNotFoundException(id)

    private fun repoDoesNotExist(id: Long) = repoRepository.findById(id) == null
}
