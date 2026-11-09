import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/apiClient'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

type AdminResource = {
  id: string
  name?: string
  title?: string
  email?: string
  role?: string
}

type AdminResponse = {
  data?: AdminResource[]
}

type ResourceSummaryProps = {
  title: string
  items: AdminResource[]
  label: string
}

function ResourceSummary({ title, items, label }: ResourceSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No hay {label} registrados.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {items.slice(0, 5).map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="truncate text-slate-700">
                {item.name || item.title || item.email || item.id}
              </span>
              {item.role && <span className="text-xs text-slate-400">{item.role}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function AdminPage() {
  const [resources, setResources] = useState<{ users: AdminResource[]; artists: AdminResource[]; bookings: AdminResource[] }>({
    users: [],
    artists: [],
    bookings: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadAdminResources() {
      try {
        const [usersPayload, artistsPayload, bookingsPayload] = await Promise.all([
          apiRequest<AdminResponse>('/api/admin/users'),
          apiRequest<AdminResponse>('/api/admin/artists'),
          apiRequest<AdminResponse>('/api/admin/bookings'),
        ])

        if (active) {
          setResources({
            users: usersPayload?.data ?? [],
            artists: artistsPayload?.data ?? [],
            bookings: bookingsPayload?.data ?? [],
          })
        }
      } catch (requestError) {
        if (active) {
          const message = requestError instanceof Error ? requestError.message : 'No se pudo cargar la información administrativa.'
          setError(message)
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    void loadAdminResources()

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#fbf8ff] px-6 pb-16 pt-28 text-[#2e3145]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="mb-2 inline-block rounded bg-indigo-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-700">
            Administración
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">Panel de administración</h1>
          <p className="mt-2 text-slate-600">
            Consulta los usuarios y recursos registrados en la plataforma.
          </p>
        </div>

        {isLoading && <LoadingSpinner message="Cargando información administrativa…" fullPage={false} />}
        {error && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        {!isLoading && !error && (
          <div className="grid gap-6 md:grid-cols-3">
            <ResourceSummary title="Usuarios" items={resources.users} label="usuarios" />
            <ResourceSummary title="Artistas" items={resources.artists} label="artistas" />
            <ResourceSummary title="Reservas" items={resources.bookings} label="reservas" />
          </div>
        )}
      </div>
    </main>
  )
}
