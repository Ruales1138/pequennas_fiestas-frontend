import { useEffect, useState } from 'react'
import BookingDetailModal from '@/features/booking/BookingDetailModal'
import { apiRequest } from '@/lib/apiClient'

type BookingStatus = 'pendiente' | 'aceptada' | 'rechazada'

type ArtistBooking = {
  id: string | number
  clientName: string
  eventDate: string
  eventLocation: string
  status: BookingStatus | string
  clientImage?: string
  clientEmail?: string
  description?: string
  agreedPrice?: number | string
  jobHours?: number | string
}

const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-amber-100 text-amber-700',
  aceptada: 'bg-green-100 text-green-700',
  rechazada: 'bg-red-100 text-red-600',
}

export default function ArtistBookingsList() {
  const [bookings, setBookings] = useState<ArtistBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<ArtistBooking | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    apiRequest<{ data?: ArtistBooking[] }>('/api/bookings/artist')
      .then((json) => setBookings(json.data ?? []))
      .catch(() => setError('No se pudieron cargar las reservas'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleStatusChange = async (id: string | number, status: BookingStatus) => {
    if (status === 'rechazada' && !window.confirm('¿Quieres rechazar esta reserva?')) {
      return
    }

    setActionError(null)
    setIsUpdating(true)
    try {
      const { data } = await apiRequest<{ data: { status: BookingStatus } }>(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })

      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? { ...booking, status: data.status } : booking)),
      )

      setSelectedBooking((prev) =>
        prev && prev.id === id ? { ...prev, status: data.status } : prev,
      )
    } catch (requestError) {
      setActionError(requestError instanceof Error ? requestError.message : 'Error al actualizar la reserva')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return <p className="py-6 text-center text-sm text-zinc-400">Cargando reservas...</p>
  }

  if (error) {
    return <p className="py-6 text-center text-sm text-red-500">{error}</p>
  }

  if (bookings.length === 0) {
    return <p className="py-6 text-center text-sm text-zinc-400">Aún no tienes reservas.</p>
  }

  return (
    <>
      {actionError && (
        <p role="alert" className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {actionError}
        </p>
      )}
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold text-zinc-900">{booking.clientName}</p>
                <p className="text-xs text-zinc-400">
                  {new Date(booking.eventDate).toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {' · '}
                  {booking.eventLocation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[booking.status] ?? 'bg-slate-100 text-slate-600'}`}
              >
                {booking.status}
              </span>
              <button
                type="button"
                onClick={() => setSelectedBooking(booking)}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
          isUpdating={isUpdating}
        />
      )}
    </>
  )
}
