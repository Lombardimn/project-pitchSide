import { Request, Response, NextFunction } from "express"

export interface ErrorMiddleware {
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void
}
