package dev.hiring.challenge.commons.errors.exception

import br.com.library.user.service.commons.errors.ErrorObject
import io.ktor.http.HttpStatusCode

abstract class HiringChallengeException : RuntimeException() {

    abstract fun response(): ErrorObject

    abstract fun statusCode(): HttpStatusCode
}