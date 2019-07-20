package dev.hiring.challenge.core

interface RepoRepository {

    fun saveAll(repos: List<Repo>)

    fun list(): List<Repo>

    fun findById(id: Long): Repo?
}
