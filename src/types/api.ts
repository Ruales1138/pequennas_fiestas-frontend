export interface ApiErrorPayload {
  message?: string
  error?: string
  [key: string]: unknown
}

export interface ApiError extends Error {
  status?: number
  payload?: ApiErrorPayload | null
}

export interface ApiListResponse<T> {
  data: T[]
  pagination?: {
    total: number
    currentPage: number
    limit: number
    totalPages: number
  }
}
