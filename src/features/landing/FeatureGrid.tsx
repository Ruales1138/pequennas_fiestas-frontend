'use client'

import Link from 'next/link'

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-8 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Estándar Profesional
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#12131a] md:text-4xl">
            Entretenimiento sin intermediarios.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          Conectamos directamente a organizadores de eventos con artistas verificados bajo acuerdos transparentes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Card 1 */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#e9e5ff] p-9 md:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest text-indigo-900/60">01</span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-indigo-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold tracking-tight text-[#12131a]">
              Profesionalización del Sector
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              GigaShow dignifica la industria del espectáculo. Formalizamos las condiciones de trabajo para artistas de talla baja, asegurando pagos justos, contratos claros y respeto absoluto en cada presentación.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#4c1d95] p-9 text-white md:col-span-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest text-purple-200/70">02</span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Ética y Transparencia
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/90">
              Eliminamos comisiones ocultas e intermediarios informales. Cada artista define su tarifa base y condiciones técnicas directamente en su perfil.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-9 md:col-span-5">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-slate-400">03</span>
            <h3 className="mt-6 text-xl font-bold tracking-tight text-[#12131a]">
              Asesoría para Eventos
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Nuestro equipo te orienta para elegir el show ideal e integrarlo de forma creativa y memorable en tu celebración o evento corporativo.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#12131a]/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#12131a] transition hover:border-indigo-600 hover:text-indigo-600"
            >
              Contactar consultor
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col justify-between gap-8 rounded-3xl border border-slate-200/80 bg-white p-9 md:col-span-7 md:flex-row md:items-center">
          <div className="flex-1">
            <span className="font-mono text-xs font-bold tracking-widest text-slate-400">04</span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#12131a]">
              Contratación Blindada
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tu reserva queda registrada con fecha, ubicación, horas pactadas y tarifa acordada. Seguridad y respaldo documental de principio a fin.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e9e5ff] text-[#4c1d95]">
            <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
