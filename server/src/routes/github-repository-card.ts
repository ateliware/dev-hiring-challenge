import {Router, Request, Response} from 'express'
import GitHubRepositoryCardController from '../controllers/GitHubRepositoryCard'

const GitHubRepositoryCardRouter = Router()

GitHubRepositoryCardRouter.post('/load', GitHubRepositoryCardController.load)
GitHubRepositoryCardRouter.get('/', GitHubRepositoryCardController.get)

export default GitHubRepositoryCardRouter