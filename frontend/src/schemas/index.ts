import { z } from 'zod'

const regexValidator = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g

export const createAccountSchema = z.object({
  email: z.string()
          .min(1,{ message: "El Email es requerido"})
          .email({ message: "El Email no es válido"}),
  username: z.string()
          .min(1,{ message: "El Nombre no puede estar vacío"})
          .max(20,{ message: "El Nombre no puede tener más de 20 caracteres"}),
  password: z.string()
          .min(8,{ message: "La Contraseña debe tener al menos 8 caracteres"})
          .regex(regexValidator, { message: 'Debe contener al menos 1 minuscula, 1 mayuscula, 1 caracter especial y 1 numero' }),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
});

export const successSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.object({})
})

export const errorResponseSchema = z.object({ error: z.string() })