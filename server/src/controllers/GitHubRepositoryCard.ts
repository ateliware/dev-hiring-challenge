require('dotenv').config()
import {Request, Response} from 'express'
import { GitHubRepositoryCardDatabaseHandler } from '../database/functions/GitHubRepositoryCard'
import { GitHubRepositoryPayload } from '../interfaces/GitHubRepository'
import APIHandler from '../services/xhr'
import { GitHubToRepositoryEntityAdapter } from '../use-cases/RepositoryAdapter'

const GitHubRepositoryCardController = {

  load: async (req: Request, res: Response) => {

    try {

      const {languages} = req.body

      await GitHubRepositoryCardDatabaseHandler.deleteAll()

      for (let language of languages) {
        const ghRepositoryPayload: GitHubRepositoryPayload = await APIHandler.request('get', `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc`)
        const repositories = GitHubToRepositoryEntityAdapter.formatRepositoryPayload(ghRepositoryPayload)
        await GitHubRepositoryCardDatabaseHandler.insertMany(repositories)
      }

      res.status(200).json({
        success: true
      })

    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false
      })
    }

  },

  get: async (req: Request, res: Response) => {

    const repositories = await GitHubRepositoryCardDatabaseHandler.getAll()

    res.json({repositories: repositories})
  }
}

export default GitHubRepositoryCardController