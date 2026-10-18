import ArtistProfileForm from "../features/auth/ArtistProfileForm"
import { Navigate, useNavigate } from "react-router-dom"
export function OnboardingPage() {
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('pending_user') || '{}')

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