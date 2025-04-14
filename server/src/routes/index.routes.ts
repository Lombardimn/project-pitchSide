import { Router } from 'express'
import { prisma } from '../connection/db'

const router = Router()

router.get('/ping', async (req, res) => {
  try {
    // Verifica la conexión haciendo una consulta simple
    await prisma.$queryRaw`SELECT 1`

    res.json({
      status: "success",
      message: "Database connected successfully"
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: (error as Error).message
    })
  }
})

export default router
