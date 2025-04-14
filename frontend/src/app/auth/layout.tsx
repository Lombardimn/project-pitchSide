import Header from "@/components/layout/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        title="PitchSide"
        subtitle="Gestión de futbol amateur"
        image="/images/logo.png"
        alt="Logo"
        className="h-80 w-full rounded-b-2xl flex flex-col items-center justify-center gap-4 text-white bg-gradient-to-b from-blue-400 from-0% via-blue-500 via-50% to-blue-300 to-100% shadow-md"
      />
      {children}
    </>
  );
}