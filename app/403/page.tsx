import AppShell from '@/app/AppShell'
import ForbiddenPage from '@/legacy-pages/errors/ForbiddenPage'

export default function ForbiddenRoute() {
  return <AppShell><ForbiddenPage /></AppShell>
}
