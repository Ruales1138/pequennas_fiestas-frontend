import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#f3f2ff] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link to="/" className="text-md font-semibold tracking-tighter text-[#2e3145]">
            GigaShow
          </Link>
          <p className="text-sm text-[#2e3145]">© 2026 GigaShow. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link to="/terms" className="text-[#2e3145] transition-colors hover:text-[#4d44e3] hover:underline">
            Términos y Condiciones
          </Link>
          <Link to="/privacy" className="text-[#2e3145] transition-colors hover:text-[#4d44e3] hover:underline">
            Política de Privacidad
          </Link>
          <a href="#" className="text-[#2e3145] transition-colors hover:text-[#4d44e3] hover:underline">
            Configuración de las Cookies
          </a>
          <Link to="/contact" className="text-[#2e3145] transition-colors hover:text-[#4d44e3] hover:underline">
            Contáctanos
          </Link>
        </div>
      </div>
    </footer>
  )
}
