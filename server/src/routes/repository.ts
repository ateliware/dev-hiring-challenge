import {Router, Request, Response} from 'express'
import RepositoryController from '../controllers/Repository'

const RepositoryRouter = Router()

RepositoryRouter.post('/load', RepositoryController.load)
RepositoryRouter.get('/', RepositoryController.get)

export default RepositoryRouter