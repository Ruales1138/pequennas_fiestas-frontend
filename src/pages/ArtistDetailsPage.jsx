import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtistDetailsContent from '@/features/artist/ArtistDetailsContent'
import ArtistDetailsLoading from '@/features/artist/ArtistDetailsLoading'
import ArtistDetailsError from '@/features/artist/ArtistDetailsError'
import BookingForm from '@/features/booking/BookingForm'
import { useAuth } from '@/context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function ArtistDetailsPage() {
	const { id } = useParams()
	const { user } = useAuth()
	const [artist, setArtist] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const isOwner = user && artist && user.id === artist.userId

	const handleRatingSubmitted = (meta) => {
		if (!meta) {
			return
		}

		setArtist((currentArtist) => {
			if (!currentArtist) {
				return currentArtist
			}

			return {
				...currentArtist,
				rating: typeof meta.rating === 'number' ? meta.rating : currentArtist.rating,
				ratingCount: typeof meta.ratingCount === 'number' ? meta.ratingCount : currentArtist.ratingCount,
			}
		})
	}

	useEffect(() => {
		if (!id) {
			setError('No se encontro el identificador del artista.')
			setLoading(false)
			return
		}

		const controller = new AbortController()

		async function fetchArtist() {
			try {
				setLoading(true)
				setError('')

				const response = await fetch(`${API_BASE_URL}/api/artists/${id}`, {
					signal: controller.signal,
				})

				const payload = await response.json()

				if (!response.ok) {
					throw new Error(payload.message || 'No se pudo cargar el artista.')
				}

				setArtist(payload.data ?? null)
				setLoading(false)
			} catch (fetchError) {
				if (fetchError.name !== 'AbortError') {
					setError(fetchError.message)
					setLoading(false)
				}
				// On abort: keep loading=true so the spinner stays visible
				// until the re-fired fetch completes.
			}
		}

		fetchArtist()

		return () => controller.abort()
	}, [id])

	if (loading) {
		return <ArtistDetailsLoading />
	}

	if (error || !artist) {
		return <ArtistDetailsError error={error} />
	}

	return (
		<main className="mx-auto min-h-screen max-w-6xl px-6 pb-14 pt-24 text-zinc-800">
			<ArtistDetailsContent artist={artist} isOwner={isOwner} onRatingSubmitted={handleRatingSubmitted} />
			{!isOwner && (
				<div className="mt-12">
					<BookingForm artist={artist} />
				</div>
			)}
		</main>
	)
}

export default ArtistDetailsPage
