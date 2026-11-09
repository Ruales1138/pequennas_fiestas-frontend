const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const ACCESS_TOKEN_KEY = 'gigashow_access_token'

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token) {
  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

function getErrorMessage(payload, fallback) {
  if (typeof payload?.message === 'string') return payload.message
  if (typeof payload?.error === 'string') return payload.error
  return fallback
}

export async function apiRequest(path, options = {}) {
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

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    payload = await response.json()
  }

  if (response.status === 401) {
    setAccessToken(null)
    window.dispatchEvent(new CustomEvent('gigashow:unauthorized'))
  }

  if (!response.ok) {
    const error = new Error(
      getErrorMessage(payload, `La solicitud falló (${response.status}).`),
    )
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

export { API_BASE_URL }
