import { apiRequest, setAccessToken } from './apiClient'

export const authClient = {
  async signUp(data) {
    const payload = await apiRequest('/api/auth/sign-up/email', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    setAccessToken(payload?.token || payload?.accessToken)
    return payload
  },

  async signIn(data) {
    const payload = await apiRequest('/api/auth/sign-in/email', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    setAccessToken(payload?.token || payload?.accessToken)
    return payload
  },

  async getSession() {
    try {
      return await apiRequest('/api/auth/get-session')
    } catch (error) {
      if (error.status !== 401) {
        console.error('Error al recuperar la sesión:', error)
      }
      return null
    }
  },

  async signOut() {
    try {
      await apiRequest('/api/auth/sign-out', { method: 'POST' })
    } finally {
      setAccessToken(null)
    }
  },

  async updateImageUser(imageUrl) {
    return apiRequest('/api/auth/update-user', {
      method: 'POST',
      body: JSON.stringify({ image: imageUrl }),
    })
  },

  async updateArtistProfile(profileData) {
    return apiRequest('/api/onboarding/artist-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  },
}
