import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtistDetailsContent from '@/features/artist/ArtistDetailsContent'
import ArtistDetailsLoading from '@/features/artist/ArtistDetailsLoading'
import ArtistDetailsError from '@/features/artist/ArtistDetailsError'
import BookingForm from '@/features/booking/BookingForm'
import { useAuth } from '@/context/AuthContext'
import { getArtistById } from '@/features/artist/artistService'
import type { ArtistDetail, RatingMeta } from '@/features/artist/types'

function ArtistDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [artist, setArtist] = useState<ArtistDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isOwner = Boolean(user && artist && user.id === artist.userId)

  const handleRatingSubmitted = (meta: RatingMeta | null | undefined) => {
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
        ratingCount:
          typeof meta.ratingCount === 'number' ? meta.ratingCount : currentArtist.ratingCount,
      }
    })
  }

  useEffect(() => {
    if (!id) {
      setError('No se encontro el identificador del artista.')
      setLoading(false)
      return
    }

    const artistId = id
    const controller = new AbortController()

    async function fetchArtist() {
      try {
        setLoading(true)
        setError('')

        setArtist(await getArtistById(artistId, controller.signal))
      } catch (fetchError) {
        const errorObject = fetchError as Error & { name?: string }
        if (errorObject.name !== 'AbortError') {
          setError(errorObject.message || 'No se pudo cargar la información del artista.')
        }
      } finally {
        setLoading(false)
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
