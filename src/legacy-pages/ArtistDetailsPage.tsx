import { useParams } from 'react-router-dom'
import ArtistDetailsContent from '@/features/artist/ArtistDetailsContent'
import ArtistDetailsLoading from '@/features/artist/ArtistDetailsLoading'
import ArtistDetailsError from '@/features/artist/ArtistDetailsError'
import BookingForm from '@/features/booking/BookingForm'
import { useAuth } from '@/context/AuthContext'
import { useArtistDetails } from '@/features/artist/useArtistDetails'

function ArtistDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { artist, error, loading, updateRating } = useArtistDetails(id)

  const isOwner = Boolean(user && artist && user.id === artist.userId)

  if (loading) {
    return <ArtistDetailsLoading />
  }

  if (error || !artist) {
    return <ArtistDetailsError error={error} />
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pb-14 pt-24 text-zinc-800">
      <ArtistDetailsContent artist={artist} isOwner={isOwner} onRatingSubmitted={updateRating} />
      {!isOwner && (
        <div className="mt-12">
          <BookingForm artist={artist} />
        </div>
      )}
    </main>
  )
}

export default ArtistDetailsPage
