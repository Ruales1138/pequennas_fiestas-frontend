'use client'

import '@/App.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { AuthProvider } from '@/context/AuthContext'
import type { ReactNode } from 'react'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </AuthProvider>
  )
}
