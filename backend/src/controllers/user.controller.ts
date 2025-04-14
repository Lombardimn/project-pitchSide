import { Request, Response } from "express"
import User from "../models/user.model"

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        order: [['createdAt', 'DESC']],
        limit: 50,
        where: {
          enabled: 1
        }
      })

      res.json({
        status: 201,
        success: true,
        message: 'Users finded successfully',
        data: users
      })

    } catch (error) {
      console.error('Error finding users ->>' ,error)
      res.status(500).json({ 
        message: 'Error finding users'
      })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body)

      await user.save()
      
      res.json({
          status: 201,
          success: true,
          message: 'User created successfully',
          data: user
      })

    } catch (error) {
      console.error('Error creating user ->>' ,error)
      res.status(500).json({ 
        message: 'Error creating user'
      })
    }
  }

  static getById = async (req: Request, res: Response) => {
    res.json({
      status: 201,
      success: true,
      message: 'User finded successfully',
      data: req.user
    })
  }

  static updateById = async (req: Request, res: Response) => {
    await req.user.update(req.body)
      
    res.json({
      status: 201,
      success: true,
      message: 'User updated successfully',
      data: req.user
    })
  }

  static deleteById = async (req: Request, res: Response) => {
    await req.user.update({ enabled: 0 })

    res.json({
      status: 201,
      success: true,
      message: 'User deleted successfully',
      data: {}
    })
  }
}