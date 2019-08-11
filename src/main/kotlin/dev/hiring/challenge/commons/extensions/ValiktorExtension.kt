package dev.hiring.challenge.commons.extensions

import dev.hiring.challenge.commons.errors.ErrorObject
import dev.hiring.challenge.commons.errors.exception.MethodArgumentNotValidException
import java.util.Properties
import org.valiktor.Constraint
import org.valiktor.ConstraintViolationException
import org.valiktor.Validator
import org.valiktor.validate

private val properties = Properties().apply { load(ClassLoader.getSystemResourceAsStream("messages.properties")) }

fun <T : Any> T.validation(block: Validator<T>.(T) -> Unit) =
    try {
        validate(this) { obj -> block(obj) }
    } catch (exception: ConstraintViolationException) {
        val errors = exception.constraintViolations
            .map { ErrorObject(message(it.constraint), it.property, it.value) }
            .sortedWith(compareBy<ErrorObject> { it.field }.thenBy { it.message })

        throw MethodArgumentNotValidException(errors)
    }

private fun message(constraint: Constraint) = constraint
    .messageParams
    .entries
    .fold(properties[constraint.messageKey].toString()) { acc, entry ->
        acc.replace("{${entry.key}}", entry.value.toString())
    }
