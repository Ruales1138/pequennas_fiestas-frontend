'use client'

import dynamic from 'next/dynamic'

const LegacyApplication = dynamic(() => import('@/legacy/LegacyApplication'), {
  ssr: false,
  loading: () => <main className="min-h-screen bg-[#fbf8ff]" aria-busy="true" />,
})

export default function LegacyApplicationRoute() {
  return <LegacyApplication />
}
