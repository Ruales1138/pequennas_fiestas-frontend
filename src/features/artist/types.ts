export type Artist = {
  id: string
  name?: string
  category?: string
  city?: string
  rating?: number
  ratingCount?: number
  imageUrl?: string
  hourlyRate?: number | string
}

export type ArtistListResponse = {
  data?: Artist[]
}

export type ArtistFiltersState = {
  search: string
  selectedCategories: string[]
  minPrice: string
  maxPrice: string
}
