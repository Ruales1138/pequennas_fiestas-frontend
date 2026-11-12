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

  const renderThemeSwitch = () => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`group relative inline-flex h-10 w-[112px] shrink-0 cursor-pointer items-center rounded-full p-1 transition-all duration-300 select-none ${
        isDark
          ? 'border border-slate-600/80 bg-gradient-to-r from-[#3a3347] via-[#1f1a2b] to-[#0b0813] shadow-[inset_0_2px_6px_rgba(0,0,0,0.65),0_3px_10px_rgba(0,0,0,0.35)]'
          : 'border border-slate-200/90 bg-gradient-to-r from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] shadow-[inset_0_2px_5px_rgba(15,23,42,0.06),0_3px_10px_rgba(15,23,42,0.08)]'
      }`}
    >
      {/* Texto modo claro (izquierda, visible cuando NO está en dark mode) */}
      <span
        className={`pointer-events-none flex flex-col items-center justify-center pl-2.5 text-[9px] font-extrabold leading-[1.05] tracking-[0.08em] uppercase transition-opacity duration-200 ${
          isDark ? 'opacity-0' : 'text-slate-400 opacity-100'
        }`}
      >
        <span>LIGHT</span>
        <span>MODE</span>
      </span>

      {/* Texto modo oscuro (derecha, visible cuando SÍ está en dark mode) */}
      <span
        className={`pointer-events-none ml-auto flex flex-col items-center justify-center pr-2.5 text-[9px] font-extrabold leading-[1.05] tracking-[0.08em] uppercase transition-opacity duration-200 ${
          isDark ? 'text-white opacity-100' : 'opacity-0'
        }`}
      >
        <span>DARK</span>
        <span>MODE</span>
      </span>

      {/* Círculo deslizable (izquierda en Dark Mode, derecha en Light Mode, igual a la referencia) */}
      <span
        className={`theme-switch-knob absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all duration-300 ease-out ${
          isDark
            ? 'left-1 shadow-[0_2px_8px_rgba(0,0,0,0.55)]'
            : 'left-[74px] border border-slate-100 shadow-[0_2px_7px_rgba(15,23,42,0.16)]'
        }`}
      >
        {isDark ? (
          /* Icono de Luna + 2 estrellas como en la imagen */
          <svg className="h-5 w-5 text-[#0f172a]" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.5 17.5C10.91 17.5 8 14.59 8 11C8 8.45 9.47 6.24 11.6 5.18C7.86 5.47 5 8.59 5 12.4C5 16.43 8.27 19.7 12.3 19.7C15.27 19.7 17.83 17.92 18.96 15.37C17.68 16.69 16.17 17.5 14.5 17.5Z"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 4.5L16.1 5.9L17.5 6.5L16.1 7.1L15.5 8.5L14.9 7.1L13.5 6.5L14.9 5.9L15.5 4.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path
              d="M19 8.5L19.6 9.9L21 10.5L19.6 11.1L19 12.5L18.4 11.1L17 10.5L18.4 9.9L19 8.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* Icono de Sol minimalista gris como en la imagen */
          <svg className="h-5 w-5 text-[#94a3b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3.6" />
            <line x1="12" y1="3" x2="12" y2="5.5" />
            <line x1="12" y1="18.5" x2="12" y2="21" />
            <line x1="3" y1="12" x2="5.5" y2="12" />
            <line x1="18.5" y1="12" x2="21" y2="12" />
            <line x1="5.64" y1="5.64" x2="7.4" y2="7.4" />
            <line x1="16.6" y1="16.6" x2="18.36" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="16.6" y2="7.4" />
            <line x1="7.4" y1="16.6" x2="5.64" y2="18.36" />
          </svg>
        )}
      </span>
    </button>
  )

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/85 dark:shadow-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" onClick={closeMenu} className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
            Pequeñas Fiestas
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

        <div className="hidden items-center gap-4 md:flex">
          {renderThemeSwitch()}

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
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild className="rounded-lg bg-[#5b21b6] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4c1d95] dark:bg-[#7c3aed] dark:text-white dark:hover:bg-[#6d28d9]">
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          {renderThemeSwitch()}

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
