import { signIn } from '@src/controllers/auth.controller'
import { Router } from 'express'
const router = Router()

router.get('/signin', signIn)

export default router
