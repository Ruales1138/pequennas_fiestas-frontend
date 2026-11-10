import { apiRequest } from '@/lib/apiClient'
import type { Artist, ArtistListResponse } from './types'

export async function getArtists(signal?: AbortSignal): Promise<Artist[]> {
  const payload = await apiRequest<ArtistListResponse>('/api/artists', { signal })
  return Array.isArray(payload.data) ? payload.data : []
}
