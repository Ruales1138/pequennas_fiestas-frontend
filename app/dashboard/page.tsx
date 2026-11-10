import AppShell from '@/app/AppShell'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { DashboardPage } from '@/legacy-pages/DashboardPage'

export default function DashboardRoute() {
  return <AppShell><ProtectedRoute roles={['artista']}><DashboardPage /></ProtectedRoute></AppShell>
}
