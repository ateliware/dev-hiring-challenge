package br.com.library.user.service.commons.errors

class ErrorObject(
    val message: String,
    val details: Map<String, Any> = mapOf()
) {
    companion object {
        fun create(message: String, vararg detail: Pair<String, Any>) =
            ErrorObject(message, detail.toMap())
    }
}