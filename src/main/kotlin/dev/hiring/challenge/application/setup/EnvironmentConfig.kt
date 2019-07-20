package dev.hiring.challenge.application.setup

import com.typesafe.config.Config

class EnvironmentConfig(
    config: Config
) {

    val databaseUrl = config.getString("database.url")
    val databaseUsername = config.getString("database.username")
    val databasePassword = config.getString("database.password")
    val githubUrl = config.getString("clients.github.url")
}