import { User } from '@src/models/user.model'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { GitHubClient } from '@src/client/github.client'
import { IGithubRepository } from '@src/interfaces/IGithubRepository'
import _ from 'lodash'

const client = new GitHubClient()

export async function findTopRepositories(
  req: Request,
  res: Response
): Promise<void> {
  try {
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

    const arrayRepos: IGithubRepository[] = await Promise.all(
      languages.map(async (lang: string) => {
        const response = await client.fetchRepositories(lang)
        return response
      })
    )

    const response = _.flattenDeep(arrayRepos).map((element) => {
      return {
        id: element.id,
        name: element.name,
        full_name: element.full_name,
        description: element.description,
        url: element.url,
        stargazers_count: element.stargazers_count,
        language: element.language,
      }
    })

    res.send(response)
  } catch (error) {
    res.status(500).send({ code: 500, message: error.message })
    return
  }
}
