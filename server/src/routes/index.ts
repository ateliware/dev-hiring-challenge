import {Router, Request, Response} from 'express'
import GitHubRepositoryCardRouter from './github-repository-card'

const IndexRouter = Router()

IndexRouter.use('/repository', GitHubRepositoryCardRouter)

IndexRouter.get('/', (req: Request, res: Response) => {
  res.json('Server ok!')
})

export default IndexRouter