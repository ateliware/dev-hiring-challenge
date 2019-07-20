package dev.hiring.challenge.application.repository

import io.ktor.application.call
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route

fun Routing.repoRoutes(repoController: RepoController) {
    route("/repos") {
        post { repoController.load(call) }
        get { repoController.list(call) }
        get("{id}") { repoController.getOne(call) }
    }
}

