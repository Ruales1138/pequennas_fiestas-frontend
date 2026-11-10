export type AdminResource = {
  id: string
  name?: string
  title?: string
  email?: string
  role?: string
}

export type AdminResources = {
  users: AdminResource[]
  artists: AdminResource[]
  bookings: AdminResource[]
}

export type AdminResourceResponse = {
  data?: AdminResource[]
}
