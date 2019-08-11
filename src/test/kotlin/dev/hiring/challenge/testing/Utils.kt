package dev.hiring.challenge.testing

fun loadJson(fileName: String) = ClassLoader.getSystemResource("json/$fileName").readText()
