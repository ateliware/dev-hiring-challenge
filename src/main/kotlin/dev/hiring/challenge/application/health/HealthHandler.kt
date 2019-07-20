package dev.hiring.challenge.application.health

import io.github.marioalvial.kealth.core.HealthAggregator
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond

class HealthHandler(
        private val healthAggregator: HealthAggregator
) {

    suspend fun health(call: ApplicationCall){
        call.respond(HttpStatusCode.OK, healthAggregator.aggregate())
    }
}