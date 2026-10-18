import { useEffect, useState } from 'react'
import BookingDetailModal from '@/features/booking/BookingDetailModal'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const STATUS_STYLES = {
  pendiente: 'bg-amber-100 text-amber-700',
  aceptada: 'bg-green-100 text-green-700',
  rechazada: 'bg-red-100 text-red-600',
}

export default function ArtistBookingsList() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch de las reservas del artista logueado
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bookings/artist`, { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => setBookings(json.data ?? []))
      .catch(() => setError('No se pudieron cargar las reservas'))
      .finally(() => setIsLoading(false))
  }, [])

  // Cambiar estado de un booking (PATCH)
  const handleStatusChange = async (id, status) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })
      const { data } = await res.json()

      // Actualizar en la lista local
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: data.status } : b))
      )

      // Actualizar el booking seleccionado en el modal
      setSelectedBooking((prev) =>
        prev && prev.id === id ? { ...prev, status: data.status } : prev
      )
    } catch {
      alert('Error al actualizar la reserva')
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
                onClick={() => setSelectedBooking(booking)}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
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
