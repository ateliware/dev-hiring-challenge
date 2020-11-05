import { Request, Response, NextFunction } from 'express'

export const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  res.status(404).send({ code: 404, message: 'Endpoint does not exist'})
}
