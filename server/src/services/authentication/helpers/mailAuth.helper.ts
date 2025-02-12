import { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT, MAIL_SECURE } from '../../../connection/config'
import { MailConfig, SendMailParams } from '../../../interface/mail.interface'
import nodemailer from 'nodemailer'

// Configuración del transportador SMTP
const mailConfig: MailConfig = {
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: MAIL_SECURE === 'true',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
}

// Crear un transportador reutilizable
const transporter = nodemailer.createTransport(mailConfig as nodemailer.TransportOptions)

// Función para enviar el correo electrónica
export const sendMail = async ({ receiver, frontendURL, token }: SendMailParams) => {
  const mailOptions = {
    from: `No Reply ⛔ ${MAIL_USER}`,
    to: receiver,
    subject: 'Bienvenido a nuestra plataforma',
    html: bodyMail(frontendURL, token),
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

// Cuerpo del correo electrónico
const bodyMail = ( frontendURL: string, token: string) => {
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
      <h1>¡Bienvenido a [App PitchSide]!</h1>
      <p>Para completar tu registro, haz clic en el siguiente botón para verificar tu cuenta:</p>
      <a href="${frontendURL}/verification?token=${token}" class="button">Verificar Cuenta</a>
      <p>Si no solicitaste esta verificación, ignora este mensaje.</p>
      <div class="footer">
        <p>&copy; 2025 [App PitchSide]. Todos los derechos reservados.</p>
      </div>
    </div>

  </body>
  </html>
  `;
};

// const userEmail = MAIL_USER
// const userPass = MAIL_PASS

// // create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   host: MAIL_HOST,
//   port: Number(MAIL_PORT),
//   secure: MAIL_SECURE === 'true',
//   auth: {
//     user: userEmail,
//     pass: userPass, // Usar la App Password generada
//   },
// } as nodemailer.TransportOptions)

// export const sendMail = async (receiver: string, token: string) => {
//   const info = await transporter.sendMail({
//     from: `No Reply ⛔ ${userEmail}`,
//     to: receiver,
//     subject: 'Bienvenido a nuestra plataforma',
//     html: bodyMail(token)
//   })

//   return info
// }

// const bodyMail = (token: string) => {
//   return `
//   <!DOCTYPE html>
//   <html lang="es">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Verificación de Cuenta</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f4f4f4;
//         margin: 0;
//         padding: 0;
//       }
//       .container {
//         width: 100%;
//         max-width: 600px;
//         margin: 20px auto;
//         background-color: #ffffff;
//         padding: 20px;
//         border-radius: 8px;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         text-align: center;
//       }
//       h1 {
//         color: #333;
//       }
//       p {
//         font-size: 16px;
//         color: #666;
//       }
//       .button {
//         display: inline-block;
//         padding: 12px 20px;
//         margin: 20px 0;
//         font-size: 16px;
//         color: #fff;
//         background-color: #007bff;
//         text-decoration: none;
//         border-radius: 5px;
//       }
//       .footer {
//         margin-top: 20px;
//         font-size: 14px;
//         color: #999;
//       }
//     </style>
//   </head>
//   <body>

//     <div class="container">
//       <h1>¡Bienvenido a [App PitchSide]!</h1>
//       <p>Para completar tu registro, haz clic en el siguiente botón para verificar tu cuenta:</p>
//       <a href="http://localhost:3000/api/v1/verify/${token}" class="button">Verificar Cuenta</a>
//       <p>Si no solicitaste esta verificación, ignora este mensaje.</p>
//       <div class="footer">
//         <p>&copy; 2025 [App PitchSide]. Todos los derechos reservados.</p>
//       </div>
//     </div>

//   </body>
//   </html>

//   `
// }
