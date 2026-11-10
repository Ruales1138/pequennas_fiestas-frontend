'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui'
import DashboardArtist from '@/features/artist/DashboardArtist'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 pt-28 pb-16">
        <LoadingSpinner message="Cargando tu panel…" />
      </main>
    )
  }

  // Only active artista sessions can access this route.
  if (!user || user.role !== 'artista') {
    router.replace('/401')
    return null
  }

  return <DashboardArtist />
}