import type { AuthSession, AuthUser } from '@/types/auth'

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
