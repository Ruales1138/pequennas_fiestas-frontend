import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
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
      navigate('/login', { replace: true })
    }

    window.addEventListener('gigashow:unauthorized', handleUnauthorized)

    return () => {
      isActive = false
      window.removeEventListener('gigashow:unauthorized', handleUnauthorized)
    }
  }, [navigate])

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
