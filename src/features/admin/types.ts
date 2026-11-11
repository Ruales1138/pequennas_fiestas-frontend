export type AdminResourceType = 'users' | 'artists' | 'bookings' | 'ratings'

export type AdminResource = {
  id: string
  name?: string
  title?: string
  email?: string
  role?: string
  city?: string
  category?: string
  baseRate?: number
  agreedPrice?: number
  status?: string
  rating?: number
  comment?: string | null
  isActive?: boolean
  deletedAt?: string | null
  createdAt?: string
}

export type AdminResources = {
  users: AdminResource[]
  artists: AdminResource[]
  bookings: AdminResource[]
  ratings: AdminResource[]
}

export type AdminResourceResponse = {
  ok?: boolean
  data?: AdminResource[]
}

export type AdminMutationResponse = {
  ok?: boolean
  message?: string
  data?: AdminResource
}
