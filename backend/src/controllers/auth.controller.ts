import { Request, Response } from "express"
import User from "../models/user.model"
import { checkPassword, hashPassword } from "../helpers/auth.helper"
import { generateToken } from "../helpers/token.helper"
import { AuthEmail } from "../email/auth.email"
import { generateJWT } from "../helpers/jwt.helper"
import { NODE_ENV } from "../connection/config"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      res.status(409).json({ message: 'There is already a user with the indicated email address' })
    }

    try {
      const user = new User(req.body)

      // Hash password
      user.password = await hashPassword(password)
      
      // Generate token
      user.token = generateToken()
      
      // Save user
      await user.save()

      // Send confirmation email
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      })

      res.json({
        status: 201,
        success: true,
        message: 'Account created successfully',
        data: user
      })

    } catch (error) {
      console.error('Error create account ->>' ,error)
      res.status(500).json({ 
        message: 'Error create account'
      })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body

    try {
      // Search user
      const user = await User.findOne({ where: { token } })

      // Check if user exists
      if (!user) {
        res.status(401).json({ message: 'Token not valid' })
      }

      user.confirmationToken = true
      user.token = null

      await user.save()

      res.json({
        status: 201,
        success: true,
        message: 'Account confirmed successfully',
        data: user
      })

    } catch (error) {
      console.error('Error confirm account ->>' ,error)
      res.status(500).json({ 
        message: 'Error confirm account'
      })
    }
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ where: { email } })

    if (!userExists) {
      res.status(404).json({ message: 'This user does not exist' })
    }

    // Check if user is confirmed
    if (!userExists.confirmationToken) {
      res.status(403).json({ message: 'This user is not confirmed' })
    }

    // Check password
    const isPasswordValid = await checkPassword(password, userExists.password)

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Password not valid' })
    }

    // Generate token
    const token = generateJWT(userExists.id)

    res.cookie('token', token, {
      httpOnly: true, // Evita acceso desde JS en frontend
      secure: NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'strict', // Evita envío en solicitudes de terceros
      maxAge: 24 * 60 * 60 * 1000 // 1 día de expiración
    })

    res.json({
      status: 200,
      success: true,
      message: 'User logged successfully',
      data: userExists.id
    })
  }

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    // Check if user exists
    const userExists = await User.findOne({ where: { email } })

    if (!userExists) {
      res.status(404).json({ message: 'This user does not exist' })
    }

    // Generate token
    userExists.token = generateToken()
    await userExists.save()

    // Send email
    await AuthEmail.sendResetPasswordEmail({
      name: userExists.name,
      email: userExists.email,
      token: userExists.token
    })

    res.json({
      status: 200,
      success: true,
      message: 'Check your email to continue with the process',
      data: userExists.id
    })
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body

    // Check if token is valid
    const tokenExists = await User.findOne({ where: { token } })

    if (!tokenExists) {
      res.status(404).json({ message: 'Token not valid' })
    }

    res.json({
      status: 200,
      success: true,
      message: 'Token is valid',
      data: tokenExists.id
    })
  }

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const userExists = await User.findOne({ where: { token } })

    // Check if token is valid
    if (!userExists) {
      res.status(404).json({ message: 'Token not valid' })
    }

    // Hash password
    userExists.password = await hashPassword(password)
    userExists.token = null

    await userExists.save()

    res.json({
      status: 200,
      success: true,
      message: 'Password updated successfully',
      data: userExists.id
    })
  }

  static user = async (req: Request, res: Response) => {
    res.json({
      status: 200,
      success: true,
      message: 'User found successfully',
      data: req.user
    })
  }

  static updatePassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body
    const { id } = req.user

    const userExists = await User.findByPk(id)

    const isPasswordValid = await checkPassword(current_password, userExists.password)

    // Check if password is valid
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Current password not valid' })
    }

    // Hash password
    userExists.password = await hashPassword(password)

    await userExists.save()

    res.json({
      status: 200,
      success: true,
      message: 'Password updated successfully',
      data: userExists.id
    })
  }

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.user

    const userExists = await User.findByPk(id)

    const isPasswordValid = await checkPassword(password, userExists.password)

    // Check if password is valid
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Current password not valid' })
    }

    res.json({
      status: 200,
      success: true,
      message: 'Password checked successfully',
      data: userExists.id
    })
  }
}
