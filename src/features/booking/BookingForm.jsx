import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export default function BookingForm({ artist }) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
	const [calculatedHours, setCalculatedHours] = useState('')
	const [calculatedPrice, setCalculatedPrice] = useState('')
	const [showAuthModal, setShowAuthModal] = useState(false)
	const { user, isLoading } = useAuth()
	const navigate = useNavigate()

	const baseRate = parseFloat(artist?.hourlyRate || 0)

	const isUserAuthorized = user && user.role === 'cliente'
	const isArtistUser = user?.role === 'artista'
	const modalTitle = isArtistUser ? 'Los artistas no pueden hacer reservas' : 'Accede para poder reservar'
	const modalDescription = isArtistUser
		? 'Si quieres gestionar eventos, usa una cuenta de cliente para crear tu reserva.'
		: 'Para hacer una reserva, necesitas iniciar sesión con tu cuenta de cliente.'

	const form = useForm({
		defaultValues: {
			eventDate: '',
			eventLocation: '',
			description: '',
			estimatedEndTime: '',
		},
	})

	const handleTimeChange = () => {
		if (!isUserAuthorized) {
			setShowAuthModal(true)
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

			const totalHours = parseFloat((hours + minutes / 60).toFixed(2))
			
			if (totalHours <= 0) {
				setCalculatedHours('')
				setCalculatedPrice('')
				return
			}

			setCalculatedHours(totalHours.toFixed(2))
			
			if (baseRate > 0) {
				const price = (totalHours * baseRate).toFixed(2)
				setCalculatedPrice(price)
			}
		}
	}

	const handleFormFocus = () => {
		if (!isUserAuthorized) {
			setShowAuthModal(true)
		}
	}

	const onSubmit = async (data) => {
		if (!isUserAuthorized) {
			setShowAuthModal(true)
			return
		}

		if (!calculatedHours || parseFloat(calculatedHours) <= 0) {
			setSubmitMessage({ type: 'error', text: 'La hora final debe ser después de la hora de inicio.' })
			return
		}

		setIsSubmitting(true)
		setSubmitMessage({ type: '', text: '' })

		try {
			const jobHoursValue = parseFloat(calculatedHours)
			const agreedPriceValue = calculatedPrice ? parseFloat(calculatedPrice) : jobHoursValue * baseRate

			const response = await fetch(`${API_BASE_URL}/api/bookings`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					artistId: artist.userId ?? artist.id,
					clientId: user.id,
					eventDate: new Date(data.eventDate).toISOString(),
					eventLocation: data.eventLocation,
					description: data.description,
					jobHours: jobHoursValue,
					agreedPrice: agreedPriceValue,
				}),
			})

			const payload = await response.json()

			if (!response.ok) {
				throw new Error(payload.error || payload.message || 'Error al crear la reserva.')
			}

			setSubmitMessage({ type: 'success', text: 'Reserva creada exitosamente.' })
			form.reset()
			setCalculatedHours('')
			setCalculatedPrice('')
		} catch (error) {
			setSubmitMessage({ type: 'error', text: error.message })
		} finally {
			setIsSubmitting(false)
		}
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
						<Label htmlFor="eventDate" className="text-sm font-semibold text-zinc-900">
							Fecha y Hora de Inicio
						</Label>
						<Input
							id="eventDate"
							type="datetime-local"
							onFocus={handleFormFocus}
							{...form.register('eventDate', {
								required: 'La fecha del evento es requerida',
							})}
							className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
						{form.formState.errors.eventDate && (
							<p className="text-xs text-red-600">{form.formState.errors.eventDate.message}</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="estimatedEndTime" className="text-sm font-semibold text-zinc-900">
							Hora Final Estimada
						</Label>
						<Input
							id="estimatedEndTime"
							type="time"
							onFocus={handleFormFocus}
							{...form.register('estimatedEndTime', {
								required: 'La hora final es requerida',
							})}
							onChange={(e) => {
								form.setValue('estimatedEndTime', e.target.value)
								handleTimeChange()
							}}
							className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
						{form.formState.errors.estimatedEndTime && (
							<p className="text-xs text-red-600">{form.formState.errors.estimatedEndTime.message}</p>
						)}
						{calculatedHours && (
							<div className="rounded-lg bg-indigo-50 p-3">
								<p className="text-xs text-indigo-600 font-semibold">Duración estimada: {calculatedHours} horas</p>
								{calculatedPrice && baseRate > 0 && (
									<p className="text-xs text-indigo-600 font-semibold mt-1">Precio estimado: ${calculatedPrice}</p>
								)}
							</div>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="eventLocation" className="text-sm font-semibold text-zinc-900">
							Ubicación del Evento
						</Label>
						<Input
							id="eventLocation"
							placeholder="Ej: Calle Principal 123, Ciudad"
							onFocus={handleFormFocus}
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
						<Label htmlFor="description" className="text-sm font-semibold text-zinc-900">
							Descripción del Evento
						</Label>
						<textarea
							id="description"
							placeholder="Describe tu evento, tema, requerimientos especiales, etc."
							onFocus={handleFormFocus}
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
						className={`mt-6 rounded-lg px-4 py-3 text-sm ${
							submitMessage.type === 'success'
								? 'border border-green-200 bg-green-50 text-green-800'
								: 'border border-red-200 bg-red-50 text-red-800'
						}`}
					>
						{submitMessage.text}
					</div>
				)}

				<div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset()
							setCalculatedHours('')
							setCalculatedPrice('')
						}}
						className="w-full sm:w-auto rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						disabled={isSubmitting || !calculatedHours}
						className="w-full sm:w-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
					>
						{isSubmitting ? 'Reservando...' : 'Crear Reserva'}
					</Button>
				</div>
			</form>

			{showAuthModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
						<button
							onClick={() => setShowAuthModal(false)}
							className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						<div className="text-center">
							<h2 className="text-xl font-bold text-zinc-900">{modalTitle}</h2>
							<p className="mt-2 text-sm text-zinc-600">{modalDescription}</p>
						</div>

						<div className="mt-6 flex flex-col gap-3">
							{isArtistUser ? (
								<Button
									onClick={() => setShowAuthModal(false)}
									className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
								>
									Cerrar
								</Button>
							) : (
								<>
									<Button
										onClick={() => {
										setShowAuthModal(false)
										navigate('/login')
									}}
										className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
									>
										Iniciar sesión
									</Button>
									<Button
										onClick={() => {
										setShowAuthModal(false)
										navigate('/register')
									}}
										variant="outline"
										className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
									>
										Registrarse
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

