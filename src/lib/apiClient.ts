import type { ApiError, ApiErrorPayload } from '@/types/api'

const viteEnv =
  typeof import.meta !== 'undefined'
    ? (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    : undefined

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  viteEnv?.VITE_API_URL ||
  'http://localhost:3000'
const ACCESS_TOKEN_KEY = 'gigashow_access_token'
const AUTH_USER_KEY = 'gigashow_auth_user'

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token?: string | null): void {
  if (typeof window === 'undefined') return
  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(AUTH_USER_KEY)
  }
}

function getErrorMessage(payload: ApiErrorPayload | null, fallback: string): string {
  if (typeof payload?.message === 'string') return payload.message
  if (typeof payload?.error === 'string') return payload.error
  return fallback
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  const token = getAccessToken()

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  let payload: T | null = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    payload = (await response.json()) as T
  }

  if (response.status === 401) {
    setAccessToken(null)
    window.dispatchEvent(new CustomEvent('gigashow:unauthorized'))
  }

  if (!response.ok) {
    const error = new Error(
      getErrorMessage(payload as ApiErrorPayload | null, `La solicitud falló (${response.status}).`),
    ) as ApiError
    error.status = response.status
    error.payload = payload as ApiErrorPayload | null
    throw error
  }

  return payload as T
}

export { API_BASE_URL }
