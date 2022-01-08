import { Request, Response, NextFunction } from 'express'

const notFound = (_req: Request, res: Response, _next: NextFunction) =>
  res.status(404).json({ errMsg: 'Route does not exist' })

export default notFound
