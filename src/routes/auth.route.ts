import {
  getTopRepositories,
  signIn,
  signUp,
} from '@src/controllers/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.get('/repositories', getTopRepositories)

export default router
