import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error)

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
