import LoginForm from "@/components/auth/LoginForm";
import Card from "@/components/ui/Card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Iniciar sesión | PitchSide",
  description: "Crea una cuenta para acceder a la aplicación.",
}

export default function LoginPage() {
  return (
      <main>
        <Card>
          <h1 className="text-2xl font-bold mt-8">Iniciar sesión</h1>
          <LoginForm />

          <div className="flex flex-col items-center justify-center my-8">
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-4"
            >
              No tienes cuenta? Regístrate
            </Link>

            <Link
              href="/auth/forgot-password"
              className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-4"
            >
              Olvidaste tu contraseña?
            </Link>
          </div>
        </Card>
      </main>
  )
}