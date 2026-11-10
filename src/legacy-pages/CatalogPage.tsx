'use client'

import ArtistFilters from '@/features/artist/ArtistFilters'
import ArtistCatalogContent from '@/features/artist/ArtistCatalogContent'
import { useArtistCatalog } from '@/features/artist/useArtistCatalog'

function CatalogPage() {
  const {
    availableCategories,
    clearFilters,
    error,
    filteredArtists,
    filters,
    loading,
    setMaxPrice,
    setMinPrice,
    setSearch,
    toggleCategory,
  } = useArtistCatalog()

  return (
    <main id="catalog" className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 bg-[#fbf8ff] px-6 pb-16 pt-24 text-[#2e3145] antialiased md:flex-row">
      <ArtistFilters
        availableCategories={availableCategories}
        maxPrice={filters.maxPrice}
        onClearFilters={clearFilters}
        onMaxPriceChange={setMaxPrice}
        onMinPriceChange={setMinPrice}
        onSearchChange={setSearch}
        onToggleCategory={toggleCategory}
        search={filters.search}
        selectedCategories={filters.selectedCategories}
        minPrice={filters.minPrice}
      />
      <ArtistCatalogContent filteredArtists={filteredArtists} loading={loading} error={error} />
    </main>
  )
}

export default CatalogPage
