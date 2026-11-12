'use client'

import AppShell from '@/app/AppShell'
import NotFoundPage from '@/legacy-pages/errors/NotFoundPage'

export default function GlobalNotFound() {
  return (
    <AppShell>
      <NotFoundPage />
    </AppShell>
  )
}
