import Link from 'next/link'
import ErrorTemplate from './ErrorTemplate'

export default function ForbiddenPage() {
  return (
    <ErrorTemplate
      code="403"
      title="Acceso prohibido"
      description="Tu cuenta está autenticada, pero no tiene permisos para acceder a esta página."
    >
      <Link
        href="/"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
      >
        Ir al inicio
      </Link>
    </ErrorTemplate>
  )
}
