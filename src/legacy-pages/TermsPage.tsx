export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ff] pb-16 pt-28 antialiased">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[#2e3145] md:text-4xl">
            Términos y Condiciones
          </h1>
          <p className="mb-8 text-sm text-slate-500">Última actualización: 26 de Mayo, 2026</p>

          <article className="prose prose-slate max-w-none text-slate-600">
            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">1. Aceptación de los Términos</h2>
            <p className="mb-4 leading-relaxed">
              Al acceder y utilizar Pequeñas Fiestas, usted acepta estar legalmente sujeto a estos Términos y Condiciones. Si no
              está de acuerdo con alguno de estos términos, por favor no utilice nuestra plataforma.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">2. Descripción del Servicio</h2>
            <p className="mb-4 leading-relaxed">
              Pequeñas Fiestas es una plataforma intermediaria que facilita la conexión entre clientes y artistas profesionales para
              eventos. No somos una agencia de representación ni empleadores de los artistas registrados en nuestra
              plataforma.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">3. Responsabilidades de los Usuarios</h2>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Clientes:</strong> Se comprometen a brindar información veraz sobre el evento, asegurar un entorno
                seguro y realizar los pagos acordados mediante la plataforma.
              </li>
              <li>
                <strong>Artistas:</strong> Deben mantener su perfil actualizado, cumplir con las contrataciones acordadas y
                mantener un estándar profesional en todo momento.
              </li>
            </ul>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">4. Pagos y Cancelaciones</h2>
            <p className="mb-4 leading-relaxed">
              Todos los pagos son procesados a través de nuestra pasarela de pagos segura. Las cancelaciones deben
              realizarse con al menos 48 horas de anticipación al evento. Las cancelaciones tardías están sujetas a
              penalizaciones que se detallan al momento de confirmar la reserva.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">5. Propiedad Intelectual</h2>
            <p className="mb-4 leading-relaxed">
              Todo el contenido de la plataforma (logotipos, textos, gráficos, código) es propiedad exclusiva de Pequeñas Fiestas.
              El material subido por los artistas (fotos, descripciones) es propiedad de ellos, otorgando a Pequeñas Fiestas una
              licencia para mostrarlos.
            </p>
          </article>
        </div>
      </div>
    </main>
  )
}
