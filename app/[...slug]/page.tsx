'use client'

import AppShell from '@/app/AppShell'
import NotFoundPage from '@/legacy-pages/errors/NotFoundPage'

export default function LegacyApplicationRoute() {
  return <AppShell><NotFoundPage /></AppShell>
}
