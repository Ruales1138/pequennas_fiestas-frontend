'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import ArtistProfileForm from '../features/auth/ArtistProfileForm'

type PendingUser = {
  id?: string
}

export function OnboardingPage() {
  const router = useRouter()
  const { user: authUser, isLoading: authLoading } = useAuth()
  const [userId, setUserId] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (authLoading) return
    try {
      const rawPendingUser = window.sessionStorage.getItem('pending_user') ?? '{}'
      const pending: PendingUser = JSON.parse(rawPendingUser) as PendingUser
      const resolvedId = pending?.id || authUser?.id
      if (resolvedId) {
        setUserId(resolvedId)
      } else {
        router.replace('/register')
      }
    } catch {
      if (authUser?.id) {
        setUserId(authUser.id)
      } else {
        router.replace('/register')
      }
    } finally {
      setChecked(true)
    }
  }, [authLoading, authUser?.id, router])

  if (!checked || !userId) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f1ff] px-4 pt-28 pb-16">
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
