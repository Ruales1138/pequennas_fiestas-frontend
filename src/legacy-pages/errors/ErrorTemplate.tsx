import type { ReactNode } from 'react'
import Link from 'next/link'

interface ErrorTemplateProps {
  code: string
  title: string
  description: string
  children?: ReactNode
}

export default function ErrorTemplate({ code, title, description, children }: ErrorTemplateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf8ff] px-6 py-24 antialiased">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="select-none text-9xl font-extrabold tracking-tighter text-indigo-100">
            {code}
          </h1>
          <div className="pointer-events-none absolute inset-0 -mt-32 flex items-center justify-center">
            <span className="whitespace-nowrap text-4xl font-extrabold tracking-tight text-[#2e3145] sm:text-5xl">
              {title}
            </span>
          </div>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-slate-600">{description}</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {children ?? (
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Volver al inicio
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
