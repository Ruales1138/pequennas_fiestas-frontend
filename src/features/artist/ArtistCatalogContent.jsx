import ArtistCard from '@/features/artist/ArtistCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ArtistCatalogContent({ filteredArtists, loading, error }) {
    const displayedArtists = filteredArtists.slice(0, 15);

	return (
		<section className="flex-1" id="pricing">
			<div className="mb-8">
				<span className="mb-2 inline-block rounded bg-indigo-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-700">
					Descubrimiento
				</span>
				<h1 className="text-4xl font-extrabold tracking-tighter text-[#2e3145]">Catálogo de Artistas</h1>
				<p className="mt-2 max-w-lg text-slate-600">Conecta con profesionales excepcionales para tu próximo evento.</p>
			</div>

			{loading && <LoadingSpinner message="Cargando artistas…" fullPage={false} />}
			{error && <p className="mb-6 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

			{!loading && !error && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{displayedArtists.map((artist) => (
						<ArtistCard key={artist.id} artist={artist} />
					))}
				</div>
			)}
			{!loading && !error && filteredArtists.length === 0 && (
				<p className="mt-6 rounded-lg bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
					No hay artistas para mostrar con los filtros seleccionados.
				</p>
			)}

            {!loading && !error && filteredArtists.length > 15 && (
                <p className="mt-12 text-center text-sm font-medium text-slate-500">
                    Mostrando los primeros 15 resultados. Ajusta los filtros para refinar la búsqueda.
                </p>
            )}
		</section>
	)
}
