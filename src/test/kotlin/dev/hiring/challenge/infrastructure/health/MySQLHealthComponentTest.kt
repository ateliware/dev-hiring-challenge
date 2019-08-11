package dev.hiring.challenge.infrastructure.health

import io.github.marioalvial.kealth.core.HealthStatus
import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import javax.sql.DataSource
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class MySQLHealthComponentTest {

    private val datasource = mockk<DataSource>()
    private val mySQLHealthComponent = MySQLHealthComponent(datasource)

    @Test
    fun `given success validation to MySQL should return HEALTHY status`() {
        every { datasource.connection.isValid(5) } returns true
        every { datasource.connection.close() } just Runs

        val info = runBlocking { mySQLHealthComponent.health() }

        assertThat(info.status).isEqualTo(HealthStatus.HEALTHY)
    }

    @Test
    fun `given failed validation to MySQL should return UNHEALTHY status`() {
        every { datasource.connection.isValid(5) } returns false
        every { datasource.connection.close() } just Runs

        val info = runBlocking { mySQLHealthComponent.health() }

        assertThat(info.status).isEqualTo(HealthStatus.UNHEALTHY)
    }
}
