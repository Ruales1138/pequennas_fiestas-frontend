import { useEffect, useState } from 'react'
import ArtistCard from '@/features/artist/ArtistCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ArtistCatalogContent({ filteredArtists, loading, error }) {
    const pageSize = 15
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(filteredArtists.length / pageSize))

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredArtists])

    const displayedArtists = filteredArtists.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    )

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

            {!loading && !error && filteredArtists.length > 0 && (
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <p className="text-sm text-slate-500">
                        Mostrando {(currentPage - 1) * pageSize + 1}-
                        {Math.min(currentPage * pageSize, filteredArtists.length)} de {filteredArtists.length}
                    </p>
                    {totalPages > 1 && (
                        <nav aria-label="Paginación del catálogo" className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Anterior
                            </button>
                            <span className="text-sm font-semibold text-slate-700">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((page) => page + 1)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Siguiente
                            </button>
                        </nav>
                    )}
                </div>
            )}
		</section>
	)
}
