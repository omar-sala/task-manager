import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validate = (
  schema: ZodSchema,
  source: 'body' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = source === 'params' ? req.params : req.body

    const result = schema.safeParse(data)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      })
    }

    if (source === 'params') {
      req.params = result.data as typeof req.params
    } else {
      req.body = result.data
    }

    next()
  }
}
