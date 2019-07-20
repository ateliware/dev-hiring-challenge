package dev.hiring.challenge

import dev.hiring.challenge.application.health.HealthModule
import dev.hiring.challenge.application.health.healthRoutes
import dev.hiring.challenge.application.repository.RepoModule
import dev.hiring.challenge.application.repository.repoRoutes
import dev.hiring.challenge.application.setup.ConfigModules
import dev.hiring.challenge.commons.errors.exception.HiringChallengeException
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.http.ContentType
import io.ktor.jackson.JacksonConverter
import io.ktor.response.respond
import io.ktor.routing.routing
import io.ktor.server.netty.EngineMain
import org.flywaydb.core.Flyway
import org.jetbrains.exposed.sql.Database
import org.koin.core.logger.PrintLogger
import org.koin.ktor.ext.Koin
import org.koin.ktor.ext.get
import javax.sql.DataSource

fun Application.mainModule() {
    install(Koin) {
        modules(listOf(ConfigModules.modules, HealthModule.module, RepoModule.module))
        logger(PrintLogger())
    }
    install(CallLogging)
    install(ContentNegotiation) { register(ContentType.Application.Json, JacksonConverter(get())) }
    install(StatusPages) { exception<HiringChallengeException> { call.respond(it.statusCode(), it.response()) } }

    startDatabase(get())

    routing {
        repoRoutes(get())
        healthRoutes(get())
    }
}

private fun startDatabase(dataSource: DataSource) {
    Flyway.configure().dataSource(dataSource).load().migrate()
    Database.connect(dataSource)
}

fun main(args: Array<String>) = EngineMain.main(args)