import AppShell from '@/app/AppShell'
import ServerErrorPage from '@/legacy-pages/errors/ServerErrorPage'

export default function ServerErrorRoute() {
  return <AppShell><ServerErrorPage /></AppShell>
}
