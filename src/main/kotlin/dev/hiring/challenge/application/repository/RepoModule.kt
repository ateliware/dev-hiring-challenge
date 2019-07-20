package dev.hiring.challenge.application.repository

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.application.setup.EnvironmentConfig
import dev.hiring.challenge.core.RepoService
import dev.hiring.challenge.core.RepoRepository
import dev.hiring.challenge.core.RepositoryPlatform
import dev.hiring.challenge.infrastructure.repo.GithubPlatformAdapter
import dev.hiring.challenge.infrastructure.repo.RepoRepositoryAdapter
import org.koin.dsl.module

object RepoModule {

    val module = module {
        single { RepoController(get()) }
        single { RepoService(get(), get()) }
        single<RepoRepository> { RepoRepositoryAdapter() }
        single<RepositoryPlatform> { GithubPlatformAdapter(Fuel, get<EnvironmentConfig>().githubUrl, get()) }
    }
}