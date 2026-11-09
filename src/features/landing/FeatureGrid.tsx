export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-secondary/80 p-10 md:col-span-8">
          <div className="relative z-10">
            <h3 className="mb-4 text-3xl font-bold tracking-tight">Profesionalización del Sector</h3>
            <p className="max-w-md leading-relaxed text-secondary-foreground">
              GigaShow nace para dignificar la industria del entretenimiento. Nos enfocamos en profesionalizar las condiciones de trabajo para artistas de talla baja, asegurando pagos justos, contratos claros y un entorno de respeto absoluto.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end rounded-2xl bg-primary p-10 text-on-primary md:col-span-4">
          <span className="mb-6 text-4xl text-primary-foreground material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            handshake
          </span>
          <h3 className="mb-2 text-2xl font-bold text-primary-foreground">Ética y Transparencia</h3>
          <p className="text-sm leading-relaxed text-primary-foreground">
            Eliminamos intermediarios informales. Garantizamos que cada artista reciba una remuneración competitiva y condiciones profesionales de producción.
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-highest p-10 md:col-span-4">
          <h3 className="mb-4 text-xl font-bold">Asesoría para Eventos</h3>
          <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
            Nuestro equipo te ayuda a integrar artistas de talla baja de forma creativa y respetuosa en tus campañas o celebraciones.
          </p>
          <a className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline" href="#">
            Contactar consultor <span className="material-symbols-outlined text-xs">arrow_outward</span>
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-outline-variant/10 bg-white p-10 shadow-sm md:col-span-8 md:flex-row md:items-center">
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold">Contratación Blindada</h3>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Tus pagos están protegidos hasta que el show finalice. Gestión documental y seguros incluidos para tranquilidad de ambas partes.
            </p>
          </div>
          <div className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-[#C3C0FF]">
            <span className="text-4xl text-primary material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
