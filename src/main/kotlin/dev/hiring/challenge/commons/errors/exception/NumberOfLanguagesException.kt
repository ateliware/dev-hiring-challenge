package dev.hiring.challenge.commons.errors.exception

import br.com.library.user.service.commons.errors.ErrorObject
import dev.hiring.challenge.commons.MANDATORY_NUMBER_OF_LANGUAGES
import dev.hiring.challenge.infrastructure.repo.RepoTable.id
import io.ktor.http.HttpStatusCode

class NumberOfLanguagesException(
    private val numberOfLanguages: Int
) : HiringChallengeException() {

    override fun response() = ErrorObject.create(
        "Number of languages sent in request not match mandatory number: $MANDATORY_NUMBER_OF_LANGUAGES",
        "number_of_languages" to numberOfLanguages
    )

    override fun statusCode() = HttpStatusCode.BadRequest
}