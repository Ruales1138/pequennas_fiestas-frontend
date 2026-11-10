import { useEffect, useState } from 'react'
import { getArtistById } from './artistService'
import type { ArtistDetail, RatingMeta } from './types'

export function useArtistDetails(id: string | undefined) {
  const [artist, setArtist] = useState<ArtistDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setError('No se encontro el identificador del artista.')
      setLoading(false)
      return
    }

    const artistId = id
    const controller = new AbortController()
    let active = true

    async function loadArtist() {
      try {
        setLoading(true)
        setError('')
        const nextArtist = await getArtistById(artistId, controller.signal)
        if (active) setArtist(nextArtist)
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name === 'AbortError') return
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar la información del artista.',
          )
        }
      } finally {
        if (active && !controller.signal.aborted) setLoading(false)
      }
    }

    void loadArtist()
    return () => {
      active = false
      controller.abort()
    }
  }, [id])

  const updateRating = (meta: RatingMeta | null | undefined) => {
    if (!meta) return

    setArtist((currentArtist) => {
      if (!currentArtist) return currentArtist
      return {
        ...currentArtist,
        rating: typeof meta.rating === 'number' ? meta.rating : currentArtist.rating,
        ratingCount:
          typeof meta.ratingCount === 'number' ? meta.ratingCount : currentArtist.ratingCount,
      }
    })
  }

  return { artist, error, loading, updateRating }
}
