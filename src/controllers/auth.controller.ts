import { User } from '@src/models/user.model'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import config, { IConfig } from 'config'

const jwt_config: IConfig = config.get('App.auth')

const TOKEN_EXPIRESIN_SECONDS = 3600

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.password ||
      !req.body.fullname
    ) {
      res.status(422).json({ code: 422, message: 'Validation Failed' })
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
      { expiresIn: TOKEN_EXPIRESIN_SECONDS }
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...response } = result

    res.header('auth-token', token).json(response)
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(422).json({ code: 422, message: 'Validation Failed' })
      return
    }

    const { email, password } = req.body

    const user = await getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne()

    if (!user) {
      res.status(400).json({ code: 400, message: 'Email is wrong' })
      return
    }

    const passwordIsValid = await user?.validatePassword(password)

    if (!passwordIsValid) {
      res.status(400).json({ code: 400, message: 'Invalid password' })
      return
    }

    const token = jwt.sign(
      { id: user?.id, username: user?.username, email: user?.email },
      jwt_config.get('key'),
      { expiresIn: TOKEN_EXPIRESIN_SECONDS }
    )

    if (user) user.password = ''

    res.header('auth-token', token).json(user)
    return
  } catch (error) {
    res.status(500).send({ code: 500, message: error.message })
  }
}
