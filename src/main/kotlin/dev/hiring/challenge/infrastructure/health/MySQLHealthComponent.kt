package dev.hiring.challenge.infrastructure.health

import io.github.marioalvial.kealth.core.CriticalLevel
import io.github.marioalvial.kealth.core.HealthComponent
import io.github.marioalvial.kealth.core.HealthStatus
import javax.sql.DataSource
import org.slf4j.LoggerFactory

class MySQLHealthComponent(
    private val datasource: DataSource
) : HealthComponent {

    override val name = "mysql-component"
    override val criticalLevel = CriticalLevel.HIGH

    private val logger = LoggerFactory.getLogger(this::class.java)

    override fun doHealthCheck(): HealthStatus {
        val connection = datasource.connection
        val result = when (connection.isValid(5)) {
            true -> HealthStatus.HEALTHY
            false -> HealthStatus.UNHEALTHY
        }

        connection.close()
        return result
    }

    override fun handleFailure(throwable: Throwable) {
        logger.error("Error during mysql health check", throwable)
    }
}
