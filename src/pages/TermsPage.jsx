import React from 'react';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#fbf8ff] pt-28 pb-16 antialiased">
            <div className="mx-auto max-w-4xl px-6">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e3145] mb-4">
                        Términos y Condiciones
                    </h1>
                    <p className="text-sm text-slate-500 mb-8">Última actualización: 26 de Mayo, 2026</p>

                    <article className="prose prose-slate max-w-none text-slate-600">
                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">1. Aceptación de los Términos</h2>
                        <p className="mb-4 leading-relaxed">
                            Al acceder y utilizar GigaShow, usted acepta estar legalmente sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestra plataforma.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">2. Descripción del Servicio</h2>
                        <p className="mb-4 leading-relaxed">
                            GigaShow es una plataforma intermediaria que facilita la conexión entre clientes y artistas profesionales para eventos. No somos una agencia de representación ni empleadores de los artistas registrados en nuestra plataforma.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">3. Responsabilidades de los Usuarios</h2>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Clientes:</strong> Se comprometen a brindar información veraz sobre el evento, asegurar un entorno seguro y realizar los pagos acordados mediante la plataforma.</li>
                            <li><strong>Artistas:</strong> Deben mantener su perfil actualizado, cumplir con las contrataciones acordadas y mantener un estándar profesional en todo momento.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">4. Pagos y Cancelaciones</h2>
                        <p className="mb-4 leading-relaxed">
                            Todos los pagos son procesados a través de nuestra pasarela de pagos segura. Las cancelaciones deben realizarse con al menos 48 horas de anticipación al evento. Las cancelaciones tardías están sujetas a penalizaciones que se detallan al momento de confirmar la reserva.
                        </p>

                        <h2 className="text-xl font-bold text-[#2e3145] mt-8 mb-4">5. Propiedad Intelectual</h2>
                        <p className="mb-4 leading-relaxed">
                            Todo el contenido de la plataforma (logotipos, textos, gráficos, código) es propiedad exclusiva de GigaShow. El material subido por los artistas (fotos, descripciones) es propiedad de ellos, otorgando a GigaShow una licencia para mostrarlos.
                        </p>
                    </article>
                </div>
            </div>
        </main>
    );
}
