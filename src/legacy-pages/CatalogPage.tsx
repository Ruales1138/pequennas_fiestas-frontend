import { useEffect, useMemo, useState } from 'react'
import ArtistFilters from '@/features/artist/ArtistFilters'
import ArtistCatalogContent from '@/features/artist/ArtistCatalogContent'
import { apiRequest } from '@/lib/apiClient'

type CatalogArtist = {
  id: string
  name?: string
  category?: string
  city?: string
  hourlyRate?: number | string
}

type CatalogResponse = {
  data?: CatalogArtist[]
}

function CatalogPage() {
  const [artists, setArtists] = useState<CatalogArtist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchArtists() {
      try {
        setLoading(true)
        setError('')

        const payload = (await apiRequest<CatalogResponse>('/api/artists', {
          signal: controller.signal,
        })) as CatalogResponse

        const nextArtists = Array.isArray(payload.data) ? payload.data : []
        setArtists(nextArtists)
      } catch (fetchError) {
        const errorObject = fetchError as Error & { name?: string }
        if (errorObject.name !== 'AbortError') {
          setError(errorObject.message || 'No se pudo cargar el catálogo.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()

    return () => controller.abort()
  }, [])

  const availableCategories = useMemo(() => {
    return Array.from(new Set(artists.map((artist) => artist.category).filter(Boolean))).sort() as string[]
  }, [artists])

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((currentCategories) => {
      if (currentCategories.includes(category)) {
        return currentCategories.filter((value) => value !== category)
      }

      return [...currentCategories, category]
    })
  }

  const handleClearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setMinPrice('')
    setMaxPrice('')
  }

  const filteredArtists = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const parsedMinPrice = minPrice === '' ? null : Number(minPrice)
    const parsedMaxPrice = maxPrice === '' ? null : Number(maxPrice)

    return artists.filter((artist) => {
      const name = artist.name?.toLowerCase() ?? ''
      const category = artist.category?.toLowerCase() ?? ''
      const city = artist.city?.toLowerCase() ?? ''
      const hourlyRate = Number(artist.hourlyRate)

      const matchesSearch =
        normalizedSearch.length === 0 ||
        name.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        city.includes(normalizedSearch)

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(artist.category ?? '')

      const matchesMinPrice =
        parsedMinPrice === null || !Number.isFinite(hourlyRate) || hourlyRate >= parsedMinPrice
      const matchesMaxPrice =
        parsedMaxPrice === null || !Number.isFinite(hourlyRate) || hourlyRate <= parsedMaxPrice

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
    })
  }, [artists, maxPrice, minPrice, search, selectedCategories])

  return (
    <main id="catalog" className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 bg-[#fbf8ff] px-6 pb-16 pt-24 text-[#2e3145] antialiased md:flex-row">
      <ArtistFilters
        availableCategories={availableCategories}
        maxPrice={maxPrice}
        onClearFilters={handleClearFilters}
        onMaxPriceChange={setMaxPrice}
        onMinPriceChange={setMinPrice}
        onSearchChange={setSearch}
        onToggleCategory={handleToggleCategory}
        search={search}
        selectedCategories={selectedCategories}
        minPrice={minPrice}
      />
      <ArtistCatalogContent filteredArtists={filteredArtists} loading={loading} error={error} />
    </main>
  )
}

export default CatalogPage
