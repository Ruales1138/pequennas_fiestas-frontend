'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createBooking } from './bookingService'
import type { BookingArtist } from './types'

type BookingFormValues = {
  eventDate: string
  estimatedEndTime: string
  eventLocation: string
  description?: string
}

export default function BookingForm({ artist }: { artist: BookingArtist }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
  const [calculatedHours, setCalculatedHours] = useState('')
  const [calculatedPrice, setCalculatedPrice] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const baseRate = Number(artist?.hourlyRate || 0)
  const isUserAuthorized = Boolean(
    user && (user.role === 'cliente' || user.role === 'user' || user.role === 'admin'),
  )
  const isArtistUser = user?.role === 'artista'

  const form = useForm<BookingFormValues>({
    defaultValues: {
      eventDate: '',
      eventLocation: '',
      description: '',
      estimatedEndTime: '',
    },
  })

  const handleTimeChange = () => {
    if (!isUserAuthorized) {
      return
    }

    const eventDate = form.getValues('eventDate')
    const endTime = form.getValues('estimatedEndTime')

    if (eventDate && endTime) {
      const startDateTime = new Date(eventDate)
      const startHour = startDateTime.getHours()
      const startMinute = startDateTime.getMinutes()
      const [endHour, endMinute] = endTime.split(':').map(Number)

      let hours = endHour - startHour
      let minutes = endMinute - startMinute

      if (minutes < 0) {
        hours -= 1
        minutes += 60
      }

      if (hours < 0) {
        hours += 24
      }

      const totalHours = Number((hours + minutes / 60).toFixed(2))

      if (totalHours <= 0) {
        setCalculatedHours('')
        setCalculatedPrice('')
        return
      }

      setCalculatedHours(totalHours.toFixed(2))

      if (baseRate > 0) {
        setCalculatedPrice((totalHours * baseRate).toFixed(2))
      }
    }
  }

  const onSubmit = async (data: BookingFormValues) => {
    if (!isUserAuthorized) {
      setSubmitMessage({ type: 'error', text: 'Debes iniciar sesión como cliente para reservar.' })
      return
    }

    if (!calculatedHours || Number(calculatedHours) <= 0) {
      setSubmitMessage({ type: 'error', text: 'La hora final debe ser después de la hora de inicio.' })
      return
    }

    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const jobHoursValue = Number(calculatedHours)
      const agreedPriceValue = calculatedPrice ? Number(calculatedPrice) : jobHoursValue * baseRate

      await createBooking({
        artistId: artist.userId ?? artist.id,
        clientId: user?.id,
        eventDate: new Date(data.eventDate).toISOString(),
        eventLocation: data.eventLocation,
        description: data.description,
        jobHours: jobHoursValue,
        agreedPrice: agreedPriceValue,
      })

      setSubmitMessage({ type: 'success', text: 'Reserva creada exitosamente.' })
      form.reset()
      setCalculatedHours('')
      setCalculatedPrice('')
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo crear la reserva.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isArtistUser) {
    return (
      <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Crear Reserva</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Los artistas no pueden hacer reservas desde esta cuenta. Usa una cuenta de cliente para crear tu solicitud.
        </p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Crear Reserva</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Completa los detalles de tu evento para reservar a {artist.name}
        </p>

        <div className="mt-6 space-y-6">
          <div className="grid gap-2">
            <label htmlFor="eventDate" className="text-sm font-semibold text-zinc-900">
              Fecha y Hora de Inicio
            </label>
            <input
              id="eventDate"
              type="datetime-local"
              {...form.register('eventDate', {
                required: 'La fecha del evento es requerida',
              })}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                form.setValue('eventDate', event.target.value)
                handleTimeChange()
              }}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {form.formState.errors.eventDate && (
              <p className="text-xs text-red-600">{form.formState.errors.eventDate.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="estimatedEndTime" className="text-sm font-semibold text-zinc-900">
              Hora Final Estimada
            </label>
            <input
              id="estimatedEndTime"
              type="time"
              {...form.register('estimatedEndTime', {
                required: 'La hora final es requerida',
              })}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                form.setValue('estimatedEndTime', event.target.value)
                handleTimeChange()
              }}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {form.formState.errors.estimatedEndTime && (
              <p className="text-xs text-red-600">{form.formState.errors.estimatedEndTime.message}</p>
            )}
            {calculatedHours && (
              <div className="rounded-lg bg-indigo-50 p-3">
                <p className="text-xs font-semibold text-indigo-600">Duración estimada: {calculatedHours} horas</p>
                {calculatedPrice && baseRate > 0 && (
                  <p className="mt-1 text-xs font-semibold text-indigo-600">Precio estimado: ${calculatedPrice}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="eventLocation" className="text-sm font-semibold text-zinc-900">
              Ubicación del Evento
            </label>
            <input
              id="eventLocation"
              placeholder="Ej: Calle Principal 123, Ciudad"
              {...form.register('eventLocation', {
                required: 'La ubicación es requerida',
              })}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {form.formState.errors.eventLocation && (
              <p className="text-xs text-red-600">{form.formState.errors.eventLocation.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-semibold text-zinc-900">
              Descripción del Evento
            </label>
            <textarea
              id="description"
              placeholder="Describe tu evento, tema, requerimientos especiales, etc."
              {...form.register('description')}
              rows={4}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {form.formState.errors.description && (
              <p className="text-xs text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>
        </div>

        {submitMessage.text && (
          <div
            className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm ${
              submitMessage.type === 'success'
                ? 'border border-green-200 bg-green-50 text-green-800'
                : 'border border-red-200 bg-red-50 text-red-800'
            }`}
          >
            <span>{submitMessage.text}</span>
            {submitMessage.type === 'success' && (
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="rounded-full bg-green-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-green-800"
              >
                Ver mis reservas →
              </button>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>             router.push('/catalog')}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Volver
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isUserAuthorized}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creando reserva...' : 'Crear reserva'}
          </button>
        </div>
      </form>

      {!isUserAuthorized && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Debes iniciar sesión como cliente para reservar a {artist.name ?? 'este artista'}.
          <button type="button" onClick={() =>           router.push('/login')} className="ml-2 font-semibold underline">
            Iniciar sesión
          </button>
        </div>
      )}
    </>
  )
}
