'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('gigashow_theme')
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : Boolean(prefersDark)
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    window.localStorage.setItem('gigashow_theme', nextDark ? 'dark' : 'light')
  }

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
    router.push('/')
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/85 dark:shadow-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" onClick={closeMenu} className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
            GigaShow
          </Link>

          <div className="hidden items-center gap-x-6 md:flex">
            {user?.role === 'admin' ? (
              <Link href="/admin" className="font-sans font-semibold tracking-tight text-indigo-600 transition-colors duration-200 antialiased dark:text-indigo-400">
                Administración
              </Link>
            ) : user?.role === 'artista' ? (
              <Link href="/dashboard" className="font-sans font-semibold tracking-tight text-indigo-600 transition-colors duration-200 antialiased dark:text-indigo-400">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/catalog" className="font-sans font-semibold tracking-tight text-indigo-600 transition-colors duration-200 antialiased dark:text-indigo-400">
                  Artistas
                </Link>
                {user && (
                  <Link href="/dashboard" className="font-sans font-semibold tracking-tight text-[#5b21b6] transition-colors duration-200 hover:text-indigo-600 antialiased dark:text-indigo-300">
                    Mis reservas
                  </Link>
                )}
              </>
            )}
            <Link href="/about" className="font-sans tracking-tight text-slate-600 transition-colors duration-200 hover:text-indigo-600 antialiased dark:text-slate-400">
              Sobre nosotros
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
            className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-semibold text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-indigo-500/60 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <>
                <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Claro</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Oscuro</span>
              </>
            )}
          </button>

          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name ?? 'Usuario'}
                    className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <Link
                href={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300"
              >
                {user.name || 'Mi panel'}
              </Link>
              <Button type="button" variant="destructive" onClick={handleSignOut} className="h-9 px-3 text-sm">
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" className="px-3 py-2 text-sm">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild className="px-3 py-2 text-sm">
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {isDark ? (
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-6 shadow-lg md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4">
            {user?.role === 'admin' ? (
              <Link href="/admin" onClick={closeMenu} className="text-lg font-semibold text-indigo-600">
                Administración
              </Link>
            ) : user?.role === 'artista' ? (
              <Link href="/dashboard" onClick={closeMenu} className="text-lg font-semibold text-indigo-600">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/catalog" onClick={closeMenu} className="text-lg font-semibold text-indigo-600">
                  Artistas
                </Link>
                {user && (
                  <Link href="/dashboard" onClick={closeMenu} className="text-lg font-semibold text-[#5b21b6]">
                    Mis reservas
                  </Link>
                )}
              </>
            )}
            <Link href="/about" onClick={closeMenu} className="text-lg font-medium text-slate-600">
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
                      alt={user.name ?? 'Usuario'}
                      className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {user.name || 'Mi cuenta'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{user.role}</span>
                  </div>
                </div>
                <Button type="button" variant="destructive" onClick={handleSignOut} className="w-full">
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={closeMenu} className="rounded-md border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700">
                  Iniciar sesión
                </Link>
                <Link href="/register" onClick={closeMenu} className="rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
