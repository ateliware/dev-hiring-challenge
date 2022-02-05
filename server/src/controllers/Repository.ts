require('dotenv').config()
import {Request, Response} from 'express'
import { RepositoryCardDatabaseHandler } from '../database/functions/Repository'
import { GitHubRepositoryPayload } from '../interfaces/GitHubRepository'
import APIHandler from '../services/xhr'
import { GitHubToRepositoryEntityAdapter } from '../use-cases/RepositoryAdapter'

const RepositoryController = {

  load: async (req: Request, res: Response) => {

    try {

      const {languages} = req.body

      await RepositoryCardDatabaseHandler.deleteAll()

      for (let language of languages) {
        const ghRepositoryPayload: GitHubRepositoryPayload = await APIHandler.request('get', `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc`)
        const repositories = new GitHubToRepositoryEntityAdapter().formatRepositoryPayload(ghRepositoryPayload)
        await RepositoryCardDatabaseHandler.insertMany(repositories)
      }

      res.sendStatus(200)

    } catch (error) {
      console.log(error)
    }


  },

  get: async (req: Request, res: Response) => {

    const repositories = await RepositoryCardDatabaseHandler.getAll()

    res.json({repositories: repositories})
  }
}

export default RepositoryController