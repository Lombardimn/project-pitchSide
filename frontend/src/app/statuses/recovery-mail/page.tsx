import Button from "@/components/ui/Button"
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr"

export default function RecoveryMailPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
    <div className="h-auto w-auto">
      <PaperPlaneTilt size={120} weight="duotone" className="text-green-500 animate-fly-away" />
    </div>
    <div className="text-white flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">📧 Correo enviado</h1>
      <p className="text-center text-base">
        Si la dirección ingresada es correcta, recibirás un correo con un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada o la carpeta de spam.
      </p>
    </div>
    <Button
      variant
      type="button"
      value="Iniciar Sesión"
      href="/auth/login"
      classname="w-auto p-3 mt-5 rounded-2xl flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
    />
  </section>
  )
}