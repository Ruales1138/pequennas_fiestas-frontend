'use client'

import { type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 pb-16 pt-28">
        <LoadingSpinner message="Verificando tu sesión…" />
      </main>
    )
  }

  if (!user) {
    router.replace(`/login?from=${encodeURIComponent(pathname)}`)
    return null
  }

  if (roles && !roles.includes(user.role ?? '')) {
    router.replace('/403')
    return null
  }

  return children
}
