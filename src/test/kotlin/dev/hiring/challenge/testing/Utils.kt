package dev.hiring.challenge.testing

import dev.hiring.challenge.core.repo.Repo
import org.skyscreamer.jsonassert.Customization
import org.skyscreamer.jsonassert.JSONCompareMode
import org.skyscreamer.jsonassert.comparator.CustomComparator

fun loadJson(fileName: String) = ClassLoader.getSystemResource("json/$fileName").readText()

val durationComparator = CustomComparator(JSONCompareMode.LENIENT, Customization("*.duration") { o1, o2 ->
    o1.toString().toIntOrNull() != null && o2.toString().toIntOrNull() != null
})

val platformSuccessResponse = listOf(
        createMinifiedRepo(28457823, "freeCodeCamp", "JavaScript", 304240, "2014-12-24T17:49:19Z"),
        createMinifiedRepo(8514, "rails", "Ruby", 43803, "2008-04-11T02:19:47Z"),
        createMinifiedRepo(26500787, "FiraCode", "Clojure", 37513, "2014-11-11T19:32:38Z"),
        createMinifiedRepo(51148780, "android-architecture", "Kotlin", 33693, "2016-02-05T13:42:07Z"),
        createMinifiedRepo(1234714, "elixir", "Elixir", 15717, "2011-01-09T08:43:57Z")
)

fun createMinifiedRepo(id: Long, name: String, language: String, stars: Int, createdAt: String) = Repo(
        id = id,
        name = name,
        language = language,
        stargazersCount = stars,
        createdAt = createdAt
)
