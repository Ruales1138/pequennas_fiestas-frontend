import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [status, setStatus] = useState<'sending' | 'success' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    setTimeout(() => {
      setStatus('success')
      event.currentTarget.reset()
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#fbf8ff] pb-16 pt-28 antialiased">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#2e3145] md:text-5xl">
            Ponte en <span className="text-indigo-600">Contacto</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            ¿Tienes dudas sobre cómo funciona GigaShow? ¿Eres artista y necesitas ayuda con tu perfil? Estamos aquí para
            ayudarte.
          </p>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2e3145]">Correo Electrónico</h3>
                <p className="mt-1 text-slate-500">Te responderemos en menos de 24 horas.</p>
                <a href="mailto:soporte@gigashow.com" className="mt-2 inline-block font-semibold text-indigo-600">
                  soporte@gigashow.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2e3145]">Línea Telefónica</h3>
                <p className="mt-1 text-slate-500">Lunes a Viernes, 9am - 6pm (COT)</p>
                <p className="mt-2 font-semibold text-[#2e3145]">+57 300 123 4567</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#2e3145]">Envíanos un mensaje</h2>

            {status === 'success' ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-800">
                <p className="mb-1 font-bold">¡Mensaje enviado!</p>
                <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
                <Button onClick={() => setStatus(null)} variant="outline" className="mt-4">
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Nombre completo
                  </label>
                  <input id="name" required placeholder="Ej. Ana García" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Correo electrónico
                  </label>
                  <input id="email" type="email" required placeholder="tu@email.com" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                    Asunto
                  </label>
                  <input id="subject" required placeholder="¿En qué podemos ayudarte?" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <Button type="submit" disabled={status === 'sending'} className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
