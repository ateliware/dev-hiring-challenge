import {Router, Request, Response} from 'express'
import RepositoryRouter from './repository'

const IndexRouter = Router()

IndexRouter.use('/repository', RepositoryRouter)

IndexRouter.get('/', (req: Request, res: Response) => {
  res.json('Server ok!')
})

export default IndexRouter