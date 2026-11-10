import { apiRequest } from '@/lib/apiClient'
import type {
  Artist,
  ArtistDetail,
  ArtistDetailResponse,
  ArtistListResponse,
  RatingMeta,
} from './types'

export async function getArtists(signal?: AbortSignal): Promise<Artist[]> {
  const payload = await apiRequest<ArtistListResponse>('/api/artists', { signal })
  return Array.isArray(payload.data) ? payload.data : []
}

export async function getArtistById(id: string, signal?: AbortSignal): Promise<ArtistDetail | null> {
  const payload = await apiRequest<ArtistDetailResponse>(`/api/artists/${id}`, { signal })
  return payload.data ?? null
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
