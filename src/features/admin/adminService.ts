import { apiRequest } from '@/lib/apiClient'
import type {
  AdminMutationResponse,
  AdminResourceResponse,
  AdminResources,
  AdminResourceType,
} from './types'

export async function getAdminResources(): Promise<AdminResources> {
  const [usersPayload, artistsPayload, bookingsPayload, ratingsPayload] = await Promise.all([
    apiRequest<AdminResourceResponse>('/api/admin/users'),
    apiRequest<AdminResourceResponse>('/api/admin/artists'),
    apiRequest<AdminResourceResponse>('/api/admin/bookings'),
    apiRequest<AdminResourceResponse>('/api/admin/ratings').catch(() => ({ data: [] })),
  ])

  return {
    users: usersPayload?.data ?? [],
    artists: artistsPayload?.data ?? [],
    bookings: bookingsPayload?.data ?? [],
    ratings: ratingsPayload?.data ?? [],
  }
}

export async function updateAdminResourceStatus(
  resourceType: AdminResourceType,
  id: string,
  isActive: boolean,
): Promise<AdminMutationResponse> {
  return apiRequest<AdminMutationResponse>(`/api/admin/${resourceType}/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  })
}

export async function deleteAdminResource(
  resourceType: AdminResourceType,
  id: string,
): Promise<AdminMutationResponse> {
  return apiRequest<AdminMutationResponse>(`/api/admin/${resourceType}/${id}`, {
    method: 'DELETE',
  })
}
