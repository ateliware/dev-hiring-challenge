import { HttpStatus } from '@nestjs/common'

interface ErrorDecoder {
  message: string
  code: HttpStatus
}

export function githubApiErrorDecoder(error: any): ErrorDecoder {
  let message = error?.response?.data?.message || 'Error to connect with GitHub API'
  const code = HttpStatus.FAILED_DEPENDENCY

  if (message.includes('user ID')) {
    const userIndex = message.indexOf('for user')
    const messageWithoutUser = message.slice(0, userIndex)

    message = `GitHub ${messageWithoutUser} wait a minute.`
  }

  return { message, code }
}
