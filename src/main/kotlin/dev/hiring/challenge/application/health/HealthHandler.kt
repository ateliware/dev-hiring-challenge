package dev.hiring.challenge.application.health

import io.github.marioalvial.kealth.core.HealthAggregator
import io.github.marioalvial.kealth.core.HealthStatus
import io.github.marioalvial.kealth.core.HealthStatus.*
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.http.HttpStatusCode.Companion.OK
import io.ktor.http.HttpStatusCode.Companion.ServiceUnavailable
import io.ktor.response.respond

class HealthHandler(
        private val healthAggregator: HealthAggregator
) {

    suspend fun health(call: ApplicationCall) {
        val aggregate = healthAggregator.aggregate()
        val status = if (aggregate.any { it.value.status == UNHEALTHY }) ServiceUnavailable else OK

        call.respond(status, aggregate)
    }
}