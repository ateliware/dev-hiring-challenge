package dev.hiring.challenge.infrastructure.repo

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.result.Result
import dev.hiring.challenge.core.PlatformResponse
import dev.hiring.challenge.core.Repo
import dev.hiring.challenge.core.RepositoryPlatform

class GithubPlatformAdapter(
        private val fuel: Fuel,
        private val githubBaseUrl: String,
        private val mapper: ObjectMapper
) : RepositoryPlatform {

    override fun loadSpotlightRepositoryByLanguage(language: String): List<Repo> {
        val params = buildParams(language)
        val url = "$githubBaseUrl/search/repositories"
        val (_, _, result) = fuel.get(url, params).responseString()
                .also { println(it) }

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
        println("DEU RUIM")
        throw result.getException()
    }
}