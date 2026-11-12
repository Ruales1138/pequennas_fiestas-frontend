'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { cancelClientBooking, getClientBookings } from './bookingService'
import type { ClientBookingRecord } from './types'

function formatEventDate(raw: string): string {
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleString('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

function getStatusBadge(status: string) {
  const normalized = (status || 'pendiente').toLowerCase()
  if (normalized === 'confirmada' || normalized === 'aceptada' || normalized === 'completada') {
    return {
      label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    }
  }
  if (normalized === 'cancelada' || normalized === 'rechazada') {
    return {
      label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      className: 'bg-rose-100 text-rose-800 border-rose-200',
    }
  }
  return {
    label: 'Pendiente',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  }
}

export default function ClientBookingsSection() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<ClientBookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('todas')
  const [cancelingId, setCancelingId] = useState<string | number | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      if (!user?.id) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        setError(null)
        const data = await getClientBookings(user.id)
        if (active) setBookings(data)
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'No se pudieron cargar tus reservas.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [user?.id])

  const handleCancel = async (bookingId: string | number) => {
    try {
      setCancelingId(bookingId)
      await cancelClientBooking(bookingId)
      setBookings((prev) =>
        prev.map((item) => (item.id === bookingId ? { ...item, status: 'cancelada' } : item)),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cancelar la reserva.')
    } finally {
      setCancelingId(null)
    }
  }

  const stats = useMemo(() => {
    const total = bookings.length
    const confirmed = bookings.filter((b) =>
      ['confirmada', 'aceptada', 'completada'].includes(b.status.toLowerCase()),
    ).length
    const pending = bookings.filter((b) => b.status.toLowerCase() === 'pendiente').length
    const totalInvested = bookings
      .filter((b) => !['cancelada', 'rechazada'].includes(b.status.toLowerCase()))
      .reduce((sum, b) => sum + Number(b.agreedPrice || 0), 0)

    return { total, confirmed, pending, totalInvested }
  }, [bookings])

  const filteredBookings = useMemo(() => {
    if (statusFilter === 'todas') return bookings
    if (statusFilter === 'confirmadas') {
      return bookings.filter((b) =>
        ['confirmada', 'aceptada', 'completada'].includes(b.status.toLowerCase()),
      )
    }
    if (statusFilter === 'canceladas') {
      return bookings.filter((b) => ['cancelada', 'rechazada'].includes(b.status.toLowerCase()))
    }
    return bookings.filter((b) => b.status.toLowerCase() === 'pendiente')
  }, [bookings, statusFilter])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1ff] pb-24 pt-32 antialiased">
      {/* Ambient mesh orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-gradient-to-tr from-[#a855f7]/30 via-[#6366f1]/20 to-transparent blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-gradient-to-tl from-[#4f46e5]/35 via-[#9333ea]/25 to-transparent blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Account & Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-8 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5b21b6]">
              MI CUENTA / {user?.email}
            </span>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#12131a] sm:text-5xl">
              Mis Reservas Realizadas.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Consulta el estado de las contrataciones que has solicitado, fechas de tus eventos, ubicación y tarifas acordadas.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-full bg-[#5b21b6] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-purple-900/15 transition hover:bg-[#4c1d95]"
          >
            + Nueva reserva
          </Link>
        </div>

        {/* Summary Bento Cards */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-[#e9e5ff] p-6">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#4c1d95]">
              01 / TOTAL
            </span>
            <p className="mt-3 text-3xl font-extrabold text-[#12131a]">{stats.total}</p>
            <p className="mt-1 text-xs text-slate-600">Reservas registradas</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              02 / CONFIRMADAS
            </span>
            <p className="mt-3 text-3xl font-extrabold text-[#12131a]">{stats.confirmed}</p>
            <p className="mt-1 text-xs text-slate-600">Shows aprobados</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-700">
              03 / PENDIENTES
            </span>
            <p className="mt-3 text-3xl font-extrabold text-[#12131a]">{stats.pending}</p>
            <p className="mt-1 text-xs text-slate-600">Por confirmar</p>
          </div>

          <div className="rounded-3xl bg-[#4c1d95] p-6 text-white">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-purple-200">
              04 / INVERSIÓN
            </span>
            <p className="mt-3 text-2xl font-extrabold sm:text-3xl">
              ${stats.totalInvested.toLocaleString('es-CO')}
            </p>
            <p className="mt-1 text-xs text-purple-200/90">Total contratado (COP)</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'pendientes', label: 'Pendientes' },
            { id: 'confirmadas', label: 'Confirmadas' },
            { id: 'canceladas', label: 'Canceladas' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                statusFilter === tab.id
                  ? 'bg-[#5b21b6] text-white shadow-sm'
                  : 'border border-[#12131a]/20 bg-white/70 text-[#12131a] hover:border-[#5b21b6] hover:text-[#5b21b6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {loading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-12 text-center text-sm text-slate-600">
            Cargando tus reservas realizadas...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-14 text-center backdrop-blur-md">
            <h2 className="text-2xl font-bold text-[#12131a]">
              {bookings.length === 0
                ? 'Aún no has realizado ninguna reserva.'
                : 'No hay reservas en esta categoría.'}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Explora nuestro catálogo de artistas verificados y agenda el espectáculo ideal para tu próximo evento.
            </p>
            <Link
              href="/catalog"
              className="mt-6 inline-block rounded-full bg-[#5b21b6] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#4c1d95]"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredBookings.map((booking) => {
              const badge = getStatusBadge(booking.status)
              const isPending = booking.status.toLowerCase() === 'pendiente'

              return (
                <article
                  key={booking.id}
                  className="flex flex-col justify-between gap-6 rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-sm backdrop-blur-md transition hover:shadow-md md:flex-row md:items-center"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        ID: {String(booking.id).slice(0, 8)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight text-[#12131a]">
                        {booking.artistName}
                      </h3>
                      {booking.artistEmail && (
                        <p className="text-xs font-medium text-slate-500">{booking.artistEmail}</p>
                      )}
                    </div>

                    <div className="grid gap-2 pt-1 text-sm text-slate-700 sm:grid-cols-2 md:flex md:flex-wrap md:gap-6">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Fecha del evento
                        </span>
                        <span className="font-semibold text-[#12131a]">
                          {formatEventDate(booking.eventDate)}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Ubicación
                        </span>
                        <span className="font-semibold text-[#12131a]">
                          {booking.eventLocation}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Duración
                        </span>
                        <span className="font-semibold text-[#12131a]">
                          {Number(booking.jobHours || 1)} hora(s)
                        </span>
                      </div>
                    </div>

                    {booking.description && (
                      <p className="max-w-2xl rounded-2xl bg-[#f4f1ff] px-4 py-2.5 text-xs leading-relaxed text-slate-700">
                        <strong className="font-semibold text-[#4c1d95]">Detalles: </strong>
                        {booking.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-4 md:items-end md:border-t-0 md:pt-0">
                    <div className="md:text-right">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Valor acordado
                      </span>
                      <span className="text-2xl font-extrabold text-[#5b21b6]">
                        ${Number(booking.agreedPrice || 0).toLocaleString('es-CO')}
                      </span>
                      <span className="block text-[11px] text-slate-400">COP total</span>
                    </div>

                    {isPending && (
                      <button
                        type="button"
                        disabled={cancelingId === booking.id}
                        onClick={() => handleCancel(booking.id)}
                        className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                      >
                        {cancelingId === booking.id ? 'Cancelando...' : 'Cancelar reserva'}
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
