package dev.hiring.challenge.core

data class Repo(
        val id: Long = 0,
        val name: String = "",
        val fullName: String = "",
        val description: String = "",
        val language: String = "",
        val defaultBranch: String = "",
        val private: Boolean = false,
        val size: Long = 0,
        val htmlUrl: String = "",
        val stargazersCount: Int = 0,
        val watchersCount: Int = 0,
        val forksCount: Int = 0,
        val openIssuesCount: Int = 0,
        val createdAt: String = "",
        val updatedAt: String = ""
)
