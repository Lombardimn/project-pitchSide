import { transport } from "../connection/nodemailer"

interface EmailProps {
  name: string,
  email: string,
  token: string
  emitter?: string
}

export class AuthEmail {
  static sendConfirmationEmail = async ({ name, email, token }: EmailProps) => {
    const sendEmailData = await transport.sendMail({
      // Para Google se debe configrar el from con el emitter = GMAIL_USER y agregar GMAIL_SECURE = false
      from: `PitchSide <admin@pitchside.com>`,
      to: email,
      subject: 'PitchSide - Verificación de Cuenta',
      html: bodyMailAuth(`http://localhost:3000/api/v1/auth/confirm-account`, token, name)
    })

    console.log('Message sent successfully' ,sendEmailData.messageId)
  }

  static sendResetPasswordEmail = async ({ name, email, token }: EmailProps) => {
    const sendEmailData = await transport.sendMail({
      from: `PitchSide <admin@pitchside.com>`,
      to: email,
      subject: 'PitchSide - Reestablece tu contraseña',
      html: bodyMailReset(`http://localhost:3000/api/v1/auth/forgot-password`, token, name)
    })

    console.log('Message sent successfully' ,sendEmailData.messageId)
  }
}

// Cuerpo del correo electrónico de verificación
const bodyMailAuth = ( url: string, token: string, name: string) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Cuenta</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      h1 {
        color: #333;
      }
      p {
        font-size: 16px;
        color: #666;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin: 20px 0;
        font-size: 16px;
        color: #fff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #999;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <h1>¡${name} Bienvenido a PitchSide!</h1>
      <p>Para completar tu registro, haz clic en el siguiente botón para verificar tu cuenta:</p>
      <a href="${url}" class="button">Verificar Cuenta</a>
      <p>Ingresa el siguiente token de verificación:</p>
      <span>${token}</span>
      <p>Si no solicitaste esta verificación, ignora este mensaje.</p>
      <div class="footer">
        <p>&copy; 2025 PitchSide. Todos los derechos reservados.</p>
      </div>
    </div>

  </body>
  </html>
  `
}

const bodyMailReset = ( url: string, token: string, name: string) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Cuenta</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      h1 {
        color: #333;
      }
      p {
        font-size: 16px;
        color: #666;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin: 20px 0;
        font-size: 16px;
        color: #fff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #999;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <h1>¡${name} Has solicitado un cambio de contraseña</h1>
      <p>Para completar la acción, haz clic en el siguiente botón para poder restablecer tu contraseña:</p>
      <a href="${url}" class="button">Restablecer Contrasena</a>
      <p>Ingresa el siguiente token de verificación:</p>
      <span>${token}</span>
      <p>Si no solicitaste esta acción, ignora este mensaje.</p>
      <div class="footer">
        <p>&copy; 2025 PitchSide. Todos los derechos reservados.</p>
      </div>
    </div>

  </body>
  </html>
  `
}