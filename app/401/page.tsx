import AppShell from '@/app/AppShell'
import UnauthorizedPage from '@/legacy-pages/errors/UnauthorizedPage'

export default function UnauthorizedRoute() {
  return <AppShell><UnauthorizedPage /></AppShell>
}
