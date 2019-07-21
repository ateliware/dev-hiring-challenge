package dev.hiring.challenge.application.repo

import dev.hiring.challenge.commons.errors.exception.ParameterCaptureException
import dev.hiring.challenge.core.repo.Repo
import dev.hiring.challenge.core.repo.RepoService
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond

class RepoController(
        private val repoService: RepoService
) {

    suspend fun load(call: ApplicationCall) {
        repoService.load(call.receive())

        call.respond(HttpStatusCode.Created)
    }

    suspend fun getOne(call: ApplicationCall) {
        val id = call.parameters["id"]?.toLongOrNull() ?: throw ParameterCaptureException("id")

        call.respond(HttpStatusCode.OK, repoService.findById(id))
    }

    suspend fun list(call: ApplicationCall) {
        val response = repoService
                .list()
                .map { MinifiedRepoResponse(it) }
                .sortedByDescending { it.numberOfStars }

        call.respond(HttpStatusCode.OK, response)
    }
}