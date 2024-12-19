import { Request, Response, NextFunction } from 'express'

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err)
  res.status(500).json({ msg: 'Something went wrong, please try again' })
}

export default errorHandlerMiddleware
