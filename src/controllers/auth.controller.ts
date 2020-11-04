import { Request, Response } from 'express'

export async function signIn(req: Request, res: Response): Promise<void> {
  res.send({ hello: 'world' })
}
