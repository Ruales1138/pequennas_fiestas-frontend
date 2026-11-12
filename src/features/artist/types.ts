export type Artist = {
  id: string
  userId?: string
  name?: string
  category?: string
  city?: string
  rating?: number
  ratingCount?: number
  imageUrl?: string
  hourlyRate?: number | string
  baseRate?: number | string
  user?: {
    id?: string
    name?: string
    email?: string
    image?: string | null
  }
}

export type ArtistDetail = Artist & {
  userId?: string
  contactSocial?: string
  contactPhone?: string
  bio?: string
  coverageArea?: string
  isActive?: boolean
}

export type RatingMeta = {
  rating?: number
  ratingCount?: number
}

export type ArtistListResponse = {
  data?: Artist[]
  pagination?: {
    total?: number
    currentPage?: number
    limit?: number
    totalPages?: number
  }
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
