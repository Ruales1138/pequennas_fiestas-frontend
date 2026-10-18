import { Link } from 'react-router-dom'
import ArtistBookingsList from './ArtistBookingsList'
import ArtistRatingStars from './ArtistRatingStars'
import ArtistRatingForm from './ArtistRatingForm'

export default function ArtistDetailsContent({ artist, isOwner, onRatingSubmitted }) {
	const reviewCount = Number.isFinite(Number(artist.ratingCount)) ? Number(artist.ratingCount) : undefined

	return (
		<>
			<Link className="mb-6 inline-block text-sm font-semibold text-indigo-600" to="/catalog">
				← Volver al catalogo
			</Link>

			<div className="grid gap-8 lg:grid-cols-12">
				<div className="lg:col-span-7">
					<div className="overflow-hidden rounded-2xl bg-zinc-100 shadow-sm">
						<img alt={artist.name} className="aspect-4/3 w-full object-cover" src={artist.imageUrl} />
					</div>
				</div>

				<div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm lg:col-span-5">
					<p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Perfil Profesional</p>
					<h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">{artist.name}</h1>
					<p className="mt-1 text-sm text-zinc-500">{artist.category}</p>

					<div className="mt-4 rounded-xl bg-amber-50 px-4 py-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Calificacion promedio</p>
						<div className="mt-2 flex flex-wrap items-center gap-3">
							<ArtistRatingStars rating={artist.rating} reviewCount={reviewCount} size="lg" />
						</div>
					</div>

					<div className="mt-6 space-y-4 text-sm">
						<div className="flex items-center justify-between border-b border-zinc-100 pb-3">
							<span className="text-zinc-500">Calificacion</span>
							<span className="font-semibold text-zinc-900">{Number(artist.rating || 0).toFixed(1)}</span>
						</div>
						<div className="flex items-center justify-between border-b border-zinc-100 pb-3">
							<span className="text-zinc-500">Tarifa base</span>
							<span className="font-semibold text-zinc-900">${artist.hourlyRate} / hora</span>
						</div>
						<div className="flex items-center justify-between border-b border-zinc-100 pb-3">
							<span className="text-zinc-500">Ciudad</span>
							<span className="font-semibold text-zinc-900">{artist.city}</span>
						</div>
						<div className="flex items-center justify-between border-b border-zinc-100 pb-3">
							<span className="text-zinc-500">Contacto social</span>
							<span className="font-semibold text-zinc-900">{artist.contactSocial || 'No definido'}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-zinc-500">Telefono</span>
							<span className="font-semibold text-zinc-900">{artist.contactPhone || 'No definido'}</span>
						</div>
					</div>
				</div>
			</div>

			<section className="mt-8 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
				<h2 className="text-xl font-bold tracking-tight text-zinc-900">Sobre el artista</h2>
				<p className="mt-3 leading-relaxed text-zinc-600">{artist.bio}</p>
			</section>

			<section className="mt-8 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-xl font-bold tracking-tight text-zinc-900">Reseñas y valoraciones</h2>
						<p className="mt-1 text-sm text-zinc-600">
							Aquí puedes dejar una calificación si ya eres cliente y reservaste este artista.
						</p>
					</div>
					<div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm">
						{reviewCount ?? 0} reseñas
					</div>
				</div>
				<div className="mt-5">
					<div className="rounded-xl border border-dashed border-zinc-200 bg-white p-4">
						<ArtistRatingForm artistId={artist.id} artistName={artist.name} onSubmitted={onRatingSubmitted} />
					</div>
				</div>
			</section>

			<section className="mt-8">
				{isOwner && (
					<section className="mt-8">
						<h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900">Tus Reservas</h2>
						<ArtistBookingsList />
					</section>
				)}
			</section>
		</>
	)
}
