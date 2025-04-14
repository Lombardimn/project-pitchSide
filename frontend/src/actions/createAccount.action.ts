"use server"

import { createAccountSchema, errorResponseSchema, successSchema } from "@/schemas"

export type ActionStateType = {
  errors: Array<{ path: string; message: string }>
  success: {
    status: number
    success: boolean
    message: string
    data: object
  }
}

const initialSuccessState = {
  status: 0,
  success: false,
  message: '',
  data: {}
}

export async function createAccount(prevState: ActionStateType, formData: FormData) {
  
  // Crear el objeto con los datos del formulario
  const registerData = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  }

  // Validar los datos del formulario
  const register = createAccountSchema.safeParse(registerData)
 
  if (!register.success) {
    //const errors = register.error.errors.map(error => error.message)
    const errors = register.error.errors.map(error => ({
      path: error.path.join('.') ?? '',
      message: error.message
    }));

    return {
      errors,
      success: prevState.success
    }
  }

  // Enviar los datos al servidor
  const url = `${process.env.API_URL}/auth/register`

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: register.data.email,
      username: register.data.username,
      password: register.data.password,
    }),
  })

  const json = await req.json()

  if (req.status === 409) {
    const { error } = errorResponseSchema.parse(json)

    return {
      success: initialSuccessState,
      errors: [
        {
          path: "global",
          message: error
        }
      ]
    }
  }

  const success = successSchema.parse(json)

  return {
    errors: [],
    success
  }
}