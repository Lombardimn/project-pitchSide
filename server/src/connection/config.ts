import dotenv from 'dotenv'
dotenv.config()

// ROUTES
export const PORT = process.env.PORT || 3000
export const MESSAGE_API = process.env.MESSAGE_API || "Error connection API"