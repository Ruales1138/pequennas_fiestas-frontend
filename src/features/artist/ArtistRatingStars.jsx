function StarIcon({ filled = 0 }) {
	return (
		<span className="relative inline-flex h-4 w-4 shrink-0">
			<svg aria-hidden="true" className="h-4 w-4 text-zinc-200" fill="currentColor" viewBox="0 0 20 20">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 0 0 .95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 0 0-.364 1.118l1.286 3.955c.3.922-.755 1.688-1.538 1.118l-3.368-2.448a1 1 0 0 0-1.175 0l-3.368 2.448c-.783.57-1.838-.196-1.538-1.118l1.286-3.955a1 1 0 0 0-.364-1.118L2.112 9.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 0 0 .95-.69z" />
			</svg>
			{filled > 0 && (
				<span
					aria-hidden="true"
					className="absolute inset-0 overflow-hidden text-amber-400"
					style={{ width: `${filled * 100}%` }}
				>
					<svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 0 0 .95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 0 0-.364 1.118l1.286 3.955c.3.922-.755 1.688-1.538 1.118l-3.368-2.448a1 1 0 0 0-1.175 0l-3.368 2.448c-.783.57-1.838-.196-1.538-1.118l1.286-3.955a1 1 0 0 0-.364-1.118L2.112 9.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 0 0 .95-.69z" />
					</svg>
				</span>
			)}
		</span>
	)
}

export default function ArtistRatingStars({ rating = 0, reviewCount, className = '', size = 'md' }) {
	const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0))
	const displayRating = normalizedRating.toFixed(1)
	const stars = Array.from({ length: 5 }, (_, index) => {
		const fillLevel = normalizedRating - index

		if (fillLevel >= 1) {
			return 1
		}

		if (fillLevel <= 0) {
			return 0
		}

		return fillLevel
	})

	const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'
	const starGap = size === 'sm' ? 'gap-0.5' : 'gap-1'

	return (
		<div className={`inline-flex items-center ${starGap} ${className}`}>
			<div className="flex items-center gap-0.5">
				{stars.map((filled, index) => (
					<StarIcon key={index} filled={filled} />
				))}
			</div>
			<span className={`font-semibold text-zinc-900 ${textSize}`}>{displayRating}</span>
			{typeof reviewCount === 'number' && (
				<span className={`${textSize} text-zinc-500`}>
					({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})
				</span>
			)}
		</div>
	)
}