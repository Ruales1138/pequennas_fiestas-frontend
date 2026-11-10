import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import BookingDetailModal from '@/features/booking/BookingDetailModal'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { apiRequest } from '@/lib/apiClient'

type BookingStatus = 'pendiente' | 'aceptada' | 'rechazada'

type BookingRecord = {
  id: string | number
  clientName: string
  clientEmail?: string
  clientImage?: string
  eventDate: string
  eventLocation: string
  agreedPrice?: number | string
  status: BookingStatus | string
}

const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-amber-100 text-amber-700',
  aceptada: 'bg-green-100 text-green-700',
  rechazada: 'bg-red-100 text-red-600',
}

function getInitials(name = ''): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return <img src={image} alt={name} className="h-9 w-9 rounded-full object-cover" />
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-200 text-xs font-bold text-indigo-800">
      {getInitials(name)}
    </div>
  )
}

export default function DashboardArtist() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | number | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null)

  useEffect(() => {
    apiRequest<{ data?: BookingRecord[] }>('/api/bookings/artist')
      .then((json) => setBookings(json.data ?? []))
      .catch(() => setError('No se pudieron cargar las reservas'))
      .finally(() => setIsLoading(false))
  }, [])

  const updateStatus = async (id: string | number, status: BookingStatus) => {
    if (status === 'rechazada' && !window.confirm('¿Quieres rechazar esta reserva?')) {
      return
    }

    setActionError(null)
    setUpdatingId(id)
    try {
      const { data } = await apiRequest<{ data: { status: BookingStatus } }>(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })

      setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status: data.status } : booking)))
      setSelectedBooking((prev) => (prev && prev.id === id ? { ...prev, status: data.status } : prev))
    } catch (requestError) {
      setActionError(requestError instanceof Error ? requestError.message : 'Error al actualizar la reserva')
    } finally {
      setUpdatingId(null)
    }
  }

  const pendientes = bookings.filter((booking) => booking.status === 'pendiente').length
  const aceptadas = bookings.filter((booking) => booking.status === 'aceptada').length
  const ingresos = bookings
    .filter((booking) => booking.status === 'aceptada')
    .reduce((sum, booking) => sum + Number(booking.agreedPrice ?? 0), 0)

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Management Console</span>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-[#2e3145]">Mis Reservas</h1>
          <p className="mt-2 text-slate-500">
            Gestiona tus solicitudes de contratación y revisa el estado de tus eventos confirmados.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pendientes</p>
            <p className="mt-2 text-4xl font-extrabold text-[#2e3145]">{pendientes}</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Confirmadas</p>
            <p className="mt-2 text-4xl font-extrabold text-indigo-600">{aceptadas}</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Ingresos estimados</p>
            <p className="mt-2 text-4xl font-extrabold text-[#2e3145]">${ingresos.toLocaleString('es-CO')}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {actionError && (
            <p role="alert" className="border-b border-rose-200 bg-rose-50 px-6 py-3 text-sm text-rose-700">
              {actionError}
            </p>
          )}
          {isLoading && (
            <div className="p-8">
              <LoadingSpinner message="Cargando reservas…" fullPage={false} />
            </div>
          )}
          {error && <p className="p-8 text-center text-red-500">{error}</p>}
          {!isLoading && !error && bookings.length === 0 && (
            <p className="p-8 text-center text-slate-500">Aún no tienes reservas.</p>
          )}
          {!isLoading && bookings.length > 0 && (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4 text-left">Cliente</th>
                    <th className="px-6 py-4 text-left">Fecha</th>
                    <th className="px-6 py-4 text-left">Ubicación</th>
                    <th className="px-6 py-4 text-left">Precio</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={booking.clientName} image={booking.clientImage} />
                          <div>
                            <p className="font-semibold text-[#2e3145]">{booking.clientName}</p>
                            <p className="text-xs text-slate-400">{booking.clientEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(booking.eventDate).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{booking.eventLocation}</td>
                      <td className="px-6 py-4 font-semibold text-[#2e3145]">
                        ${Number(booking.agreedPrice ?? 0).toLocaleString('es-CO')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[booking.status] ?? 'bg-slate-100 text-slate-600'}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === 'pendiente' ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => updateStatus(booking.id, 'aceptada')}
                              disabled={updatingId === booking.id}
                              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              onClick={() => updateStatus(booking.id, 'rechazada')}
                              disabled={updatingId === booking.id}
                              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
                            >
                              Rechazar
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedBooking(booking)}
                              className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
                            >
                              Detalles
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedBooking(booking)}
                            className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
                          >
                            Ver detalles
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={updateStatus}
          isUpdating={updatingId !== null}
        />
      )}
    </main>
  )
}
