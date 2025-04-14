import type { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import User from "../models/user.model"

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
  await param('userId')
    .isInt().withMessage('Id not valid')
    .custom(value => value > 0).withMessage('Id must be greater than 0')
    .run(req)
    
  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const validateUserExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params

    const user = await User.findByPk(userId)

    if(!user) {
      const error = new Error('User not found')
      res.status(404).json({ error: error.message })
    }

    req.user = user

    next()
  } catch (error) {
    console.error('Error finding user ->>' ,error)
    res.status(500).json({ 
      message: 'Error finding user'
    })
  }
}

export const validateUserInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name')
    .notEmpty().withMessage('Name is required')
    .custom(value => value.length > 3 ).withMessage('Name must be at least 3 characters long')
    .run(req)
  
  await body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid')
    .run(req)
  
  await body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
    .run(req)

  await body('token').notEmpty().withMessage('Role is required')
    .isLength({ min: 6 }).withMessage('Token must be at least 6 characters long')
    .isNumeric().withMessage('Token must be a number')
    .run(req)

  next()
}