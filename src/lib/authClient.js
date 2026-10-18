const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const authClient = {
  async signUp(data) {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al registrarse')
    }

    return await response.json()
  },

  async signIn(data) {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al iniciar sesión')
    }

    return await response.json()
  },

  async getSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/get-session`, {
        credentials: 'include',
      })

      if (!response.ok) {
        return null
      }

      return await response.json()
    } catch {
      return null
    }
  },

  async signOut() {
    try {
      await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  },

  async updateImageUser(imageUrl) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUrl }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar la imagen de perfil')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error)
      throw error
    }
  },

  async updateArtistProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/onboarding/artist-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar el perfil de artista')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al actualizar el perfil de artista:', error)
      throw error
    }
  },

}
