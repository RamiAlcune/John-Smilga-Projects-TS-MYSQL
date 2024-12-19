import { Request, Response, NextFunction } from 'express'

export const asyncWrapper = (
  func: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await func(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

export default asyncWrapper
