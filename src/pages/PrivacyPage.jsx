import React from 'react';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#fbf8ff] pt-28 pb-16 antialiased">
            <div className="mx-auto max-w-4xl px-6">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e3145] mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-sm text-slate-500 mb-8">Última actualización: 26 de Mayo, 2026</p>

                    <article className="prose prose-slate max-w-none text-slate-600">
                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">1. Información que recopilamos</h2>
                        <p className="mb-4 leading-relaxed">
                            Recopilamos información personal que usted nos proporciona voluntariamente al registrarse en la plataforma, como nombre, dirección de correo electrónico, número de teléfono y datos de facturación. Para los artistas, también recopilamos información sobre su trayectoria, fotografías y tarifas.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">2. Cómo usamos su información</h2>
                        <p className="mb-4 leading-relaxed">
                            Utilizamos su información para:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Facilitar y gestionar las reservas de eventos.</li>
                            <li>Procesar transacciones de pago seguras.</li>
                            <li>Mejorar nuestra plataforma y servicios.</li>
                            <li>Enviar notificaciones relevantes sobre sus contrataciones o cuenta.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">3. Protección de Datos</h2>
                        <p className="mb-4 leading-relaxed">
                            Implementamos medidas de seguridad de nivel industrial para proteger sus datos contra acceso no autorizado, alteración o destrucción. Sus contraseñas son encriptadas y no almacenamos información sensible de tarjetas de crédito en nuestros servidores.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">4. Compartir Información</h2>
                        <p className="mb-4 leading-relaxed">
                            No vendemos su información personal a terceros. Solo compartimos la información estrictamente necesaria entre clientes y artistas para asegurar el éxito del evento, o cuando sea requerido por la ley aplicable.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">5. Sus Derechos</h2>
                        <p className="mb-4 leading-relaxed">
                            Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal en cualquier momento accediendo a la configuración de su cuenta o contactando a nuestro equipo de soporte.
                        </p>
                    </article>
                </div>
            </div>
        </main>
    );
}
