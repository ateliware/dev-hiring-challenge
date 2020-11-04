import config, { IConfig } from 'config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const jwt_config: IConfig = config.get('App.auth')

export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('auth-token')

    if (!token) {
      res.status(401).json({ code: 401, message: 'Access denied' })
    }

    const payload = jwt.verify(token as string, jwt_config.get('key'))

    req.decoded = payload
    next()
  } catch (error) {
    res.status(401).json({ code: 401, message: 'Access denied' })
  }
}
