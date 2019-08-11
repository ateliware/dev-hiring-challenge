package dev.hiring.challenge.application.repo

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import dev.hiring.challenge.commons.NUMBER_OF_LANGUAGES
import dev.hiring.challenge.commons.errors.exception.ParameterCaptureException
import dev.hiring.challenge.commons.extensions.validation
import dev.hiring.challenge.core.repo.RepoService
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveText
import io.ktor.response.respond
import org.slf4j.LoggerFactory
import org.valiktor.functions.hasSize

class RepoController(
    private val repoService: RepoService,
    private val mapper: ObjectMapper
) {

    private val logger = LoggerFactory.getLogger(this::class.java)

    suspend fun load(call: ApplicationCall) {
        val json = call.receiveText()

        logger.info("Starting load repositories process with json $json")

        val request = mapper
                .readValue<RepoRequest>(json)
                .validation { validate(RepoRequest::languages).hasSize(NUMBER_OF_LANGUAGES, NUMBER_OF_LANGUAGES) }

        logger.info("Json deserialized to $request")

        repoService.load(request)

        logger.info("Finished load repositories process")

        call.respond(HttpStatusCode.Created)
    }

    suspend fun getOne(call: ApplicationCall) {
        val id = call.parameters["id"]?.toLongOrNull() ?: throw ParameterCaptureException("id")

        logger.info("Starting get one repository process with repository ID: $id")

        val response = repoService.findById(id)

        logger.info("Finished get one repository process with response $response")

        call.respond(HttpStatusCode.OK, response)
    }

    suspend fun list(call: ApplicationCall) {
        logger.info("Starting list repositories process")

        val response = repoService
                .list()
                .map { MinifiedRepoResponse(it) }
                .sortedByDescending { it.numberOfStars }

        logger.info("Finished list repositories process with response $response")

        call.respond(HttpStatusCode.OK, response)
    }
}
