import { Middleware } from "../../../interface/middleware.interface"
import { createAccessToken } from "../../../helpers/jwt.helper"
import { TOKEN_KEY } from "../../../connection/config"
import { sendMail } from "../helpers/mailAuth.helper"
import { prisma } from "../../../connection/db"
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface SignInRequestBody {
  username?: string;
  email?: string;
  password: string;
}

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

    // Send email to user with token for verification
    const token: string = await createAccessToken({
      id: newUser.Id,
      email: newUser.Email
    })

    await prisma.user_validation.create({
      data: {
        UserId: newUser.Id,
        Code: token
      }
    })

    const existingToken = await prisma.user_validation.findUnique({
      where: { UserId: newUser.Id }
    })

    if (!existingToken) {
      return res.status(500).json({
        message: 'Error creating token for user'
      })
    }

    const mail = await sendMail(
      { 
        receiver: newUser.Email,
        token: token,
        frontendURL: 'http://localhost:3000/api/v1'
      }
    )

    console.log(mail)

    if (mail.accepted.length === 0) {
      return res.status(500).json({
        message: 'Error sending email'
      })
    }
    
    res.cookie('Id', newUser.Id, {
      httpOnly: true, // Evita acceso desde JS en frontend
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'Strict', // Evita envío en solicitudes de terceros
      maxAge: 24 * 60 * 60 * 1000 // 1 día de expiración
    })

    res.json({
      status: 200,
      success: true,
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    console.error('Error creating user ->>' ,error)
    return res.status(500).json({
      message: 'Error creating user.'
    })
  }
  
}

export const SingIn: Middleware = async (req: Request<{}, {}, SignInRequestBody>, res) => {
  const { username, email, password } = req.body
  const credentials = email || username

  try {
    if (!email && !password) {
      return res.status(400).json({
        message: 'Data incomplete'
      })
    }
  
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { Email: credentials },
          { Username: credentials }
        ]
      }
    })
  
    if (!user) {
      return res.status(404).json({
        message: 'Credentials not valid'
      })
    }
  
    const passwordMatch = await bcrypt.compare(password, user.Password)
  
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Credentials not valid'
      })
    }
  
    if (!user.Verified) {
      return res.status(403).json({
        message: 'User not validated. Verification pending'
      })
    }
  
    const token = await createAccessToken({
      id: user.Id,
      username: user.Username
    })
  
    res.cookie('token', token, {
      httpOnly: true, // Evita acceso desde JS en frontend
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'Strict', // Evita envío en solicitudes de terceros
      maxAge: 24 * 60 * 60 * 1000 // 1 día de expiración
    })
  
    res.json({
      status: 200,
      success: true,
      message: 'User logged in successfully',
      data: user
    })
  } catch (error) {
    console.error('Error logging in ->>', error)
    return res.status(500).json({
      message: 'Error logging in'
    })
  }
  
}

export const LogOut: Middleware = (req, res) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true, // Evita acceso desde JS en frontend
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'Strict' // Evita envío en solicitudes de terceros
    })

    return res.sendStatus(200)
  } catch (error) {
    console.error('Error logging out ->>', error)
    return res.status(500).json({
      message: 'Error logging out'
    })
    
  }
}

export const Verify: Middleware = async (req, res) => {
  const { Id } = req.cookies
  const { token } = req.query

  try {
    const userVerified = await prisma.user_validation.findUnique({
      where: { UserId: Id },
      select: { Code: true }
    })
  
    if (!userVerified) {
      return res.status(400).json({
        message: 'User not validated'
      })
    }
  
    if (userVerified.Code !== token) {
      return res.status(400).json({
        message: 'Token not valid'
      })
    }
  
    const decodedToken = jwt.verify(userVerified.Code, TOKEN_KEY) as { id: string, email: string }
  
    const confirmation = await prisma.user.findUnique({
      where: { Id: decodedToken.id, Email: decodedToken.email }
    }) 
  
    if (!confirmation) {
      return res.status(400).json({
        message: 'Token not valid'
      })
    }
  
    await prisma.user.update({
      where: { Id },
      data: {
        Verified: true
      }
    })
  
    await prisma.user_validation.delete({
      where: { UserId: Id }
    })
  
    res.clearCookie('Id')
  
    res.json({
      status: 200,
      success: true,
      message: 'User verified successfully'
    })
  } catch (error) {
    console.error('Error verifying user ->>', error)
    return res.status(500).json({
      message: 'Error verifying user'
    })
  }
}