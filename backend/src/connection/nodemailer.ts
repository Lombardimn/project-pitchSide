import nodemailer from "nodemailer"
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from "./config"


interface MailConfig {
  host: string
  port: number
  auth: {
    user: string
    pass: string
  }
}

const config = (): MailConfig => {
  return {
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  }
}

export const transport = nodemailer.createTransport(config())