'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import heroImage from '@/assets/hero-image.webp'

export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-32 text-center">
      <h1 className="headline-sm mb-8 max-w-5xl text-on-surface text-5xl font-semibold leading-[1.1] tracking-tighter md:text-7xl">
        Talento <span className="text-primary italic">Gigante</span> en Formato Compacto para tu Próximo Evento.
      </h1>
      <p className="body-md mb-12 max-w-3xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
        La primera plataforma profesional de contratación de artistas de talla baja. Entretenimiento único, profesional y de alto impacto para eventos corporativos, fiestas y producciones.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild className="group relative h-auto overflow-hidden rounded-xl bg-primary px-10 py-5 text-on-primary font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <Link href="/catalog" className="relative z-10 flex items-center gap-2 whitespace-nowrap text-primary-foreground">
            <div className="absolute inset-0 bg-linear-to-br from-primary to-primary-dim opacity-0 transition-opacity group-hover:opacity-100" />
            Explorar Artistas
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </Button>

        <Button variant="secondary" className="h-auto rounded-xl px-10 py-5 font-semibold text-on-surface transition-colors">
          Saber más
        </Button>
      </div>

      <div className="mt-24 grid w-full grid-cols-2 gap-8 border-t border-outline-variant/10 py-12 md:grid-cols-4">
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tighter text-on-surface">100%</span>
          <span className="label-md mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Artistas Profesionales</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tighter text-on-surface">Diversión</span>
          <span className="label-md mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Garantizada</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tighter text-on-surface">Ético</span>
          <span className="label-md mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Trato Profesional</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tighter text-on-surface">Segura</span>
          <span className="label-md mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">Contratación</span>
        </div>
      </div>

      <div className="relative mt-16 aspect-video w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl">
        <img alt="Professional stage performance with dynamic lighting and talented entertainers" className="h-full w-full object-cover" src={heroImage} />
        <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl border border-white/30 bg-white/20 p-4 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-8 sm:p-6">
          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/50">
            <img
              alt="Portrait of a professional performer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3uUfoBo5rB2jWK8DICG1PLGWDTb4PNKqm3XGnfLlQm1DxbUkcAvJnZGoinj-UsOYhJXt5u5H5ofa34H92Zzr9NdVU37UAsrjc_lQrEskmaaMlnFoZyE2pYJZIaIeswaSl1igr3HIu3kVKg2m7yjh1i85FIquHhLxKu1tBk6aqvHOCI6SlmiGEGOXTzNkySPaE7vGHeXOEo0mttc5uX6sJJALxhHYtBK_ljUmq1-Wul_OBlxvDHGUFU8nUPPmf_aIp-heAtb0LHIY"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Julian R.</p>
            <p className="text-xs text-white/80">Animador Profesional • CDMX</p>
          </div>
        </div>
      </div>
    </section>
  )
}
