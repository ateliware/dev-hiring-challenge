package dev.hiring.challenge.infrastructure.repo

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.application.setup.ObjectMapperProvider
import dev.hiring.challenge.testing.fuelFailResponse
import dev.hiring.challenge.testing.fuelSuccessResponse
import dev.hiring.challenge.testing.loadJson
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatExceptionOfType
import org.junit.Test

class RepositoryPlatformTest {

    private val fuel = mockk<Fuel>()
    private val githubUrl = "https://api.github.com"
    private val mapper = ObjectMapperProvider.provide()
    private val repositoryPlatform = GithubPlatformAdapter(fuel, githubUrl, mapper)

    private val languages = setOf("javascript", "kotlin", "elixir", "ruby", "clojure")

    @Test
    fun `given valid response from github should return list of 5 repos`() {
        val json = loadJson("github_response.json")

        every { fuel.get("$githubUrl/search/repositories", any()).responseString() } returns fuelSuccessResponse(json)

        val repos = runBlocking { repositoryPlatform.loadSpotlightRepositoryByLanguage(languages) }

        assertThat(repos).hasSize(5)
    }

    @Test
    fun `given invalid response from github should throw exception`() {
        every { fuel.get("$githubUrl/search/repositories", any()).responseString() } returns fuelFailResponse()

        assertThatExceptionOfType(RuntimeException::class.java)
                .isThrownBy { runBlocking { repositoryPlatform.loadSpotlightRepositoryByLanguage(languages) } }
    }
}
