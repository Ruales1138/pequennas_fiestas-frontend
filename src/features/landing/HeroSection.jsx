import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.webp";

export default function HeroSection() {
    return (
        <section className="pt-32 pb-16 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            <h1 className="headline-sm md:text-7xl font-semibold tracking-tighter text-on-surface max-w-5xl leading-[1.1] mb-8">
                Talento <span className="text-primary italic">Gigante</span> en
                Formato Compacto para tu Próximo Evento.
            </h1>
            <p className="body-md text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-12">
                La primera plataforma profesional de contratación de artistas de
                talla baja. Entretenimiento único, profesional y de alto impacto
                para eventos corporativos, fiestas y producciones.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild className="group relative px-10 py-5 h-auto bg-primary text-on-primary font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <Link to="/catalog" className="text-primary-foreground relative z-10 flex items-center gap-2 whitespace-nowrap">
                        <div className="absolute inset-0 bg-linear-to-br from-primary to-primary-dim opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        Explorar Artistas
                        <span className="material-symbols-outlined text-xl">
                            arrow_forward
                        </span>
                    </Link>
                </Button>
                <Button
                    variant="secondary"
                    className="px-10 py-5 h-auto text-on-surface font-semibold rounded-xl transition-colors"
                >
                    Saber más
                </Button>
            </div>
            <div className="mt-24 w-full grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-outline-variant/10">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-on-surface tracking-tighter">
                        100%
                    </span>
                    <span className="label-md text-on-surface-variant uppercase tracking-widest text-[10px] mt-1">
                        Artistas Profesionales
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-on-surface tracking-tighter">
                        Diversión
                    </span>
                    <span className="label-md text-on-surface-variant uppercase tracking-widest text-[10px] mt-1">
                        Garantizada
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-on-surface tracking-tighter">
                        Ético
                    </span>
                    <span className="label-md text-on-surface-variant uppercase tracking-widest text-[10px] mt-1">
                        Trato Profesional
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-on-surface tracking-tighter">
                        Segura
                    </span>
                    <span className="label-md text-on-surface-variant uppercase tracking-widest text-[10px] mt-1">
                        Contratación
                    </span>
                </div>
            </div>

            <div className="mt-16 w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
                <img
                    alt="Professional stage performance with dynamic lighting and talented entertainers"
                    className="w-full h-full object-cover"
                    src={heroImage}
                />
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 p-4 sm:p-6 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
                        <img
                            alt="Portrait of a professional performer"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3uUfoBo5rB2jWK8DICG1PLGWDTb4PNKqm3XGnfLlQm1DxbUkcAvJnZGoinj-UsOYhJXt5u5H5ofa34H92Zzr9NdVU37UAsrjc_lQrEskmaaMlnFoZyE2pYJZIaIeswaSl1igr3HIu3kVKg2m7yjh1i85FIquHhLxKu1tBk6aqvHOCI6SlmiGEGOXTzNkySPaE7vGHeXOEo0mttc5uX6sJJALxhHYtBK_ljUmq1-Wul_OBlxvDHGUFU8nUPPmf_aIp-heAtb0LHIY"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-white font-bold text-sm">
                            Julian R.
                        </p>
                        <p className="text-white/80 text-xs">
                            Animador Profesional • CDMX
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
