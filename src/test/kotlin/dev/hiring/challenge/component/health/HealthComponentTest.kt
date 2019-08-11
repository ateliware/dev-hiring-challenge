package dev.hiring.challenge.component.health

import dev.hiring.challenge.infrastructure.health.MySQLHealthComponent
import dev.hiring.challenge.mainModule
import dev.hiring.challenge.testing.MySQLMock
import dev.hiring.challenge.testing.durationComparator
import dev.hiring.challenge.testing.loadJson
import io.github.marioalvial.kealth.core.CriticalLevel.HIGH
import io.github.marioalvial.kealth.core.HealthInfo
import io.github.marioalvial.kealth.core.HealthStatus.UNHEALTHY
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.withTestApplication
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import org.assertj.core.api.Assertions.assertThat
import org.junit.AfterClass
import org.junit.BeforeClass
import org.junit.Test
import org.koin.core.qualifier.StringQualifier
import org.koin.dsl.module
import org.skyscreamer.jsonassert.JSONAssert.assertEquals

class HealthComponentTest {

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

    @Test
    fun `given healthy components should execute health check and return 200`() {
        val json = loadJson("health_success_response.json")

        withTestApplication({ mainModule() }) {
            val response = handleRequest(HttpMethod.Get, "/health").response

            assertThat(response.status()).isEqualTo(HttpStatusCode.OK)
            assertEquals(json, response.content, durationComparator)
        }
    }

    @Test
    fun `given unhealthy component should execute health check and return 503`() {
        val json = loadJson("health_fail_response.json")
        val mySQLHealthComponent = mockk<MySQLHealthComponent>()
        val qualifier = StringQualifier("MySQLHealthComponent")
        val module = module { single(qualifier, override = true) { mySQLHealthComponent } }

        every { mySQLHealthComponent.name } returns "mysql-component"
        coEvery { mySQLHealthComponent.health() } returns HealthInfo(UNHEALTHY, HIGH, 100)

        withTestApplication({ mainModule(module) }) {
            val response = handleRequest(HttpMethod.Get, "/health").response

            assertThat(response.status()).isEqualTo(HttpStatusCode.ServiceUnavailable)
            assertEquals(json, response.content, durationComparator)
        }
    }
}
