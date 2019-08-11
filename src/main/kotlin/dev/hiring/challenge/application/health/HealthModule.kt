package dev.hiring.challenge.application.health

import com.github.kittinunf.fuel.Fuel
import dev.hiring.challenge.application.setup.EnvironmentConfig
import dev.hiring.challenge.infrastructure.health.GithubApiHealthComponent
import dev.hiring.challenge.infrastructure.health.MySQLHealthComponent
import io.github.marioalvial.kealth.core.HealthAggregator
import io.github.marioalvial.kealth.core.HealthComponent
import org.koin.core.qualifier.StringQualifier
import org.koin.dsl.module

object HealthModule {

    val module = module {
        single { HealthHandler(get()) }
        single {
            val components: List<HealthComponent> = listOf(
                    get(StringQualifier("GithubApiHealthComponent")),
                    get(StringQualifier("MySQLHealthComponent"))
            )

            HealthAggregator(components)
        }
        single(StringQualifier("GithubApiHealthComponent")) {
            GithubApiHealthComponent(Fuel, get<EnvironmentConfig>().githubUrl)
        }
        single(StringQualifier("MySQLHealthComponent")) { MySQLHealthComponent(get()) }
    }
}