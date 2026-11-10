import { apiRequest } from '@/lib/apiClient'
import type { AdminResourceResponse } from './types'
import type { AdminResources } from './types'

export async function getAdminResources(): Promise<AdminResources> {
  const [usersPayload, artistsPayload, bookingsPayload] = await Promise.all([
    apiRequest<AdminResourceResponse>('/api/admin/users'),
    apiRequest<AdminResourceResponse>('/api/admin/artists'),
    apiRequest<AdminResourceResponse>('/api/admin/bookings'),
  ])

  return {
    users: usersPayload.data ?? [],
    artists: artistsPayload.data ?? [],
    bookings: bookingsPayload.data ?? [],
  }
}
