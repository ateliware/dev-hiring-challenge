package dev.hiring.challenge.application.repo

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.application.setup.EnvironmentConfig
import dev.hiring.challenge.core.repo.RepoRepository
import dev.hiring.challenge.core.repo.RepoService
import dev.hiring.challenge.core.repo.RepositoryPlatform
import dev.hiring.challenge.infrastructure.repo.GithubPlatformAdapter
import dev.hiring.challenge.infrastructure.repo.RepoRepositoryAdapter
import org.koin.dsl.module

object RepoModule {

    val module = module {
        single { RepoController(get(), get()) }
        single { RepoService(get(), get()) }
        single<RepoRepository> { RepoRepositoryAdapter() }
        single<RepositoryPlatform> { GithubPlatformAdapter(Fuel, get<EnvironmentConfig>().githubUrl, get()) }
    }
}
