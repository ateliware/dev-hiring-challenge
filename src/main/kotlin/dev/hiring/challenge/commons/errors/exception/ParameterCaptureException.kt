package dev.hiring.challenge.commons.errors.exception

import dev.hiring.challenge.commons.errors.ErrorResponse
import io.ktor.http.HttpStatusCode

class ParameterCaptureException(
        private val parameter: String
) : HiringChallengeException() {

    override fun response() = ErrorResponse.create("It wasn't possible to capture parameter", "parameter" to parameter)

    override fun statusCode() = HttpStatusCode.BadRequest
}