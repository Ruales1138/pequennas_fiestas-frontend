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

export type ArtistDetail = Artist & {
  userId?: string
  contactSocial?: string
  contactPhone?: string
  bio?: string
}

export type RatingMeta = {
  rating?: number
  ratingCount?: number
}

export type ArtistListResponse = {
  data?: Artist[]
}

export type ArtistDetailResponse = {
  data?: ArtistDetail | null
}

export type ArtistFiltersState = {
  search: string
  selectedCategories: string[]
  minPrice: string
  maxPrice: string
}
