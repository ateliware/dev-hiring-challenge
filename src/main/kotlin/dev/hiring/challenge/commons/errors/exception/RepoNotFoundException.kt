package dev.hiring.challenge.commons.errors.exception

import br.com.library.user.service.commons.errors.ErrorObject
import dev.hiring.challenge.commons.MANDATORY_NUMBER_OF_LANGUAGES
import dev.hiring.challenge.infrastructure.repo.RepoTable.id
import io.ktor.http.HttpStatusCode

class RepoNotFoundException(
    private val id: Long
) : HiringChallengeException() {

    override fun response() = ErrorObject.create(
        "No repo with requested ID was found in database",
        "id" to id
    )

    override fun statusCode() = HttpStatusCode.NotFound
}