import AppShell from '@/app/AppShell'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { OnboardingPage } from '@/legacy-pages/OnboardingPage'

export default function ArtistOnboardingRoute() {
  return <AppShell><ProtectedRoute roles={['artista']}><OnboardingPage /></ProtectedRoute></AppShell>
}
