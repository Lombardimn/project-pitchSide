import { z } from 'zod'

const regexValidator = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g

export const LoginSchema = z.object({
  email: z.optional(z
    .string({ required_error: 'El usuario es requerido', invalid_type_error: 'Debe ser una cadena de texto' })
    .email({ message: 'El correo electrónico no es válido' })),
  username: z.optional(z
    .string({ required_error: 'El usuario es requerido', invalid_type_error: 'Debe ser una cadena de texto' })
    .min(4, { message: 'El usuario debe tener al menos 4 caracteres' })
    .max(20, { message: 'El usuario debe tener menos de 20 caracteres' })),
  password: z.string().regex(regexValidator).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})