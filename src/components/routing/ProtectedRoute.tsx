'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ForbiddenPage from '@/legacy-pages/errors/ForbiddenPage'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const isUnauthorizedRole = Boolean(
    !isLoading && user && roles && !roles.includes(user.role ?? ''),
  )

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`)
      return
    }

    if (roles && !roles.includes(user.role ?? '')) {
      router.replace('/403')
    }
  }, [isLoading, pathname, roles, router, user])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 pb-16 pt-28">
        <LoadingSpinner message="Verificando tu sesión…" />
      </main>
    )
  }

  if (!user) {
    return null
  }

  if (isUnauthorizedRole) {
    return <ForbiddenPage />
  }

  return children
}
