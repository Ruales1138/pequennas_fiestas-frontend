'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [status, setStatus] = useState<'sending' | 'success' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')

    setTimeout(() => {
      form?.reset()
      setStatus('success')
    }, 800)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1ff] pb-20 pt-32 antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-gradient-to-bl from-[#a855f7]/25 via-[#6366f1]/20 to-transparent blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5b21b6]">
            Asesoría Directa
          </span>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-[#12131a]">
            Contacto.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            ¿Necesitas orientación para integrar el show ideal en tu evento corporativo o celebración privada? Nuestro equipo de consultores te acompaña en todo el proceso.
          </p>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="space-y-6 md:col-span-5">
            <div className="rounded-3xl bg-[#e9e5ff] p-7">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#4c1d95]">
                01 / CORREO
              </span>
              <h3 className="mt-3 text-xl font-bold text-[#12131a]">Atención personalizada</h3>
              <p className="mt-1 text-sm text-slate-600">Tiempo de respuesta menor a 24 horas hábiles.</p>
              <a
                href="mailto:soporte@gigashow.com"
                className="mt-4 inline-block text-sm font-bold text-[#5b21b6] underline underline-offset-4"
              >
                soporte@gigashow.com
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                02 / TELÉFONO & WHATSAPP
              </span>
              <h3 className="mt-3 text-xl font-bold text-[#12131a]">Línea de eventos</h3>
              <p className="mt-1 text-sm text-slate-600">Lunes a Sábado, 8:00 am – 7:00 pm (COT)</p>
              <p className="mt-4 text-base font-bold text-[#12131a]">+57 300 123 4567</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10 md:col-span-7">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#12131a]">
              Solicitar asesoría
            </h2>

            {status === 'success' ? (
              <div className="rounded-2xl bg-[#e9e5ff]/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5b21b6] text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-[#12131a]">¡Solicitud enviada con éxito!</p>
                <p className="mt-2 text-sm text-slate-600">
                  Un consultor de Pequeñas Fiestas se pondrá en contacto contigo muy pronto.
                </p>
                <Button
                  type="button"
                  onClick={() => setStatus(null)}
                  className="mt-6 rounded-full bg-[#5b21b6] px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#4c1d95]"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Ej. Ana García"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-[#12131a] placeholder:text-slate-400 focus:border-[#5b21b6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-[#12131a] placeholder:text-slate-400 focus:border-[#5b21b6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Tipo de evento / Asunto
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    placeholder="Ej. Evento corporativo de fin de año"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-[#12131a] placeholder:text-slate-400 focus:border-[#5b21b6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Cuéntanos fecha tentativa, ciudad y qué tipo de show buscas..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-[#12131a] placeholder:text-slate-400 focus:border-[#5b21b6] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-full bg-[#5b21b6] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-purple-900/15 transition hover:bg-[#4c1d95] disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
