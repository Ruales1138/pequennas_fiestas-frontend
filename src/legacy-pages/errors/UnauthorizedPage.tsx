import { Link } from 'react-router-dom'
import ErrorTemplate from './ErrorTemplate'

export default function UnauthorizedPage() {
  return (
    <ErrorTemplate
      code="401"
      title="Acceso Denegado"
      description="No tienes los permisos necesarios para acceder a esta página. Si crees que es un error, inicia sesión con la cuenta correcta."
    >
      <Link
        to="/login"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
      >
        Iniciar sesión
      </Link>
      <Link
        to="/"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto"
      >
        Ir al inicio
      </Link>
    </ErrorTemplate>
  )
}
