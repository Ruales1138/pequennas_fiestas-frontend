import { apiRequest, setAccessToken } from './apiClient'
import type { AuthSession, AuthUser } from '@/types/auth'
import type { ApiError } from '@/types/api'

export interface AuthResponse extends AuthSession {
  user: AuthUser
}

export interface SignUpData {
  name: string
  email: string
  password: string
  role: 'cliente' | 'artista'
}

export interface SignInData {
  email: string
  password: string
}

export interface ArtistProfileData {
  userId: string
  bio: string
  contactPhone: string
  contactSocial: string
  baseRate: number
  city: string
  coverageArea: string
  category: string
}

function persistToken(payload: AuthSession): void {
  setAccessToken(payload.token ?? payload.accessToken)
}

export const authClient = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const payload = await apiRequest<AuthResponse>('/api/auth/sign-up/email', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    persistToken(payload)
    return payload
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const payload = await apiRequest<AuthResponse>('/api/auth/sign-in/email', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    persistToken(payload)
    return payload
  },

  async getSession(): Promise<AuthSession | null> {
    try {
      return await apiRequest<AuthSession>('/api/auth/get-session')
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status !== 401) {
        console.error('Error al recuperar la sesión:', error)
      }
      return null
    }
  },

  async signOut(): Promise<void> {
    try {
      await apiRequest('/api/auth/sign-out', { method: 'POST' })
    } finally {
      setAccessToken(null)
    }
  },

  async updateImageUser(imageUrl: string): Promise<unknown> {
    return apiRequest('/api/auth/update-user', {
      method: 'POST',
      body: JSON.stringify({ image: imageUrl }),
    })
  },

  async updateArtistProfile(profileData: ArtistProfileData): Promise<unknown> {
    return apiRequest('/api/onboarding/artist-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  },
}
