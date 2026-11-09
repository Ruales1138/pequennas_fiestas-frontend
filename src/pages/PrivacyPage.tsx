export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ff] pb-16 pt-28 antialiased">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[#2e3145] md:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mb-8 text-sm text-slate-500">Última actualización: 26 de Mayo, 2026</p>

          <article className="prose prose-slate max-w-none text-slate-600">
            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">1. Información que recopilamos</h2>
            <p className="mb-4 leading-relaxed">
              Recopilamos información personal que usted nos proporciona voluntariamente al registrarse en la plataforma,
              como nombre, dirección de correo electrónico, número de teléfono y datos de facturación. Para los artistas,
              también recopilamos información sobre su trayectoria, fotografías y tarifas.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">2. Cómo usamos su información</h2>
            <p className="mb-4 leading-relaxed">Utilizamos su información para:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>Facilitar y gestionar las reservas de eventos.</li>
              <li>Procesar transacciones de pago seguras.</li>
              <li>Mejorar nuestra plataforma y servicios.</li>
              <li>Enviar notificaciones relevantes sobre sus contrataciones o cuenta.</li>
            </ul>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">3. Protección de Datos</h2>
            <p className="mb-4 leading-relaxed">
              Implementamos medidas de seguridad de nivel industrial para proteger sus datos contra acceso no autorizado,
              alteración o destrucción. Sus contraseñas son encriptadas y no almacenamos información sensible de tarjetas de
              crédito en nuestros servidores.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">4. Compartir Información</h2>
            <p className="mb-4 leading-relaxed">
              No vendemos su información personal a terceros. Solo compartimos la información estrictamente necesaria entre
              clientes y artistas para asegurar el éxito del evento, o cuando sea requerido por la ley aplicable.
            </p>

            <h2 className="mb-4 mt-8 text-xl font-bold text-[#2e3145]">5. Sus Derechos</h2>
            <p className="mb-4 leading-relaxed">
              Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal en
              cualquier momento accediendo a la configuración de su cuenta o contactando a nuestro equipo de soporte.
            </p>
          </article>
        </div>
      </div>
    </main>
  )
}
