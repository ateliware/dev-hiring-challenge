package dev.hiring.challenge.commons.errors.exception

import dev.hiring.challenge.commons.errors.ErrorResponse
import io.ktor.http.HttpStatusCode

abstract class HiringChallengeException : RuntimeException() {

    abstract fun response(): ErrorResponse

    abstract fun statusCode(): HttpStatusCode
}