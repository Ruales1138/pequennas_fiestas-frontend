'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ArtistProfileForm from '../features/auth/ArtistProfileForm'

type PendingUser = {
  id?: string
}

export function OnboardingPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const rawPendingUser = window.sessionStorage.getItem('pending_user') ?? '{}'
      const user: PendingUser = JSON.parse(rawPendingUser) as PendingUser
      if (user?.id) {
        setUserId(user.id)
      } else {
        router.replace('/register')
      }
    } catch {
      router.replace('/register')
    } finally {
      setChecked(true)
    }
  }, [router])

  if (!checked || !userId) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ArtistProfileForm
        userId={userId}
        onSuccess={() => {
          window.sessionStorage.removeItem('pending_user')
          router.push('/catalog')
        }}
      />
    </div>
  )
}
