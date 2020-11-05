import { User } from '@src/models/user.model'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { GitHubClient } from '@src/client/github.client'

const client = new GitHubClient()

export async function findTopRepositories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.body.languages) {
      res.status(422).json({ code: 422, message: 'Validation Failed' })
    }

    const { languages } = req.body
    const result = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ languages: languages })
      .where('id = :id', { id: req.decoded.id })
      .execute()

    if (!result.affected) {
      res.status(400).json({ code: 400, message: 'Invalid Token' })
      return
    }

    const response = await client.formatResponse(languages)

    res.send(response)
  } catch (error) {
    res.status(500).send({ code: 500, message: error.message })
  }
}
