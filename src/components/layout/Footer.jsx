import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto bg-[#f3f2ff]">
            <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 max-w-7xl mx-auto gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <Link to="/" className="text-md font-semibold tracking-tighter text-[#2e3145]">GigaShow</Link>
                    <p className="text-sm text-[#2e3145]">© 2026 GigaShow. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
                    <Link to="/terms" className="text-[#2e3145] hover:text-[#4d44e3] transition-colors hover:underline">Términos y Condiciones</Link>
                    <Link to="/privacy" className="text-[#2e3145] hover:text-[#4d44e3] transition-colors hover:underline">Pólitica de Privacidad</Link>
                    <a href="#" className="text-[#2e3145] hover:text-[#4d44e3] transition-colors hover:underline">Configuración de las Cookies</a>
                    <Link to="/contact" className="text-[#2e3145] hover:text-[#4d44e3] transition-colors hover:underline">Contáctanos</Link>
                </div>
            </div>
        </footer>
    )
}