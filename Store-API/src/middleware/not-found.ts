import { Request, Response } from 'express'
export const notFound = (req: Request, res: Response): void => {
  res.status(404).send('Route does not exist')
}

module.exports = notFound

export default notFound
