package dev.hiring.challenge.application.repo

import dev.hiring.challenge.core.repo.Repo

class MinifiedRepoResponse(repo: Repo) {

    val id = repo.id
    val name = repo.name
    val language = repo.language
    val numberOfStars = repo.stargazersCount
    val createdAt = repo.createdAt
}