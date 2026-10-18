import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ArtistDetailsLoading() {
	return (
		<main className="mx-auto min-h-screen max-w-5xl px-6 pb-12 pt-28">
			<LoadingSpinner message="Cargando perfil del artista…" />
		</main>
	)
}
