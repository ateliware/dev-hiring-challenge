import { User } from '@src/models/user.model'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import config, { IConfig } from 'config'

const jwt_config: IConfig = config.get('App.auth')

export async function signUp(req: Request, res: Response): Promise<void> {
  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password ||
    !req.body.fullname
  ) {
    res.status(422).json({ code: 422, error: 'Validation Failed' })
    return
  }

  const user = new User()
  user.username = req.body.username
  user.fullname = req.body.fullname
  user.email = req.body.email
  user.password = req.body.password
  const result = await getRepository(User).save(user)

  const token: string = jwt.sign(
    { id: result.id, username: result.username, email: result.email },
    jwt_config.get('key'),
    { expiresIn: 60 * 60 }
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...response } = result

  res.header('auth-token', token).json(response)
}

export async function signIn(req: Request, res: Response): Promise<void> {
  res.send('signin')
}

export async function getTopRepositories(
  req: Request,
  res: Response
): Promise<void> {
  res.send('repositories')
}
