import { NextMiddleware } from "../interface/middleware.interface";

export const validatedSchema: NextMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof Error && "errors" in error && Array.isArray(error.errors)) {
      return res.status(400).json({ error: error.errors.map((err) => err.message) });
    }
    return res.status(400).json({ error: "Validation error" })
  }
}
