export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ff] pb-16 pt-24 antialiased">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#2e3145] md:text-5xl">
            Sobre <span className="text-indigo-600">Nosotros</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            GigaShow es la primera plataforma diseñada para profesionalizar y dignificar la industria del entretenimiento,
            conectando talento excepcional con eventos inolvidables de forma ética, segura y transparente.
          </p>
        </div>

        <div className="mb-20 grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1540039155733-d7696d81998e?q=80&w=2070&auto=format&fit=crop"
              alt="Equipo trabajando en un evento"
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#2e3145]">Nuestra Misión</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Nacimos con el objetivo de eliminar la informalidad en la contratación de artistas. Creemos en un ecosistema
              donde el talento se valora, se respeta y se remunera de manera justa.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Proporcionamos herramientas tecnológicas para que los artistas gestionen sus carreras como verdaderos
              profesionales, y para que los clientes encuentren entretenimiento garantizado con procesos transparentes y
              seguros.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#2e3145]">Nuestros Valores</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#2e3145]">Transparencia</h3>
              <p className="text-sm text-slate-500">Cuentas claras y procesos honestos en cada contratación.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#2e3145]">Respeto Mutuo</h3>
              <p className="text-sm text-slate-500">Fomentamos un ambiente digno tanto para el cliente como para el artista.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#2e3145]">Innovación</h3>
              <p className="text-sm text-slate-500">Soluciones tecnológicas que transforman la industria del entretenimiento.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
