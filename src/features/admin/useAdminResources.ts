import { useEffect, useState } from 'react'
import { getAdminResources } from './adminService'
import type { AdminResources } from './types'

const EMPTY_RESOURCES: AdminResources = {
  users: [],
  artists: [],
  bookings: [],
}

export function useAdminResources() {
  const [resources, setResources] = useState<AdminResources>(EMPTY_RESOURCES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadResources() {
      try {
        setIsLoading(true)
        setError('')
        const nextResources = await getAdminResources()
        if (active) setResources(nextResources)
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar la información administrativa.',
          )
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    void loadResources()
    return () => {
      active = false
    }
  }, [])

  return { error, isLoading, resources }
}
