"use client"

import Input from "@/components/ui/Input";
import { Envelope, Lock, User } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { createAccount } from "@/actions/createAccount.action";
import { useActionState, useEffect, useState } from "react";
import { getFieldError } from "@/utils";
import { useRouter } from "next/navigation"
import Loader from "../ui/Loader";

export default function RegisterForm() {
  const [submitCount, setSubmitCount] = useState<number>(0) // Contador de envíos
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false) // Estado para manejo del loader
  const [state, dispatch] = useActionState(
    createAccount, {
      errors: [],
      success: {
        status: 0,
        success: false,
        message: '',
        data: {}
      }
    }
  )

  const router = useRouter()

  // Manejo de visualización de errores en el formulario
  const handleSubmit = () => {
    setSubmitCount(prev => prev + 1)
  }
  console.log(state)

  // Efecto para redireccionar si success viene seteado
  useEffect(() => {
    if (state.success.status === 200 && state.success.success) {
      setIsRedirecting(true)

      const timeout = setTimeout(() => {
        router.push("/statuses/send-check")
      }, 2000) // Tiempo para mostrar el loader antes de redirigir

      return () => clearTimeout(timeout)
    }
  }, [state.success, router])

  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
    >
      {
        isRedirecting
          ? (<Loader />)
          : (
            <>
              <div className="pb-6">
                <Input
                  type="email"
                  placeholder="Email de Registro"
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  error={getFieldError("email", state.errors)}
                  submitCount={submitCount}
                  icon={<Envelope size={24} color="inherit" weight="duotone" />}
                />
              </div>

              <div className="pb-6">
                <Input
                  type="text"
                  placeholder="Nombre de Registro"
                  id="username"
                  name="username"
                  label="Nombre de Usuario"
                  autoComplete="username"
                  error={getFieldError("username", state.errors)}
                  submitCount={submitCount}
                  icon={<User size={24} color="inherit" weight="duotone" />}
                />
              </div>

              <div className="pb-6">
                <Input
                  type="password"
                  placeholder="*************"
                  id="password"
                  name="password"
                  label="Contraseña"
                  error={getFieldError("password", state.errors)}
                  submitCount={submitCount}
                  icon={<Lock size={24} color="inherit" weight="duotone" />}
                  variant
                />
              </div>

              <div className="pb-6">
                <Input
                  type="password"
                  placeholder="*************"
                  id="password_confirmation"
                  name="password_confirmation"
                  label="Confirmar Contraseña"
                  error={getFieldError("password_confirmation", state.errors)}
                  submitCount={submitCount}
                  icon={<Lock size={24} color="inherit" weight="duotone" />}
                  variant
                />
              </div>

              <div className="pb-6 flex flex-col items-center justify-center">
                <Button
                  type="submit"
                  value="Registrarse"
                  method={() => { }}
                  classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
                />
              </div>
            </>
          )
      }
    </form>
  )
}