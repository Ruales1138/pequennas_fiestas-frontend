'use client'

import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/features/auth/authService'
import type { AuthSession, AuthUser } from '@/types/auth'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  signOut: () => Promise<void>
  setUser: Dispatch<SetStateAction<AuthUser | null>>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    authService.getSession().then((session) => {
      if (!isActive) return

      const nextSession = session as AuthSession | null
      setUser(nextSession?.user ?? null)
      setIsLoading(false)
    })

    const handleUnauthorized = () => {
      setUser(null)
      if (typeof window !== 'undefined') {
        const publicRoutes = [
          '/',
          '/login',
          '/register',
          '/catalog',
          '/about',
          '/contact',
          '/privacy',
          '/terms',
          '/detail',
          '/401',
          '/403',
          '/500',
        ]
        const currentPath = window.location.pathname
        const isPublic =
          currentPath === '/' ||
          publicRoutes.some(
            (route) => route !== '/' && (currentPath === route || currentPath.startsWith(`${route}/`)),
          )
        if (!isPublic) {
          router.replace(`/login?from=${encodeURIComponent(currentPath)}`)
        }
      }
    }

    window.addEventListener('gigashow:unauthorized', handleUnauthorized)

    return () => {
      isActive = false
      window.removeEventListener('gigashow:unauthorized', handleUnauthorized)
    }
  }, [router])

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
