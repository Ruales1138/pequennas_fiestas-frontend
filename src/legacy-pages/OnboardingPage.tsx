'use client'

import { useRouter } from 'next/navigation'
import ArtistProfileForm from '../features/auth/ArtistProfileForm'

type PendingUser = {
  id?: string
}

export function OnboardingPage() {
  const router = useRouter()
  const rawPendingUser = sessionStorage.getItem('pending_user') ?? '{}'
  const user: PendingUser = JSON.parse(rawPendingUser) as PendingUser

  if (!user?.id) {
    router.replace('/register')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ArtistProfileForm
        userId={user.id}
        onSuccess={() => {
          sessionStorage.removeItem('pending_user')
          router.push('/catalog')
        }}
      />
    </div>
  )
}
