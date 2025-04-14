export default function StatusesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-10 px-8 h-screen bg-gradient-to-b from-blue-400 from-0% via-blue-500 via-50% to-blue-300 to-100%">
        {children}
      </main>
      <footer className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 text-white">
          <p className="text-center text-base">
            © {new Date().getFullYear()} PitchSide. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
