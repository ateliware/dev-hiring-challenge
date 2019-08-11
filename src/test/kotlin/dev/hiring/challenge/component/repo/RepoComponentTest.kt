package dev.hiring.challenge.component.repo

import dev.hiring.challenge.core.repo.RepositoryPlatform
import dev.hiring.challenge.mainModule
import dev.hiring.challenge.testing.MySQLMock
import dev.hiring.challenge.testing.loadJson
import dev.hiring.challenge.testing.platformSuccessResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.setBody
import io.ktor.server.testing.withTestApplication
import io.mockk.coEvery
import io.mockk.mockk
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.AfterClass
import org.junit.BeforeClass
import org.junit.Test
import org.koin.dsl.module
import org.skyscreamer.jsonassert.JSONAssert.assertEquals
import org.skyscreamer.jsonassert.JSONCompareMode.STRICT

class RepoComponentTest {

    companion object {
        private lateinit var mysql: MySQLMock

        @JvmStatic
        @BeforeClass
        fun setupClass() {
            mysql = MySQLMock().start()
        }

        @JvmStatic
        @AfterClass
        fun tearDownClass() {
            mysql.stop()
        }
    }

    @After
    fun setup() {
        mysql.clean()
    }

    private val repositoryPlatform = mockk<RepositoryPlatform>()
    private val module = module { single(override = true) { repositoryPlatform } }

    @Test
    fun `given valid repo request should execute load process with success`() {
        val json = loadJson("valid_repo_request.json")

        withTestApplication({ mainModule() }) {
            val response = handleRequest(HttpMethod.Post, "/repos") {
                setBody(json)
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }.response

            assertThat(response.status()).isEqualTo(HttpStatusCode.Created)
        }
    }

    @Test
    fun `given repo request with number of languages different than 5 should throw NumberOfLanguagesException`() {
        val json = loadJson("invalid_repo_request.json")
        val expected = loadJson("invalid_repo_response.json")

        withTestApplication({ mainModule() }) {
            val response = handleRequest(HttpMethod.Post, "/repos") {
                setBody(json)
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }.response

            assertThat(response.status()).isEqualTo(HttpStatusCode.BadRequest)
            assertEquals(expected, response.content, STRICT)
        }
    }

    @Test
    fun `given repo request with duplicate languages should throw NumberOfLanguagesException`() {
        val json = loadJson("duplicate_languages_repo_request.json")
        val expected = loadJson("invalid_repo_response.json")

        withTestApplication({ mainModule() }) {
            val response = handleRequest(HttpMethod.Post, "/repos") {
                setBody(json)
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }.response

            println(response.content)

            assertThat(response.status()).isEqualTo(HttpStatusCode.BadRequest)
            assertEquals(expected, response.content, STRICT)
        }
    }

    @Test
    fun `when listing repos should execute it with success and return 200`() {
        val json = loadJson("valid_repo_request.json")
        val expected = loadJson("list_repos_response.json")

        coEvery { repositoryPlatform.loadSpotlightRepositoryByLanguage(any()) } returns platformSuccessResponse

        withTestApplication({ mainModule(module) }) {
            handleRequest(HttpMethod.Post, "/repos") {
                setBody(json)
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }

            val response = handleRequest(HttpMethod.Get, "/repos").response

            assertThat(response.status()).isEqualTo(HttpStatusCode.OK)
            assertEquals(expected, response.content, STRICT)
        }
    }

    @Test
    fun `given ID of an existing repo should find it and return 200`() {
        val json = loadJson("valid_repo_request.json")
        val expected = loadJson("get_one_repo_success_response.json")

        coEvery { repositoryPlatform.loadSpotlightRepositoryByLanguage(any()) } returns platformSuccessResponse

        withTestApplication({ mainModule(module) }) {
            handleRequest(HttpMethod.Post, "/repos") {
                setBody(json)
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            }

            val response = handleRequest(HttpMethod.Get, "/repos/1234714").response

            println(response.content)
            assertThat(response.status()).isEqualTo(HttpStatusCode.OK)
            assertEquals(expected, response.content, STRICT)
        }
    }

    @Test
    fun `given ID of a non existing repo should throw RepoNotFoundException`() {
        val expected = loadJson("get_one_repo_fail_response.json")

        coEvery { repositoryPlatform.loadSpotlightRepositoryByLanguage(any()) } returns platformSuccessResponse

        withTestApplication({ mainModule(module) }) {
            val response = handleRequest(HttpMethod.Get, "/repos/1234714").response

            assertThat(response.status()).isEqualTo(HttpStatusCode.NotFound)
            assertEquals(expected, response.content, STRICT)
        }
    }
}
