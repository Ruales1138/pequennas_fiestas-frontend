import { Link } from 'react-router-dom'
import ArtistRatingStars from './ArtistRatingStars'

export default function ArtistCard({ artist }) {
	const reviewCount = Number.isFinite(Number(artist.ratingCount)) ? Number(artist.ratingCount) : undefined

	return (
		<Link to={`/detail/${artist.id}`} className="overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:-translate-y-1">
			<img alt={artist.name} className="aspect-square w-full object-cover" src={artist.imageUrl} />
			<div className="p-5">
				<h3 className="text-lg font-bold tracking-tight">{artist.name}</h3>
				<div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
					<span>{artist.category}</span>
					<span aria-hidden="true">·</span>
					<ArtistRatingStars rating={artist.rating} reviewCount={reviewCount} size="sm" />
				</div>
				<p className="mt-2 text-sm text-slate-600">from ${artist.hourlyRate} per hour</p>
			</div>
		</Link>
	)
}
