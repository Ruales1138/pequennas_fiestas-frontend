import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1ff] pb-24 pt-32 antialiased">
      {/* Subtle ambient mesh orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-gradient-to-tr from-[#a855f7]/25 via-[#6366f1]/20 to-transparent blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-gradient-to-tl from-[#4f46e5]/30 via-[#9333ea]/25 to-transparent blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Editorial header */}
        <div className="mb-16 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5b21b6]">
            Nuestra Historia
          </span>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-[#12131a] sm:text-6xl">
            Sobre Nosotros.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            GigaShow es la primera plataforma diseñada para profesionalizar y dignificar la industria del entretenimiento,
            conectando talento excepcional con eventos inolvidables de forma ética, segura y transparente.
          </p>
        </div>

        {/* Mission split section with verified image */}
        <div className="mb-20 grid items-center gap-10 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#12131a] shadow-xl lg:col-span-7">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"
              alt="Producción profesional de espectáculo en vivo"
              className="h-[380px] w-full object-cover sm:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12131a]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Producción en vivo</p>
                <p className="mt-1 text-lg font-bold">Experiencias memorables en toda Colombia</p>
              </div>
              <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
                100% Verificado
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm sm:p-10 lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-[#5b21b6]">MISIÓN</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#12131a]">
                Talento respetado y contrataciones claras.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Nacimos con el propósito de eliminar la informalidad en la contratación de artistas. Creemos en un ecosistema
                donde cada show se valora, se respeta y se remunera de manera justa.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Brindamos herramientas digitales para que los artistas gestionen su agenda y tarifas como verdaderos
                profesionales, y para que los clientes contraten con total respaldo.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              <Link
                href="/catalog"
                className="rounded-full bg-[#5b21b6] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#4c1d95]"
              >
                Ver artistas
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#5b21b6]/40 px-6 py-2.5 text-xs font-semibold text-[#4c1d95] transition hover:bg-[#5b21b6]/5"
              >
                Hablar con asesor
              </Link>
            </div>
          </div>
        </div>

        {/* Values bento */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-[#e9e5ff] p-8">
            <span className="font-mono text-xs font-bold text-[#4c1d95]">01 / TRANSPARENCIA</span>
            <h3 className="mt-4 text-2xl font-bold text-[#12131a]">Cuentas claras</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Tarifas públicas por hora, disponibilidad directa y acuerdos sin letra pequeña en cada reserva.
            </p>
          </div>

          <div className="rounded-3xl bg-[#4c1d95] p-8 text-white">
            <span className="font-mono text-xs font-bold text-purple-200">02 / DIGNIDAD</span>
            <h3 className="mt-4 text-2xl font-bold">Respeto mutuo</h3>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/90">
              Promovemos un entorno profesional y seguro tanto para el artista en escena como para el organizador del evento.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-8">
            <span className="font-mono text-xs font-bold text-slate-400">03 / IMPACTO</span>
            <h3 className="mt-4 text-2xl font-bold text-[#12131a]">Shows únicos</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Desde comedia stand-up y magia hasta DJs, animación y acrobacia escénica de primer nivel.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
