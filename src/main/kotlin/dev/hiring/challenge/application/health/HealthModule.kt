package dev.hiring.challenge.application.health

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.application.repository.RepoController
import dev.hiring.challenge.application.setup.EnvironmentConfig
import dev.hiring.challenge.core.RepoService
import dev.hiring.challenge.core.RepoRepository
import dev.hiring.challenge.core.RepositoryPlatform
import dev.hiring.challenge.infrastructure.health.GithubApiHealthComponent
import dev.hiring.challenge.infrastructure.repo.GithubPlatformAdapter
import dev.hiring.challenge.infrastructure.repo.RepoRepositoryAdapter
import io.github.marioalvial.kealth.core.HealthAggregator
import io.github.marioalvial.kealth.core.HealthComponent
import org.koin.dsl.module

object HealthModule {

    val module = module {
        single { HealthHandler(get()) }
        single { HealthAggregator(listOf(get())) }
        single<HealthComponent> { GithubApiHealthComponent(Fuel, get<EnvironmentConfig>().githubUrl) }
    }
}