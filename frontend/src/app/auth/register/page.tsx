import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crear cuenta | PitchSide",
  description: "Crea una cuenta para acceder a la aplicación.",
}


export default function RegisterPage() {
  return (
    <main>
      <Card>
        <h1 className="text-2xl font-bold mt-8">Crear cuenta</h1>
        <RegisterForm />
        <Link
          href="/auth/login"
          className="text-blue-500 hover:text-blue-600 font-medium text-sm pb-4"
        >
          Ya tienes cuenta? Inicia sesión
        </Link>
      </Card>
    </main>
  )
}