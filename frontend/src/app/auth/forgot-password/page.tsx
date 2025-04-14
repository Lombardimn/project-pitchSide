import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Restablecer contraseña | PitchSide",
  description: "Crea una cuenta para acceder a la aplicación.",
}


export default function ForgotPasswordPage() {
  return (
    <main>
      <Card>
        <h1 className="text-2xl font-bold mt-8">Recuperar contraseña</h1>
        <p className="text-base font-normal py-4 text-left px-6 w-full text-gray-700">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y sigue las instrucciones.
        </p>

        <ForgotPasswordForm />
      </Card>
    </main>
  )
}