import Confetti from "@/components/effects/Confetti";
import Button from "@/components/ui/Button";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";

export default function ConfirmationPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <Confetti />
      <div className="h-auto w-auto">
        <SealCheck size={120} weight="duotone" className="text-green-500 animate-bounce" />
      </div>
      <div className="text-white flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold">¡Tu cuenta ha sido verificada!</h1>
        <p className="text-center text-base">
          Ahora puedes acceder a todas las funcionalidades de tu cuenta. Inicia sesión y disfruta de la experiencia. 🚀
        </p>
      </div>
      <Button
        variant
        type="button"
        value="Completar Perfil"
        href="/account/profile"
        classname="w-auto p-3 mt-5 rounded-2xl flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 font-roboto text-xl cursor-pointer transition-colors duration-300 shadow-md text-white"
      />
    </section>
  )
}