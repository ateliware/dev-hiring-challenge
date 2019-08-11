package dev.hiring.challenge.commons.errors.exception

import dev.hiring.challenge.commons.NUMBER_OF_LANGUAGES
import dev.hiring.challenge.commons.errors.ErrorResponse
import io.ktor.http.HttpStatusCode

class NumberOfLanguagesException(
    private val numberOfLanguages: Int
) : HiringChallengeException() {

    override fun response() = ErrorResponse.create(
        "Number of languages sent in request not match mandatory number: $NUMBER_OF_LANGUAGES",
        "number_of_languages" to numberOfLanguages
    )

    override fun statusCode() = HttpStatusCode.BadRequest
}