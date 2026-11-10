import { apiRequest } from '@/lib/apiClient'
import type { BookingRecord, BookingStatus, CreateBookingData } from './types'

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
