import { apiRequest, getAccessToken, setAccessToken } from '@/lib/apiClient'
import type { AuthSession, AuthUser } from '@/types/auth'
import type { ApiError } from '@/types/api'
import type { ArtistProfileData, AuthResponse, SignInData, SignUpData } from './types'

const AUTH_USER_KEY = 'gigashow_auth_user'

function persistSession(payload: AuthSession): void {
  const token = payload.token ?? payload.accessToken
  setAccessToken(token)
  if (typeof window !== 'undefined' && payload.user) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user))
  }
}

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
    const json = new TextDecoder().decode(bytes)
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const safeRole = data.role === 'artista' ? 'artista' : 'cliente'
    const payload = await apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: safeRole,
      }),
    })

    persistSession(payload)
    return payload
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const payload = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    persistSession(payload)
    return payload
  },

  async getSession(): Promise<AuthSession | null> {
    const token = getAccessToken()
    if (!token) {
      return null
    }

    const decoded = decodeJwtPayload(token)
    if (decoded) {
      const exp = typeof decoded.exp === 'number' ? decoded.exp : null
      if (exp && exp * 1000 <= Date.now()) {
        setAccessToken(null)
        return null
      }

      const storedUser = getStoredUser()
      const user: AuthUser = {
        id: String(decoded.id ?? storedUser?.id ?? ''),
        email: String(decoded.email ?? storedUser?.email ?? ''),
        role: String(decoded.role ?? storedUser?.role ?? 'cliente'),
        name: (decoded.name as string | undefined) ?? storedUser?.name ?? null,
        image: storedUser?.image ?? null,
      }

      if (user.id) {
        return { user, token }
      }
    } else if (getStoredUser()?.id) {
      return { user: getStoredUser(), token }
    }

    try {
      return await apiRequest<AuthSession>('/api/auth/get-session', {
        skipAuthRedirect: true,
      })
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status !== 401 && apiError.status !== 404) {
        console.error('Error al recuperar la sesión:', error)
      }
      return null
    }
  },

  async signOut(): Promise<void> {
    try {
      await apiRequest('/api/auth/sign-out', { method: 'POST' })
    } catch {
      // Cierre de sesión stateless JWT local aunque el endpoint de cookies no aplique
    } finally {
      setAccessToken(null)
    }
  },

  async updateImageUser(imageUrl: string): Promise<unknown> {
    if (typeof window !== 'undefined') {
      const current = getStoredUser()
      if (current) {
        window.localStorage.setItem(
          AUTH_USER_KEY,
          JSON.stringify({ ...current, image: imageUrl }),
        )
      }
    }
    try {
      return await apiRequest('/api/auth/update-user', {
        method: 'POST',
        body: JSON.stringify({ image: imageUrl }),
      })
    } catch {
      return { image: imageUrl }
    }
  },

  async updateArtistProfile(profileData: ArtistProfileData): Promise<unknown> {
    return apiRequest('/api/onboarding/artist-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  },
}
