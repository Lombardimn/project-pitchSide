import dotenv from 'dotenv'
dotenv.config()

// ROUTES
export const PORT = process.env.PORT || 3000
export const MESSAGE_API = process.env.MESSAGE_API || "Error connection API"

// MAIL
export const MAIL_HOST = process.env.MAIL_HOST || "smtp.gmail.com"
export const MAIL_PORT = process.env.MAIL_PORT || 1234
export const MAIL_USER = process.env.MAIL_USER || "Error connection MAIL"
export const MAIL_PASS = process.env.MAIL_PASS || "Error connection MAIL"
export const MAIL_SECURE = process.env.MAIL_SECURE || "Error connection MAIL"
export const MAIL_TEMPLATE = process.env.MAIL_TEMPLATE || "Error connection MAIL"

// TOKEN
export const TOKEN_KEY = process.env.TOKEN_KEY || "Invalid token"
