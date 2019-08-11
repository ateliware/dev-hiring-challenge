package dev.hiring.challenge.infrastructure.repo

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.result.Result
import dev.hiring.challenge.core.repo.Repo
import dev.hiring.challenge.core.repo.RepositoryPlatform
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import org.slf4j.LoggerFactory

class GithubPlatformAdapter(
        private val fuel: Fuel,
        githubBaseUrl: String,
        private val mapper: ObjectMapper
) : RepositoryPlatform {

    private val url = "$githubBaseUrl/search/repositories"
    private val logger = LoggerFactory.getLogger(this::class.java)

    override suspend fun loadSpotlightRepositoryByLanguage(languages: Set<String>): List<Repo> {
        logger.info("Searching in Github API for repositories of languages ${languages.joinToString(",", "[", "]")}")

        val repos = coroutineScope {
            languages
                    .map { async(Dispatchers.IO) { executeRequest(it) } }
                    .flatMap { it.await() }
        }

        logger.info("Found following results from Github API: $repos")

        return repos
    }

    private fun executeRequest(language: String): List<Repo> {
        val params = buildParams(language)

        logger.info("Starting call to $url with params $params")

        val (_, response, result) = fuel
                .get(url, params)
                .responseString()

        logger.info("Call to $url completed with status ${response.statusCode} and response ${String(response.data)}")

        return when (result) {
            is Result.Success -> handleSuccess(result)
            is Result.Failure -> handleFailure(result)
        }
    }

    private fun buildParams(language: String) = listOf(
            "q" to "language:$language",
            "sort" to "stars",
            "order" to "desc",
            "page" to 1,
            "per_page" to 1
    )

    private fun handleSuccess(result: Result.Success<String>) = mapper
            .readValue<PlatformResponse>(result.value)
            .items

    private fun handleFailure(result: Result.Failure<FuelError>): Nothing {
        val exception = result.getException()

        logger.error("Call to $url failed. Error message: ${exception.message}", exception)

        throw exception
    }
}