import Button from "@/components/ui/Button";
import { Mailbox } from "@phosphor-icons/react/dist/ssr";

export default function SendCheckPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <div className="h-auto w-auto">
        <Mailbox size={120} weight="duotone" className="text-green-500 animate-bounce" />
      </div>
      <div className="text-white flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold">🔐 Verifica tu cuenta</h1>
        <p className="text-center text-base">
          Te hemos enviado un código de verificación a tu correo. Ingresa el código en la página de verificación para activar tu cuenta. Si no recibiste el correo, revisa el spam o solicita un nuevo código.
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