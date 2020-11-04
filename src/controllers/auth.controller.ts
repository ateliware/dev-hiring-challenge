import { User } from '@src/models/user.model'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export async function signIn(req: Request, res: Response): Promise<void> {
  const result = getRepository(User).find()
  res.send(result)
}
