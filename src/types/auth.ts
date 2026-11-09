export type UserRole = 'admin' | 'cliente' | 'artista' | 'user'

export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: UserRole | string
}

export interface AuthSession {
  user?: AuthUser | null
  token?: string
  accessToken?: string
  expiresAt?: string
}
