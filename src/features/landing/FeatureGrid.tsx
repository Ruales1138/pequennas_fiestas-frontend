'use client'

import Link from 'next/link'

const features = [
  {
    title: 'Profesionalización del Sector',
    description:
      'GigaShow nace para dignificar la industria del entretenimiento. Nos enfocamos en profesionalizar las condiciones de trabajo para artistas de talla baja, asegurando pagos justos, contratos claros y un entorno de respeto absoluto.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    span: 'md:col-span-8',
    bg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
  },
  {
    title: 'Ética y Transparencia',
    description:
      'Eliminamos intermediarios informales. Garantizamos que cada artista reciba una remuneración competitiva y condiciones profesionales de producción.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
      </svg>
    ),
    span: 'md:col-span-4',
    bg: 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white',
  },
  {
    title: 'Asesoría para Eventos',
    description:
      'Nuestro equipo te ayuda a integrar artistas de talla baja de forma creativa y respetuosa en tus campañas o celebraciones.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    span: 'md:col-span-4',
    bg: 'bg-white shadow-sm border border-slate-100',
    link: { text: 'Contactar consultor', href: '/contact' },
  },
  {
    title: 'Contratación Blindada',
    description:
      'Tus pagos están protegidos hasta que el show finalice. Gestión documental y seguros incluidos para tranquilidad de ambas partes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    span: 'md:col-span-8',
    bg: 'bg-white shadow-sm border border-slate-100',
  },
]

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          ¿Por qué elegir <span className="text-indigo-600">GigaShow</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Somos la plataforma que profesionaliza y dignifica el entretenimiento artístico.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10 ${feature.span} ${feature.bg}`}
          >
            <div className="relative z-10">
              <div className={`mb-5 inline-flex items-center justify-center rounded-xl p-3 ${
                feature.bg.includes('indigo-600') ? 'bg-white/15' : 'bg-indigo-100 text-indigo-600'
              }`}>
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-tight md:text-2xl">{feature.title}</h3>
              <p className={`max-w-lg text-sm leading-relaxed md:text-base ${
                feature.bg.includes('indigo-600') ? 'text-indigo-100' : 'text-slate-600'
              }`}>
                {feature.description}
              </p>
              {feature.link && (
                <Link
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
                  href={feature.link.href}
                >
                  {feature.link.text}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
