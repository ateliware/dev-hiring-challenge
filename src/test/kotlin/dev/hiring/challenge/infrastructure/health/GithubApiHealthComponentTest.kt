package dev.hiring.challenge.infrastructure.health

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.testing.fuelFailResponse
import dev.hiring.challenge.testing.fuelSuccessResponse
import io.github.marioalvial.kealth.core.HealthStatus
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class GithubApiHealthComponentTest {

    private val fuel = mockk<Fuel>()
    private val githubUrl = "https://api.github.com"
    private val githubHealthComponent = GithubApiHealthComponent(fuel, githubUrl)

    @Test
    fun `given response with status code 200 from github api should return HEALTHY status`() {
        every { fuel.get(githubUrl).responseString() } returns fuelSuccessResponse()

        val info = runBlocking { githubHealthComponent.health() }

        assertThat(info.status).isEqualTo(HealthStatus.HEALTHY)
    }

    @Test
    fun `given error from github api should return UNHEALTHY status`() {
        every { fuel.get(githubUrl).responseString() } returns fuelFailResponse()

        val info = runBlocking { githubHealthComponent.health() }

        assertThat(info.status).isEqualTo(HealthStatus.UNHEALTHY)
    }
}
