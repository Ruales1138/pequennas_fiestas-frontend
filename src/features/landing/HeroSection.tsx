'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/catalog')
  }

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-[#f4f1ff] pt-28 pb-16 flex items-center justify-center">
      {/* Left soft organic mesh orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/4 h-[420px] w-[420px] -translate-y-1/4 rounded-full bg-gradient-to-tr from-[#a855f7]/45 via-[#6366f1]/30 to-[#fde68a]/35 blur-[85px]"
      />

      {/* Top-right subtle sky/indigo glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-16 h-[320px] w-[320px] rounded-full bg-gradient-to-bl from-[#818cf8]/35 via-[#c4b5fd]/30 to-transparent blur-[75px]"
      />

      {/* Bottom-right vibrant mesh orb (matching reference layout with brand colors) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-[480px] w-[520px] rounded-full bg-gradient-to-tl from-[#4f46e5]/65 via-[#9333ea]/55 to-[#ec4899]/40 blur-[90px]"
      />

      {/* Geometric minimalist radial burst ornament (bottom-right, like reference image) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute bottom-10 right-10 hidden h-36 w-36 text-[#181824]/80 dark:text-indigo-300/60 md:block lg:bottom-14 lg:right-20 lg:h-44 lg:w-44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 8 minimal geometric chevrons arranged radially */}
        <polyline points="88,18 100,62 112,18" />
        <polyline points="88,182 100,138 112,182" />
        <polyline points="18,88 62,100 18,112" />
        <polyline points="182,88 138,100 182,112" />
        <polyline points="34,50 72,74 50,34" />
        <polyline points="166,50 128,74 150,34" />
        <polyline points="34,150 72,126 50,166" />
        <polyline points="166,150 128,126 150,166" />
      </svg>

      {/* Main centered editorial content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight text-[#12131a] sm:text-7xl md:text-[5.5rem] leading-none">
          GigaShow.
        </h1>

        <p className="mt-5 text-xl font-semibold tracking-tight text-[#1e1b4b] sm:text-2xl">
          Talento gigante en formato compacto.
        </p>

        <p className="mt-4 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
          La primera plataforma profesional de contratación de artistas de talla baja y espectáculos en vivo.
          Entretenimiento ético, directo y de alto impacto para eventos corporativos, fiestas y producciones.
        </p>

        {/* Pill Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-9 flex w-full max-w-md items-center rounded-full border border-[#12131a]/45 bg-white/60 px-5 py-2.5 backdrop-blur-md transition focus-within:border-indigo-600 focus-within:bg-white/90 dark:border-indigo-400/50 dark:bg-[#17122b]/90 dark:focus-within:border-indigo-400 dark:focus-within:bg-[#1c1636]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar comedia, DJ, magia, música..."
            className="hero-search-input w-full border-0 bg-transparent text-sm text-[#12131a] placeholder:text-slate-500 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Buscar artistas"
            className="ml-2 flex h-7 w-7 items-center justify-center text-[#12131a] transition hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </form>

        {/* Dual Pill Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="rounded-full bg-[#5b21b6] px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-purple-900/20 transition hover:bg-[#4c1d95]"
          >
            Explorar
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-[#5b21b6]/50 bg-transparent px-8 py-3 text-xs font-medium tracking-[0.08em] text-[#4c1d95] transition hover:border-[#5b21b6] hover:bg-[#5b21b6]/5"
          >
            ver más
          </Link>
        </div>

        {/* Minimal scroll mouse indicator */}
        <div className="mt-14 flex flex-col items-center opacity-50">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[#5b21b6] p-1">
            <span className="h-1.5 w-1 rounded-full bg-[#5b21b6]" />
          </div>
        </div>
      </div>
    </section>
  )
}
