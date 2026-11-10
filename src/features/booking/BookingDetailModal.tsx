'use client'

import type { BookingRecord, BookingStatus } from './types'

type BookingDetailModalProps = {
  booking: BookingRecord | null
  onClose: () => void
  onStatusChange: (id: string | number, status: BookingStatus) => void
  isUpdating: boolean
}

const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-amber-100 text-amber-700',
  aceptada: 'bg-green-100 text-green-700',
  rechazada: 'bg-red-100 text-red-600',
}

function getInitials(name = ''): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function BookingDetailModal({ booking, onClose, onStatusChange, isUpdating }: BookingDetailModalProps) {
  if (!booking) return null

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 transition-colors hover:text-zinc-600"
          aria-label="Cerrar detalle de reserva"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="border-b border-zinc-100 p-6">
          <div className="flex items-center gap-3">
            {booking.clientImage ? (
              <img src={booking.clientImage} alt={booking.clientName} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200 text-sm font-bold text-indigo-800">
                {getInitials(booking.clientName)}
              </div>
            )}
            <div>
              <p className="font-semibold text-zinc-900">{booking.clientName}</p>
              <p className="text-xs text-zinc-400">{booking.clientEmail}</p>
            </div>
          </div>
          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[booking.status] ?? 'bg-slate-100 text-slate-600'}`}
          >
            {booking.status}
          </span>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-400">Fecha del evento</p>
              <p className="font-semibold text-zinc-900">
                {new Date(booking.eventDate).toLocaleDateString('es-CO', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <p className="text-zinc-400">Ubicación</p>
              <p className="font-semibold text-zinc-900">{booking.eventLocation}</p>
            </div>
            <div>
              <p className="text-zinc-400">Horas de trabajo</p>
              <p className="font-semibold text-zinc-900">{booking.jobHours}h</p>
            </div>
            <div>
              <p className="text-zinc-400">Precio acordado</p>
              <p className="font-semibold text-zinc-900">
                ${Number(booking.agreedPrice).toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Descripción del pedido
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              {booking.description || 'Sin descripción proporcionada.'}
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-100 p-6">
          <div className="flex justify-end gap-3">
            {(booking.status === 'pendiente' || booking.status === 'rechazada') && (
              <button
                type="button"
                onClick={() => onStatusChange(booking.id, 'aceptada')}
                disabled={isUpdating}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                {isUpdating ? 'Actualizando...' : 'Aceptar'}
              </button>
            )}
            {(booking.status === 'pendiente' || booking.status === 'aceptada') && (
              <button
                type="button"
                onClick={() => onStatusChange(booking.id, 'rechazada')}
                disabled={isUpdating}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50"
              >
                {isUpdating ? 'Actualizando...' : 'Rechazar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
