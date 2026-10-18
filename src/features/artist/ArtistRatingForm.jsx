import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ArtistRatingStars from './ArtistRatingStars'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export default function ArtistRatingForm({ artistId, artistName, onSubmitted }) {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [rating, setRating] = useState(5)
	const [comment, setComment] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState({ type: '', text: '' })

	const canRate = user?.role === 'cliente'
	const isArtistUser = user?.role === 'artista'

	const helperText = useMemo(() => {
		if (!user) {
			return 'Inicia sesión como cliente para dejar una calificación.'
		}

		if (isArtistUser) {
			return 'Las cuentas de artista no pueden calificar otros perfiles.'
		}

		return 'Solo puedes calificar si ya completaste una reserva aceptada.'
	}, [isArtistUser, user])

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!user) {
			setMessage({ type: 'error', text: 'Debes iniciar sesión para calificar.' })
			return
		}

		if (!canRate) {
			setMessage({ type: 'error', text: 'Solo un cliente puede calificar.' })
			return
		}

		setIsSubmitting(true)
		setMessage({ type: '', text: '' })

		try {
			const response = await fetch(`${API_BASE_URL}/api/artists/${artistId}/ratings`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					rating,
					comment,
				}),
			})

			const payload = await response.json()

			if (!response.ok) {
				throw new Error(payload.message || 'No se pudo guardar la calificación.')
			}

			setMessage({ type: 'success', text: 'Tu calificación se guardó correctamente.' })
			setComment('')
			setRating(5)

			if (typeof onSubmitted === 'function') {
				onSubmitted(payload.meta, payload.data)
			}
		} catch (error) {
			setMessage({ type: 'error', text: error.message })
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!user) {
		return (
			<div className="rounded-xl bg-white p-4 shadow-sm">
				<p className="text-sm font-semibold text-zinc-900">Califica a {artistName}</p>
				<p className="mt-2 text-sm text-zinc-600">{helperText}</p>
				<div className="mt-4 flex flex-wrap gap-3">
					<button
						onClick={() => navigate('/login')}
						className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
					>
						Iniciar sesión
					</button>
					<button
						onClick={() => navigate('/register')}
						className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
					>
						Registrarse
					</button>
				</div>
			</div>
		)
	}

	if (!canRate) {
		return (
			<div className="rounded-xl bg-white p-4 shadow-sm">
				<p className="text-sm font-semibold text-zinc-900">Califica a {artistName}</p>
				<p className="mt-2 text-sm text-zinc-600">{helperText}</p>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-zinc-900">Califica a {artistName}</p>
					<p className="mt-1 text-sm text-zinc-600">{helperText}</p>
				</div>
			</div>

			<div className="mt-5 space-y-3">
				<label className="block text-sm font-semibold text-zinc-900">Tu calificación</label>
				<div className="flex flex-wrap items-center gap-2">
					{[1, 2, 3, 4, 5].map((value) => (
						<button
							key={value}
							type="button"
							onClick={() => setRating(value)}
							className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
								rating === value
									? 'border-amber-400 bg-amber-50 text-amber-700'
									: 'border-zinc-200 bg-white text-zinc-600 hover:border-amber-300 hover:text-amber-700'
							}`}
						>
							<ArtistRatingStars rating={value} size="sm" />
						</button>
					))}
				</div>
			</div>

			<div className="mt-4 grid gap-2">
				<label htmlFor="ratingComment" className="text-sm font-semibold text-zinc-900">
					Comentario opcional
				</label>
				<textarea
					id="ratingComment"
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					rows={4}
					maxLength={1000}
					placeholder="Cuéntanos qué te pareció tu experiencia con este artista."
					className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
				/>
			</div>

			{message.text && (
				<div
					className={`mt-4 rounded-lg px-4 py-3 text-sm ${
						message.type === 'success'
							? 'border border-green-200 bg-green-50 text-green-800'
							: 'border border-red-200 bg-red-50 text-red-800'
					}`}
				>
					{message.text}
				</div>
			)}

			<div className="mt-4 flex justify-end">
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Guardando...' : 'Enviar calificación'}
				</button>
			</div>
		</form>
	)
}