import { apiRequest } from '@/lib/apiClient'
import type {
  AdminMutationResponse,
  AdminResource,
  AdminResourceResponse,
  AdminResources,
  AdminResourceType,
  AdminUpdatePayload,
} from './types'

const DELETED_STORAGE_KEY = 'gigashow_admin_deleted_ids'
const OVERRIDES_STORAGE_KEY = 'gigashow_admin_overrides'

function getDeletedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(DELETED_STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function markResourceDeletedLocally(resourceType: AdminResourceType, id: string) {
  if (typeof window === 'undefined') return
  const next = getDeletedIds()
  next.add(`${resourceType}:${id}`)
  window.localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(Array.from(next)))
}

function getLocalOverrides(): Record<string, AdminUpdatePayload> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(OVERRIDES_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, AdminUpdatePayload>) : {}
  } catch {
    return {}
  }
}

export function saveResourceOverrideLocally(
  resourceType: AdminResourceType,
  id: string,
  payload: AdminUpdatePayload,
) {
  if (typeof window === 'undefined') return
  const current = getLocalOverrides()
  const key = `${resourceType}:${id}`
  current[key] = { ...(current[key] ?? {}), ...payload }
  window.localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(current))
}

function applyClientState(
  resourceType: AdminResourceType,
  items: AdminResource[],
): AdminResource[] {
  const deleted = getDeletedIds()
  const overrides = getLocalOverrides()

  return items
    .filter((item) => !deleted.has(`${resourceType}:${item.id}`))
    .map((item) => {
      const patch = overrides[`${resourceType}:${item.id}`]
      return patch ? { ...item, ...patch } : item
    })
}

export async function getAdminResources(): Promise<AdminResources> {
  const [usersPayload, artistsPayload, bookingsPayload, ratingsPayload] = await Promise.all([
    apiRequest<AdminResourceResponse>('/api/admin/users'),
    apiRequest<AdminResourceResponse>('/api/admin/artists'),
    apiRequest<AdminResourceResponse>('/api/admin/bookings'),
    apiRequest<AdminResourceResponse>('/api/admin/ratings').catch(() => ({ data: [] })),
  ])

  return {
    users: applyClientState('users', usersPayload?.data ?? []),
    artists: applyClientState('artists', artistsPayload?.data ?? []),
    bookings: applyClientState('bookings', bookingsPayload?.data ?? []),
    ratings: applyClientState('ratings', ratingsPayload?.data ?? []),
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

export async function updateAdminResource(
  resourceType: AdminResourceType,
  id: string,
  payload: AdminUpdatePayload,
  currentActive = true,
): Promise<AdminMutationResponse> {
  saveResourceOverrideLocally(resourceType, id, payload)

  if (resourceType === 'artists') {
    await apiRequest(`/api/artists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        category: payload.category,
        city: payload.city,
        baseRate: payload.baseRate !== undefined ? Number(payload.baseRate) : undefined,
        bio: payload.bio,
      }),
    }).catch(() => null)
  } else if (resourceType === 'bookings') {
    await apiRequest(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: payload.status ?? payload.role,
        eventLocation: payload.eventLocation,
        agreedPrice: payload.agreedPrice !== undefined ? Number(payload.agreedPrice) : undefined,
        description: payload.description,
      }),
    }).catch(() => null)
  } else if (resourceType === 'ratings') {
    await apiRequest(`/api/ratings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        rating: payload.rating !== undefined ? Number(payload.rating) : undefined,
        comment: payload.comment ?? payload.name,
      }),
    }).catch(() => null)
  }

  return apiRequest<AdminMutationResponse>(`/api/admin/${resourceType}/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...payload,
      isActive: typeof payload.isActive === 'boolean' ? payload.isActive : currentActive,
    }),
  })
}

export async function deleteAdminResource(
  resourceType: AdminResourceType,
  id: string,
): Promise<AdminMutationResponse> {
  markResourceDeletedLocally(resourceType, id)
  return apiRequest<AdminMutationResponse>(`/api/admin/${resourceType}/${id}`, {
    method: 'DELETE',
  })
}
