'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '50+', label: 'Artistas Verificados' },
  { value: '200+', label: 'Eventos Realizados' },
  { value: '4.9★', label: 'Calificación Promedio' },
  { value: '100%', label: 'Satisfacción' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.3),transparent_50%)]" />

      {/* Floating decorative circles */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-36 text-center md:pb-32 md:pt-44">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Plataforma #1 en entretenimiento profesional
        </div>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl">
          Haz de tu Evento algo{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Inolvidable
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-indigo-100 md:text-xl">
          Conectamos tu evento con los mejores artistas profesionales.
          Entretenimiento único, seguro y de alto impacto para fiestas, eventos corporativos y producciones.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild className="h-auto rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl">
            <Link href="/catalog" className="flex items-center gap-2">
              Explorar Artistas
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </Button>

          <Button asChild variant="ghost" className="h-auto rounded-xl border border-white/25 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
            <Link href="/about">Saber más</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm">
              <span className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{stat.value}</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-indigo-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50C360 100 720 0 1080 50C1260 75 1380 62 1440 50V100H0V50Z" fill="#fbf8ff" />
        </svg>
      </div>
    </section>
  )
}
