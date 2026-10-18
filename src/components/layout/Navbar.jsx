import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
    const { user, isLoading, signOut } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        setIsMenuOpen(false)
        navigate('/')
    }

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md dark:bg-slate-950/80 dark:shadow-none">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                
                <div className="flex items-center gap-8">
                    <Link to="/" onClick={closeMenu} className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
                        GigaShow
                    </Link>

                    <div className="hidden items-center gap-x-6 md:flex">
                        {user?.role === 'artista' ? (
                            <Link to="/dashboard" className="font-sans font-semibold tracking-tight text-indigo-600 transition-colors duration-200 antialiased dark:text-indigo-400">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/catalog" className="font-sans font-semibold tracking-tight text-indigo-600 transition-colors duration-200 antialiased dark:text-indigo-400">
                                Artistas
                            </Link>
                        )}
                        <Link to="/about" className="font-sans tracking-tight text-slate-600 transition-colors duration-200 hover:text-indigo-600 antialiased dark:text-slate-400">
                            Sobre nosotros
                        </Link>
                    </div>
                </div>

                <div className="hidden items-center md:flex">
                    {isLoading ? (
                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <Link
                                to={user.role === 'artista' ? '/dashboard' : '/'}
                                className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300"
                            >
                                {user.name || 'Mi panel'}
                            </Link>
                            <Button type="button" variant="destructive" onClick={handleSignOut}>
                                Cerrar sesión
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button asChild variant="ghost">
                                <Link to="/login">Iniciar sesión</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/register">Registrarse</Link>
                            </Button>
                        </div>
                    )}
                </div>

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-4 py-6 shadow-lg md:hidden dark:bg-slate-950 dark:border-slate-800">
                    <div className="flex flex-col gap-4">
                        {user?.role === 'artista' ? (
                            <Link to="/dashboard" onClick={closeMenu} className="text-lg font-semibold text-indigo-600">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/catalog" onClick={closeMenu} className="text-lg font-semibold text-indigo-600">
                                Artistas
                            </Link>
                        )}
                        <Link to="/about" onClick={closeMenu} className="text-lg font-medium text-slate-600">
                            Sobre nosotros
                        </Link>
                        
                        <hr className="my-2 border-slate-100 dark:border-slate-800" />

                        {isLoading ? (
                            <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
                        ) : user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {user.name || 'Mi panel'}
                                        </span>
                                        <Link to={user.role === 'artista' ? '/dashboard' : '/'} onClick={closeMenu} className="text-xs text-slate-500 hover:text-indigo-600">
                                            Ver perfil
                                        </Link>
                                    </div>
                                </div>
                                <Button type="button" variant="destructive" onClick={handleSignOut} className="w-full">
                                    Cerrar sesión
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button asChild variant="outline" className="w-full" onClick={closeMenu}>
                                    <Link to="/login">Iniciar sesión</Link>
                                </Button>
                                <Button asChild className="w-full" onClick={closeMenu}>
                                    <Link to="/register">Registrarse</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}