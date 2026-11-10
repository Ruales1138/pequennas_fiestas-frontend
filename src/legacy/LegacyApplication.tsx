'use client'

import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { AuthProvider } from '@/context/AuthContext'

export default function LegacyApplication() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
}
