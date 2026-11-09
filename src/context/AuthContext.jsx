import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authClient.getSession().then((session) => {
            setUser(session?.user || null)
            setIsLoading(false)
        })

        const handleUnauthorized = () => {
            setUser(null)
            navigate('/login', { replace: true })
        }
        window.addEventListener('gigashow:unauthorized', handleUnauthorized)
        return () => window.removeEventListener('gigashow:unauthorized', handleUnauthorized)
    }, [])

    const signOut = async () => {
        await authClient.signOut()
        setUser(null)
    }
    return (
    <AuthContext.Provider value={{ user, isLoading, signOut, setUser }}>
            {children}
    </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return context
}