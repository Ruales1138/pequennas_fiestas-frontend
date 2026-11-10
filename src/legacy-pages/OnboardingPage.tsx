import { Navigate, useNavigate } from 'react-router-dom'
import ArtistProfileForm from '../features/auth/ArtistProfileForm'

type PendingUser = {
  id?: string
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const rawPendingUser = sessionStorage.getItem('pending_user') ?? '{}'
  const user: PendingUser = JSON.parse(rawPendingUser) as PendingUser

  if (!user?.id) {
    return <Navigate to="/register" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ArtistProfileForm
        userId={user.id}
        onSuccess={() => {
          sessionStorage.removeItem('pending_user')
          navigate('/catalog')
        }}
      />
    </div>
  )
}
