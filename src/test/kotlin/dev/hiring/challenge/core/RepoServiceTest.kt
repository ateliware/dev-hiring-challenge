package dev.hiring.challenge.core

import dev.hiring.challenge.application.repo.RepoRequest
import dev.hiring.challenge.commons.NUMBER_OF_LANGUAGES
import dev.hiring.challenge.commons.errors.ErrorResponse
import dev.hiring.challenge.commons.errors.exception.NumberOfLanguagesException
import dev.hiring.challenge.commons.errors.exception.RepoNotFoundException
import dev.hiring.challenge.core.repo.Repo
import dev.hiring.challenge.core.repo.RepoRepository
import dev.hiring.challenge.core.repo.RepoService
import dev.hiring.challenge.core.repo.RepositoryPlatform
import io.ktor.http.HttpStatusCode
import io.mockk.Runs
import io.mockk.coEvery
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThatCode
import org.assertj.core.api.Assertions.assertThatExceptionOfType
import org.junit.Test

class RepoServiceTest {

    private val repoRepository = mockk<RepoRepository>()
    private val repositoryPlatform = mockk<RepositoryPlatform>()
    private val repoService = RepoService(repoRepository, repositoryPlatform)

    @Test
    fun `given valid repo request should load the repositories with success`() {
        val request = RepoRequest(setOf("java", "clojure", "ruby", "elixir", "kotlin"))

        coEvery { repositoryPlatform.loadSpotlightRepositoryByLanguage(request.languages) } returns emptyList()
        every { repoRepository.saveAll(any()) } just Runs

        assertThatCode { runBlocking { repoService.load(request) } }.doesNotThrowAnyException()
    }

    @Test
    fun `given repo request with number of languages different of 5 should throw NumberOfLanguagesException`() {
        val request = RepoRequest(setOf("java", "clojure", "clojure", "elixir", "kotlin"))
        val expected = ErrorResponse.create(
                "Number of languages sent in request does not match mandatory number: $NUMBER_OF_LANGUAGES",
                "number_of_languages" to 4
        )

        assertThatExceptionOfType(NumberOfLanguagesException::class.java)
                .isThrownBy { runBlocking { repoService.load(request) } }
                .matches { it.statusCode() == HttpStatusCode.BadRequest }
                .matches { it.response() == expected }
    }

    @Test
    fun `when listing repos should execute it with success`() {
        every { repoRepository.list() } returns emptyList()

        assertThatCode { runBlocking { repoService.list() } }.doesNotThrowAnyException()
    }

    @Test
    fun `given ID of an existent repo should find and return it with success`() {
        val id = 1L

        every { repoRepository.findById(id) } returns Repo(id)

        assertThatCode { runBlocking { repoService.findById(id) } }.doesNotThrowAnyException()
    }

    @Test
    fun `given ID of a nonexistent repo should throw RepoNotFoundException`() {
        val id = 1L
        val expected = ErrorResponse.create("No repo with requested ID was found in database", "id" to id)

        every { repoRepository.findById(id) } returns null

        assertThatExceptionOfType(RepoNotFoundException::class.java)
                .isThrownBy { runBlocking { repoService.findById(id) } }
                .matches { it.statusCode() == HttpStatusCode.NotFound }
                .matches { it.response() == expected }
    }
}
