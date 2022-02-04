require('dotenv').config()
import {Request, Response} from 'express'
import { GitHubRepositoryPayload } from '../interfaces/GitHubRepository'
import { TRepository } from '../interfaces/Repository'
import APIHandler from '../services/xhr'
import { GitHubToRepositoryEntityAdapter } from '../use-cases/RepositoryAdapter'

let fake_db: TRepository[] = []

const RepositoryController = {

  load: async (req: Request, res: Response) => {

    try {

      const {languages} = req.body

      for (let language of languages) {
        const ghRepositoryPayload: GitHubRepositoryPayload = await APIHandler.request('get', `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc`)
        const repositories = new GitHubToRepositoryEntityAdapter().formatRepositoryPayload(ghRepositoryPayload)
        fake_db = fake_db.concat(repositories)
      }

      res.sendStatus(200)

    } catch (error) {
      console.log(error)
    }


  },

  get: async (req: Request, res: Response) => {
    res.json({repositories: fake_db})
  }
}

export default RepositoryController