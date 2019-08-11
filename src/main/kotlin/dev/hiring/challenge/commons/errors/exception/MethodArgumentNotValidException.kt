package dev.hiring.challenge.commons.errors.exception

import dev.hiring.challenge.commons.errors.ErrorObject
import dev.hiring.challenge.commons.errors.ErrorResponse
import io.ktor.http.HttpStatusCode

class MethodArgumentNotValidException(
    private val errors: List<ErrorObject>
) : HiringChallengeException() {

    override fun response() = ErrorResponse
        .create("Request cannot be processed because it contains invalid data", "errors" to errors)

    override fun statusCode() = HttpStatusCode.BadRequest
}
