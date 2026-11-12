'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import DashboardArtist from '@/features/artist/DashboardArtist'
import ClientBookingsSection from '@/features/booking/ClientBookingsSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f4f1ff] px-4 pt-28 pb-16">
        <LoadingSpinner message="Cargando tu panel…" />
      </main>
    )
  }

  if (!user) {
    router.replace('/login')
    return null
  }

  if (user.role === 'artista') {
    return <DashboardArtist />
  }

  return <ClientBookingsSection />
}
