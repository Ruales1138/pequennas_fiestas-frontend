import { useCallback, useEffect, useState } from 'react'
import {
  deleteAdminResource,
  getAdminResources,
  updateAdminResource,
  updateAdminResourceStatus,
} from './adminService'
import type { AdminResources, AdminResourceType, AdminUpdatePayload } from './types'

const EMPTY_RESOURCES: AdminResources = {
  users: [],
  artists: [],
  bookings: [],
  ratings: [],
}

export function useAdminResources() {
  const [resources, setResources] = useState<AdminResources>(EMPTY_RESOURCES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  const loadResources = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      const nextResources = await getAdminResources()
      setResources(nextResources)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudo cargar la información administrativa.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadResources()
  }, [loadResources])

  const toggleStatus = async (
    resourceType: AdminResourceType,
    id: string,
    nextActive: boolean,
  ) => {
    try {
      setActionLoadingId(`${resourceType}:${id}`)
      setError('')
      await updateAdminResourceStatus(resourceType, id, nextActive)
      setResources((prev) => ({
        ...prev,
        [resourceType]: prev[resourceType].map((item) =>
          item.id === id
            ? {
                ...item,
                isActive: nextActive,
                deletedAt: nextActive ? null : new Date().toISOString(),
              }
            : item,
        ),
      }))
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'No se pudo actualizar el estado del registro.',
      )
    } finally {
      setActionLoadingId(null)
    }
  }

  const updateResource = async (
    resourceType: AdminResourceType,
    id: string,
    payload: AdminUpdatePayload,
  ) => {
    try {
      setActionLoadingId(`${resourceType}:${id}`)
      setError('')
      const currentItem = resources[resourceType].find((item) => item.id === id)
      await updateAdminResource(resourceType, id, payload, currentItem?.isActive ?? true)

      setResources((prev) => ({
        ...prev,
        [resourceType]: prev[resourceType].map((item) => {
          if (item.id !== id) return item
          const next = { ...item, ...payload }
          if (resourceType === 'bookings' && payload.status) {
            next.role = payload.status
          }
          if (resourceType === 'ratings') {
            if (payload.rating !== undefined) {
              next.role = `${payload.rating} ★`
            }
            if (payload.comment !== undefined && payload.comment !== null) {
              next.name = payload.comment
            }
          }
          return next
        }),
      }))
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'No se pudo editar el registro.',
      )
      throw mutationError
    } finally {
      setActionLoadingId(null)
    }
  }

  const softDelete = async (resourceType: AdminResourceType, id: string) => {
    try {
      setActionLoadingId(`${resourceType}:${id}`)
      setError('')
      await deleteAdminResource(resourceType, id)
      setResources((prev) => ({
        ...prev,
        [resourceType]: prev[resourceType].filter((item) => item.id !== id),
      }))
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : 'No se pudo eliminar el registro.',
      )
    } finally {
      setActionLoadingId(null)
    }
  }

  return {
    actionLoadingId,
    error,
    isLoading,
    reload: loadResources,
    resources,
    softDelete,
    toggleStatus,
    updateResource,
  }
}
