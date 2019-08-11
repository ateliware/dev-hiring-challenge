package dev.hiring.challenge.infrastructure.health

import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.result.Result
import io.github.marioalvial.kealth.core.CriticalLevel
import io.github.marioalvial.kealth.core.HealthComponent
import io.github.marioalvial.kealth.core.HealthStatus

class GithubApiHealthComponent(
    private val fuel: Fuel,
    private val githubUrl: String
) : HealthComponent {

    override val criticalLevel = CriticalLevel.HIGH
    override val name = "github-api-component"

    override fun doHealthCheck(): HealthStatus {
        val (_, _, result) = fuel.get(githubUrl).responseString()

        return when (result) {
            is Result.Success -> HealthStatus.HEALTHY
            is Result.Failure -> throw result.error
        }
    }

    override fun handleFailure(throwable: Throwable) {
        throwable.printStackTrace()
    }
}
