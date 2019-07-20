package dev.hiring.challenge.infrastructure.repo

import dev.hiring.challenge.commons.VARCHAR_MAX_LENGTH
import dev.hiring.challenge.core.Repo
import dev.hiring.challenge.core.RepoRepository
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

internal object RepoTable : Table("repos") {
    val id: Column<Long> = long("id").primaryKey()
    val name: Column<String> = varchar("name", VARCHAR_MAX_LENGTH)
    val fullName: Column<String> = varchar("full_name", VARCHAR_MAX_LENGTH)
    val description: Column<String> = text("description")
    val language: Column<String> = varchar("language", VARCHAR_MAX_LENGTH)
    val defaultBranch: Column<String> = varchar("default_branch", VARCHAR_MAX_LENGTH)
    val private: Column<Boolean> = bool("private")
    val size: Column<Long> = long("size")
    val htmlUrl: Column<String> = varchar("html_url", VARCHAR_MAX_LENGTH)
    val stargazersCount: Column<Int> = integer("stargazers_count")
    val watchersCount: Column<Int> = integer("watchers_count")
    val forksCount: Column<Int> = integer("forks_count")
    val openIssuesCount: Column<Int> = integer("open_issues_count")
    val createdAt: Column<String> = varchar("created_at", VARCHAR_MAX_LENGTH)
    val updatedAt: Column<String> = varchar("updated_at", VARCHAR_MAX_LENGTH)


    fun toDomain(resultRow: ResultRow) = Repo(
            id = resultRow[id],
            name = resultRow[name],
            fullName = resultRow[fullName],
            description = resultRow[description],
            language = resultRow[language],
            defaultBranch = resultRow[defaultBranch],
            private = resultRow[private],
            size = resultRow[size],
            htmlUrl = resultRow[htmlUrl],
            stargazersCount = resultRow[stargazersCount],
            watchersCount = resultRow[watchersCount],
            forksCount = resultRow[forksCount],
            openIssuesCount = resultRow[openIssuesCount],
            createdAt = resultRow[createdAt],
            updatedAt = resultRow[updatedAt]
    )
}

class RepoRepositoryAdapter : RepoRepository {

    override fun saveAll(repos: List<Repo>) = transaction {
        repos.forEach { repo ->
            RepoTable.insert {
                it[id] = repo.id
                it[name] = repo.name
                it[fullName] = repo.fullName
                it[description] = repo.description
                it[language] = repo.language
                it[defaultBranch] = repo.defaultBranch
                it[private] = repo.private
                it[size] = repo.size
                it[htmlUrl] = repo.htmlUrl
                it[stargazersCount] = repo.stargazersCount
                it[watchersCount] = repo.watchersCount
                it[forksCount] = repo.forksCount
                it[openIssuesCount] = repo.openIssuesCount
                it[createdAt] = repo.createdAt
                it[updatedAt] = repo.updatedAt
            }
        }
    }

    override fun list() = transaction {
        RepoTable
                .selectAll()
                .map { RepoTable.toDomain(it) }
    }

    override fun findById(id: Long) = transaction {
        RepoTable
                .select { RepoTable.id eq id }
                .firstOrNull()
                ?.let { RepoTable.toDomain(it) }
    }
}