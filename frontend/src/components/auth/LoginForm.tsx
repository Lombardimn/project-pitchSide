"use client"

import Input from "@/components/ui/Input"
import { Lock, User } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"

export default function LoginForm() {
  return (
    <form
      className="mt-8 px-4 space-y-3 w-full"
      noValidate
    >
      <div className="pb-5">
        <Input
          type="text"
          placeholder="Nombre de Registro"
          id="username"
          name="username"
          label="Nombre de Usuario"
          autoComplete="username"
          icon={<User size={24} color="inherit" weight="duotone" />}
        />
      </div>

      <div className="pb-5">
        <Input
          type="password"
          placeholder="*************"
          id="password"
          name="password"
          label="Contraseña"
          icon={<Lock size={24} color="inherit" weight="duotone" />}
          variant
        />
      </div>

      <div className="pb-5 flex flex-col items-center justify-center">
        <Button
          type="submit"
          value="Iniciar Sesión"
          method={() => { }}
          classname="w-auto p-3 rounded-2xl flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
        />
      </div>
    </form>
  )
}