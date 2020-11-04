import { Router } from 'express'
import { findTopRepositories } from '@src/controllers/repo.controller'
import { tokenValidation } from '@src/middlewares/auth.middleware'

const router = Router()

router.post('/repos', tokenValidation, findTopRepositories)

export default router
