import { useState } from 'react'

export default function ArtistFilters({
	availableCategories,
	maxPrice,
	onClearFilters,
	onMaxPriceChange,
	onMinPriceChange,
	onSearchChange,
	onToggleCategory,
	search,
	selectedCategories,
	minPrice,
}) {
	const [isOpen, setIsOpen] = useState(false)
	const hasActiveFilters =
		search.trim().length > 0 || selectedCategories.length > 0 || minPrice !== '' || maxPrice !== ''

	return (
		<aside className="w-full shrink-0 md:w-72">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-100 bg-white p-4 font-bold tracking-tight text-[#2e3145] shadow-sm md:hidden"
				type="button"
			>
				<span className="flex items-center gap-2">
					<span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
							<path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clipRule="evenodd" />
						</svg>
					</span>
					Filtros {hasActiveFilters && <span className="text-xs font-semibold text-indigo-600">(Activos)</span>}
				</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
					<path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
				</svg>
			</button>

			<div className={`sticky top-24 space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md md:block ${isOpen ? 'block' : 'hidden'}`}>
				<div className="flex items-center justify-between">
					<h2 className="hidden items-center gap-2 text-lg font-bold tracking-tight text-[#2e3145] md:flex">
						<span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
								<path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clipRule="evenodd" />
							</svg>
						</span>
						Filtros
					</h2>
					<button
						className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
						disabled={!hasActiveFilters}
						onClick={onClearFilters}
						type="button"
					>
						Limpiar todo
					</button>
				</div>

				<hr className="hidden border-slate-100 md:block" />

				<div className="space-y-2">
					<label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
						Buscar nombre
					</label>
					<div className="relative">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
							<path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
						</svg>
						<input
							className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
							placeholder="Ej. Elena Rodríguez"
							value={search}
							onChange={(event) => onSearchChange(event.target.value)}
							type="text"
						/>
					</div>
				</div>

				<hr className="border-slate-100" />

				<div className="space-y-3">
					<label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
						Categoría
					</label>
					{availableCategories.length > 0 ? (
						<div className="space-y-1.5">
							{availableCategories.map((category) => {
								const isSelected = selectedCategories.includes(category)

								return (
									<label
										key={category}
										className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
											isSelected
												? 'bg-indigo-50 font-medium text-indigo-700'
												: 'text-slate-600 hover:bg-slate-50'
										}`}
									>
										<input
											checked={isSelected}
											onChange={() => onToggleCategory(category)}
											className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
											type="checkbox"
										/>
										<span>{category}</span>
									</label>
								)
							})}
						</div>
					) : (
						<p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-400">
							Carga artistas para ver las categorías disponibles.
						</p>
					)}
				</div>

				<hr className="border-slate-100" />

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
							Rango de precio
						</label>
						<span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600">
							{minPrice === '' && maxPrice === ''
								? 'Todos'
								: `$${minPrice || '0'} – $${maxPrice || '∞'}`}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-3 text-sm">
						<label className="space-y-1.5">
							<span className="text-xs font-medium text-slate-500">Mínimo</span>
							<input
								className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
								onChange={(event) => onMinPriceChange(event.target.value)}
								placeholder="$0"
								value={minPrice}
								type="number"
								min="0"
							/>
						</label>
						<label className="space-y-1.5">
							<span className="text-xs font-medium text-slate-500">Máximo</span>
							<input
								className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
								onChange={(event) => onMaxPriceChange(event.target.value)}
								placeholder="Sin límite"
								value={maxPrice}
								type="number"
								min="0"
							/>
						</label>
					</div>
				</div>
			</div>
		</aside>
	)
}
