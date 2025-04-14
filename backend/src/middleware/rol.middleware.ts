import { body, param, validationResult } from "express-validator"
import type { Request, Response, NextFunction } from "express"
import Rol from "../models/rol.model"

declare global {
  namespace Express {
    interface Request {
      rol?: Rol
    }
  }
}

export const validateRolInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name')
    .notEmpty().withMessage('Name is required')
    .custom(value => value.length > 3 ).withMessage('Name must be at least 3 characters long')
    .run(req)

  await body('description')
    .notEmpty().withMessage('Description is required')
    .custom(value => value.length > 3 ).withMessage('Description must be at least 3 characters long')
    .run(req)

  next()
}

export const validateRolId = async (req: Request, res: Response, next: NextFunction) => {
  await param('rolId')
    .isInt().withMessage('Id not valid')
    .custom(value => value > 0).withMessage('Id must be greater than 0')
    .run(req)
    
  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const validateRolExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rolId } = req.params

    const rol = await Rol.findByPk(rolId)

    if(!rol) {
      const error = new Error('User not found')
      res.status(404).json({ error: error.message })
    }

    req.rol = rol

    next()
  } catch (error) {
    console.error('Error finding user ->>' ,error)
    res.status(500).json({ 
      message: 'Error finding user'
    })
  }
}