export default function FeatureGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 bg-secondary/80 p-10 rounded-2xl flex flex-col justify-between overflow-hidden relative group">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold tracking-tight mb-4">
                            Profesionalización del Sector
                        </h3>
                        <p className="text-secondary-foreground max-w-md leading-relaxed">
                            GigaShow nace para dignificar la industria del entretenimiento. Nos enfocamos en profesionalizar las condiciones de trabajo para artistas de talla baja, asegurando pagos justos, contratos claros y un entorno de respeto absoluto.
                        </p>
                    </div>
                </div>
                <div className="md:col-span-4 bg-primary p-10 rounded-2xl text-on-primary flex flex-col justify-end">
                    <span className="text-primary-foreground material-symbols-outlined text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
                        handshake
                    </span>
                    <h3 className="text-primary-foreground text-2xl font-bold mb-2">Ética y Transparencia</h3>
                    <p className="text-primary-foreground text-sm leading-relaxed">
                        Eliminamos intermediarios informales. Garantizamos que cada artista reciba una remuneración competitiva y condiciones profesionales de producción.
                    </p>
                </div>
                <div className="md:col-span-4 bg-surface-container-highest p-10 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Asesoría para Eventos</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        Nuestro equipo te ayuda a integrar artistas de talla baja de forma creativa y respetuosa en tus campañas o celebraciones.
                    </p>
                    <a className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:underline" href="#">
                        Contactar consultor <span className="material-symbols-outlined text-xs">arrow_outward</span>
                    </a>
                </div>
                <div className="md:col-span-8 bg-white p-10 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">Contratación Blindada</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            Tus pagos están protegidos hasta que el show finalice. Gestión documental y seguros incluidos para tranquilidad de ambas partes.
                        </p>
                    </div>
                    <div className="flex-none w-24 h-24 bg-[#C3C0FF] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                            verified_user
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}