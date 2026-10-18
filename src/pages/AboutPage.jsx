import React from 'react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#fbf8ff] pt-24 pb-16 antialiased">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e3145] mb-6">
                        Sobre <span className="text-indigo-600">Nosotros</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        GigaShow es la primera plataforma diseñada para profesionalizar y dignificar la industria del entretenimiento, conectando talento excepcional con eventos inolvidables de forma ética, segura y transparente.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="rounded-3xl overflow-hidden shadow-xl">
                        <img 
                            src="https://images.unsplash.com/photo-1540039155733-d7696d81998e?q=80&w=2070&auto=format&fit=crop" 
                            alt="Equipo trabajando en un evento" 
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-[#2e3145]">Nuestra Misión</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Nacimos con el objetivo de eliminar la informalidad en la contratación de artistas. Creemos en un ecosistema donde el talento se valora, se respeta y se remunera de manera justa.
                        </p>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Proporcionamos herramientas tecnológicas para que los artistas gestionen sus carreras como verdaderos profesionales, y para que los clientes encuentren entretenimiento garantizado con procesos transparentes y seguros.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-center text-[#2e3145] mb-10">Nuestros Valores</h2>
                    <div className="grid sm:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#2e3145] mb-2">Transparencia</h3>
                            <p className="text-sm text-slate-500">Cuentas claras y procesos honestos en cada contratación.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#2e3145] mb-2">Respeto Mutuo</h3>
                            <p className="text-sm text-slate-500">Fomentamos un ambiente digno tanto para el cliente como para el artista.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#2e3145] mb-2">Innovación</h3>
                            <p className="text-sm text-slate-500">Soluciones tecnológicas que transforman la industria del entretenimiento.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
