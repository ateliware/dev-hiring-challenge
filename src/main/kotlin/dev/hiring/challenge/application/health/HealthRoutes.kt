package dev.hiring.challenge.application.health

import io.ktor.application.call
import io.ktor.routing.Routing
import io.ktor.routing.get

fun Routing.healthRoutes(healthHandler: HealthHandler) {
    get("/health") { healthHandler.health(call) }
}
