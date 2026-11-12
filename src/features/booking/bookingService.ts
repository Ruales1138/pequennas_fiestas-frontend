import { apiRequest } from '@/lib/apiClient'
import type { BookingRecord, BookingStatus, ClientBookingRecord, CreateBookingData } from './types'

export async function createBooking(data: CreateBookingData): Promise<void> {
  await apiRequest('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getArtistBookings(): Promise<BookingRecord[]> {
  const payload = await apiRequest<{ data?: BookingRecord[] }>('/api/bookings/artist')
  return payload.data ?? []
}

export async function getClientBookings(clientId: string): Promise<ClientBookingRecord[]> {
  const payload = await apiRequest<{
    data?: Array<{
      id: string | number
      artistId?: string
      eventDate: string
      eventLocation: string
      jobHours?: number | string
      agreedPrice?: number | string
      description?: string
      status: string
      createdAt?: string
      artist?: {
        id?: string
        name?: string
        email?: string
        image?: string | null
      }
    }>
  }>(`/api/bookings?clientId=${encodeURIComponent(clientId)}&limit=100`)

  return (payload.data ?? []).map((b) => ({
    id: b.id,
    artistId: b.artistId ?? b.artist?.id,
    artistName: b.artist?.name ?? 'Artista Pequeñas Fiestas',
    artistEmail: b.artist?.email ?? '',
    artistImage: b.artist?.image ?? null,
    eventDate: b.eventDate,
    eventLocation: b.eventLocation,
    jobHours: b.jobHours,
    agreedPrice: b.agreedPrice,
    description: b.description,
    status: b.status,
    createdAt: b.createdAt,
  }))
}

export async function cancelClientBooking(id: string | number): Promise<void> {
  await apiRequest(`/api/bookings/${id}`, {
    method: 'DELETE',
  })
}

export async function updateBookingStatus(
  id: string | number,
  status: BookingStatus,
): Promise<BookingStatus> {
  const payload = await apiRequest<{ data: { status: BookingStatus } }>(
    `/api/bookings/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
  )

  return payload.data.status
}
