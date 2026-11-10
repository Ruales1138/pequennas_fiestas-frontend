export type BookingStatus = 'pendiente' | 'aceptada' | 'rechazada'

export type BookingRecord = {
  id: string | number
  clientName: string
  clientEmail?: string
  clientImage?: string
  eventDate: string
  eventLocation: string
  jobHours?: number | string
  agreedPrice?: number | string
  description?: string
  status: BookingStatus | string
}

export type BookingArtist = {
  id?: string | number
  userId?: string | number
  name?: string
  hourlyRate?: string | number
}

export type CreateBookingData = {
  artistId?: string | number
  clientId?: string
  eventDate: string
  eventLocation: string
  description?: string
  jobHours: number
  agreedPrice: number
}
