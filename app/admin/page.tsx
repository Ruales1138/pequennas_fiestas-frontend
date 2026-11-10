import AppShell from '@/app/AppShell'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import AdminPage from '@/legacy-pages/AdminPage'

export default function AdminRoute() {
  return <AppShell><ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute></AppShell>
}
