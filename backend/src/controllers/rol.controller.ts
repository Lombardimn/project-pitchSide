import type { Request, Response } from 'express'
import Rol from '../models/rol.model'

export class RolController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const users = await Rol.findAll({
        order: [['name', 'ASC']],
        limit: 50,
      })

      res.json({
        status: 201,
        success: true,
        message: 'Roles finded successfully',
        data: users
      })

    } catch (error) {
      console.error('Error finding roles ->>' ,error)
      res.status(500).json({ 
        message: 'Error finding roles'
      })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const rol = new Rol(req.body)

      await rol.save()

      res.json({
        status: 201,
        success: true,
        message: 'Rol created successfully',
        data: rol
      })
      
    } catch (error) {
      console.error('Error finding rol ->>' ,error)
      res.status(500).json({ 
        message: 'Error finding rol'
      })
    }
  }

  static getById = async (req: Request, res: Response) => {
    res.json({
      status: 201,
      success: true,
      message: 'Rol finded successfully',
      data: req.rol
    })
  }

  static updateById = async (req: Request, res: Response) => {
    await req.rol.update(req.body)
      
    res.json({
      status: 201,
      success: true,
      message: 'Rol updated successfully',
      data: req.rol
    })
  }

  static deleteById = async (req: Request, res: Response) => {
    await req.rol.update({ enabled: 0 })

    res.json({
      status: 201,
      success: true,
      message: 'User deleted successfully',
      data: {}
    })
  }
}
