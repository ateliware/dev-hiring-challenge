package dev.hiring.challenge.commons.errors.exception

import dev.hiring.challenge.commons.errors.ErrorResponse
import io.ktor.http.HttpStatusCode

class RepoNotFoundException(
        private val id: Long
) : HiringChallengeException() {

    override fun response() = ErrorResponse.create("No repo with requested ID was found in database", "id" to id)

    override fun statusCode() = HttpStatusCode.NotFound
}