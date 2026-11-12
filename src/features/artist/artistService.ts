import { apiRequest } from '@/lib/apiClient'
import type {
  Artist,
  ArtistDetail,
  ArtistDetailResponse,
  ArtistListResponse,
  RatingMeta,
} from './types'

export type ArtistProfileInput = {
  bio?: string
  contactPhone?: string
  contactSocial?: string
  baseRate: number
  city: string
  coverageArea?: string
  category: string
  imageUrl?: string
}

export async function getArtists(signal?: AbortSignal): Promise<Artist[]> {
  const payload = await apiRequest<ArtistListResponse>('/api/artists?page=1&limit=100', { signal })
  return Array.isArray(payload.data)
    ? payload.data.map((artist) => ({
        ...artist,
        name: artist.name ?? artist.user?.name ?? 'Artista Profesional',
        hourlyRate: artist.hourlyRate ?? artist.baseRate,
      }))
    : []
}

export async function getArtistById(id: string, signal?: AbortSignal): Promise<ArtistDetail | null> {
  const payload = await apiRequest<ArtistDetailResponse>(`/api/artists/${id}`, { signal })
  return payload.data
    ? {
        ...payload.data,
        name: payload.data.name ?? payload.data.user?.name ?? 'Artista Profesional',
        hourlyRate: payload.data.hourlyRate ?? payload.data.baseRate,
      }
    : null
}

export async function submitArtistRating(
  artistId: string | number,
  rating: number,
  comment: string,
): Promise<{ meta?: RatingMeta | null; data?: unknown }> {
  return apiRequest(`/api/artists/${artistId}/ratings`, {
    method: 'POST',
    body: JSON.stringify({ rating, comment }),
  })
}

export async function createArtistProfile(
  userId: string,
  profile: ArtistProfileInput,
): Promise<ArtistDetail> {
  try {
    const updatedPayload = await apiRequest<ArtistDetailResponse>(`/api/artists/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(profile),
    })
    if (updatedPayload.data) {
      return updatedPayload.data
    }
  } catch {
    // Si aún no existía el perfil inicial para este userId, se crea mediante POST /api/artists
  }

  const payload = await apiRequest<ArtistDetailResponse>('/api/artists', {
    method: 'POST',
    body: JSON.stringify({ userId, ...profile }),
  })
  if (!payload.data) throw new Error('El backend no devolvió el perfil creado.')
  return payload.data
}

export async function updateArtistProfile(
  artistId: string,
  profile: ArtistProfileInput,
): Promise<ArtistDetail> {
  const payload = await apiRequest<ArtistDetailResponse>(`/api/artists/${artistId}`, {
    method: 'PATCH',
    body: JSON.stringify(profile),
  })
  if (!payload.data) throw new Error('El backend no devolvió el perfil actualizado.')
  return payload.data
}

export async function deleteArtistProfile(artistId: string): Promise<void> {
  await apiRequest(`/api/artists/${artistId}`, { method: 'DELETE' })
}
