import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            e.target.reset();
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#fbf8ff] pt-28 pb-16 antialiased">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e3145] mb-4">
                        Ponte en <span className="text-indigo-600">Contacto</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        ¿Tienes dudas sobre cómo funciona GigaShow? ¿Eres artista y necesitas ayuda con tu perfil? Estamos aquí para ayudarte.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2e3145] text-lg">Correo Electrónico</h3>
                                <p className="text-slate-500 mt-1">Te responderemos en menos de 24 horas.</p>
                                <a href="mailto:soporte@gigashow.com" className="text-indigo-600 font-semibold mt-2 inline-block">soporte@gigashow.com</a>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2e3145] text-lg">Línea Telefónica</h3>
                                <p className="text-slate-500 mt-1">Lunes a Viernes, 9am - 6pm (COT)</p>
                                <p className="text-[#2e3145] font-semibold mt-2">+57 300 123 4567</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-[#2e3145] mb-6">Envíanos un mensaje</h2>
                        
                        {status === 'success' ? (
                            <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-center">
                                <p className="font-bold mb-1">¡Mensaje enviado!</p>
                                <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
                                <Button onClick={() => setStatus(null)} variant="outline" className="mt-4">Enviar otro mensaje</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nombre completo</label>
                                    <Input id="name" required placeholder="Ej. Ana García" className="bg-slate-50" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">Correo electrónico</label>
                                    <Input id="email" type="email" required placeholder="tu@email.com" className="bg-slate-50" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Asunto</label>
                                    <Input id="subject" required placeholder="¿En qué podemos ayudarte?" className="bg-slate-50" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">Mensaje</label>
                                    <textarea 
                                        id="message" 
                                        required 
                                        rows={4}
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>
                                
                                <Button type="submit" disabled={status === 'sending'} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
