import { Middleware } from "../../../interface/middleware.interface"
import { prisma } from "../../../connection/db"
import bcrypt from 'bcryptjs'

export const SingUp: Middleware = async (req, res) => {
  const {
    username: Username, 
    email: Email,
    age: Age,
    password
  } = req.body
  
  try {
    if (!Email || !password || !Username) {
      return res.status(401).json({
        message: 'Data is not valid'
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { Email },
    })

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered'
      })
    }

    // Hash password
    const passwordHash: string = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        Username,
        Email,
        Age,
        Password: passwordHash
      }
    })

    if (!newUser) {
      return res.status(401).json({
        message: 'Data is not valid'
      })
    }

    res.json({
      status: 200,
      success: true,
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    console.error('Error creating user ->>' ,error)
    return res.status(500).json({
      message: 'Error creating user'
    })
  }
  
}

export const SingIn: Middleware = (req, res) => {
  res.send('singIn')
}

export const LogOut: Middleware = (req, res) => {
  res.send('logOut')
}
