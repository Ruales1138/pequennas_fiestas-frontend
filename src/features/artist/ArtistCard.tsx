'use client'

import Link from 'next/link'
import ArtistRatingStars from './ArtistRatingStars'

type ArtistCardProps = {
  artist: {
    id: string
    name?: string
    category?: string
    rating?: number
    ratingCount?: number
    imageUrl?: string
    hourlyRate?: number | string
  }
}

const FALLBACK_IMAGE = '/images/artists/artista_principal.jpg'

export default function ArtistCard({ artist }: ArtistCardProps) {
  const reviewCount = Number.isFinite(Number(artist.ratingCount)) ? Number(artist.ratingCount) : undefined

  return (
    <Link
      href={`/detail/${artist.id}`}
      className="group overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <img
        alt={artist.name ?? 'Artista'}
        className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
        src={artist.imageUrl || FALLBACK_IMAGE}
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK_IMAGE) {
            e.currentTarget.src = FALLBACK_IMAGE
          }
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-bold tracking-tight">{artist.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span>{artist.category}</span>
          <span aria-hidden="true">·</span>
          <ArtistRatingStars rating={artist.rating} reviewCount={reviewCount} size="sm" />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Desde ${Number(artist.hourlyRate ?? 0).toLocaleString('es-CO')} por hora
        </p>
      </div>
    </Link>
  )
}
