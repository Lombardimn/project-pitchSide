import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { JWT_SECRET } from '../connection/config'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  // Check if JWT is valid
  if (!bearer) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  const [_, token] = bearer.split(' ')

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'object' && decoded.id) {
      req.user = await User.findByPk(decoded.id,{
        attributes: ['id', 'name', 'email', 'rolId']     
      })

      next()
    }

  } catch (error) {
    console.error('Error getting user ->>' ,error)
    res.status(500).json({ 
      message: 'Error getting user'
    })
  }
}