import express from 'express'
import morgan from 'morgan'
import { connetDB } from './db'
import authRoutes from '../routes/auth.routes'
import userRoutes from '../routes/user.routes'
import rolRoutes from '../routes/rol.routes'
//import { limiter } from './limit'

connetDB()

const server = express()

// Limit of requests
//server.use(limiter)

//Middleware
server.use(morgan('dev'))
server.use(express.json())


// Routes
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/roles', rolRoutes)

export default server