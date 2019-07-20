package dev.hiring.challenge.commons.errors.exception

import br.com.library.user.service.commons.errors.ErrorObject
import dev.hiring.challenge.commons.MANDATORY_NUMBER_OF_LANGUAGES
import dev.hiring.challenge.infrastructure.repo.RepoTable.id
import io.ktor.http.HttpStatusCode

class ParameterCaptureException(
    private val parameter: String
) : HiringChallengeException() {

    override fun response() = ErrorObject.create(
        "It wasn't possible to capture parameter",
        "parameter" to parameter
    )

    override fun statusCode() = HttpStatusCode.BadRequest
}