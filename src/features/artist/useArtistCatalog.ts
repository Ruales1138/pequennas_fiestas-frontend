import { useEffect, useMemo, useState } from 'react'
import { getArtists } from './artistService'
import type { Artist, ArtistFiltersState } from './types'

const EMPTY_FILTERS: ArtistFiltersState = {
  search: '',
  selectedCategories: [],
  minPrice: '',
  maxPrice: '',
}

function filterArtists(artists: Artist[], filters: ArtistFiltersState): Artist[] {
  const normalizedSearch = filters.search.trim().toLowerCase()
  const parsedMinPrice = filters.minPrice === '' ? null : Number(filters.minPrice)
  const parsedMaxPrice = filters.maxPrice === '' ? null : Number(filters.maxPrice)

  return artists.filter((artist) => {
    const searchableText = [artist.name, artist.category, artist.city]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    const hourlyRate = Number(artist.hourlyRate)

    const matchesSearch =
      normalizedSearch.length === 0 || searchableText.includes(normalizedSearch)
    const matchesCategory =
      filters.selectedCategories.length === 0 ||
      filters.selectedCategories.includes(artist.category ?? '')
    const matchesMinPrice =
      parsedMinPrice === null || !Number.isFinite(hourlyRate) || hourlyRate >= parsedMinPrice
    const matchesMaxPrice =
      parsedMaxPrice === null || !Number.isFinite(hourlyRate) || hourlyRate <= parsedMaxPrice

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
  })
}

export function useArtistCatalog() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filters, setFilters] = useState<ArtistFiltersState>(EMPTY_FILTERS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadArtists() {
      try {
        setLoading(true)
        setError('')
        setArtists(await getArtists(controller.signal))
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name === 'AbortError') return
        setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el catálogo.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadArtists()
    return () => controller.abort()
  }, [])

  const availableCategories = useMemo(
    () =>
      Array.from(new Set(artists.map((artist) => artist.category).filter(Boolean))).sort() as string[],
    [artists],
  )
  const filteredArtists = useMemo(() => filterArtists(artists, filters), [artists, filters])

  const updateFilter = <K extends keyof ArtistFiltersState>(
    key: K,
    value: ArtistFiltersState[K],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const toggleCategory = (category: string) => {
    setFilters((current) => ({
      ...current,
      selectedCategories: current.selectedCategories.includes(category)
        ? current.selectedCategories.filter((value) => value !== category)
        : [...current.selectedCategories, category],
    }))
  }

  return {
    availableCategories,
    error,
    filteredArtists,
    filters,
    loading,
    clearFilters: () => setFilters(EMPTY_FILTERS),
    setMaxPrice: (value: string) => updateFilter('maxPrice', value),
    setMinPrice: (value: string) => updateFilter('minPrice', value),
    setSearch: (value: string) => updateFilter('search', value),
    toggleCategory,
  }
}
