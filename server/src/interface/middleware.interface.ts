import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

export interface ErrorMiddleware {
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void
}

export interface NextMiddleware {
  (
    schema: ZodSchema
  ): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
}

export interface Middleware {
  (
    req: Request | any,
    res: Response | any,
    next?: NextFunction | any
  ): void
}
