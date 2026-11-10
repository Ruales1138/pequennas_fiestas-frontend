import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'GigaShow',
  description: 'Plataforma profesional de contratación de artistas.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
