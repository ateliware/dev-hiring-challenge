package dev.hiring.challenge.application.setup

import com.typesafe.config.ConfigFactory
import org.koin.dsl.module
import javax.sql.DataSource

object ConfigModules {

    val modules = module {
        single { EnvironmentConfig(ConfigFactory.load()) }
        single { ObjectMapperProvider.provide() }
        single<DataSource> {
            with(get<EnvironmentConfig>()) {
                DataSourceProvider.provide(databaseUrl, databaseUsername, databasePassword)
            }
        }
    }
}