package dev.hiring.challenge.application.setup

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import java.util.*

object DataSourceProvider {

    fun provide(url: String, user: String, password: String): HikariDataSource {
        val config = HikariConfig(configuration(url, user, password))

        return HikariDataSource(config)
    }

    private fun configuration(url: String, user: String, password: String) = Properties().apply {
        put("jdbcUrl", url)
        put("dataSource.user", user)
        put("dataSource.password", password)
    }
}