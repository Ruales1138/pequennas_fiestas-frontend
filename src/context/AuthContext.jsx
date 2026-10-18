import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authClient.getSession().then((session) => {
            console.log("session resonde",session)
            setUser(session?.user || null)
            setIsLoading(false)
        })
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