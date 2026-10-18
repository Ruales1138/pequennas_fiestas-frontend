import { Link } from 'react-router-dom'

export default function ArtistDetailsError({ error }) {
	return (
		<main className="mx-auto min-h-screen max-w-5xl px-6 pb-12 pt-28">
			<div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
				<p className="font-semibold text-rose-700">{error || 'Artista no encontrado.'}</p>
				<Link className="mt-4 inline-block text-sm font-semibold text-indigo-600" to="/catalog">
					Volver al catalogo
				</Link>
			</div>
		</main>
	)
}
