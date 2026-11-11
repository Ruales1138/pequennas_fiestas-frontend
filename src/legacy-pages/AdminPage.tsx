'use client'

import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAdminResources } from '@/features/admin/useAdminResources'
import type { AdminResource, AdminResourceType } from '@/features/admin/types'

type ResourceSummaryProps = {
  title: string
  resourceType: AdminResourceType
  items: AdminResource[]
  label: string
  actionLoadingId: string | null
  onToggleStatus: (
    resourceType: AdminResourceType,
    id: string,
    nextActive: boolean,
  ) => Promise<void>
}

function ResourceSummary({
  title,
  resourceType,
  items,
  label,
  actionLoadingId,
  onToggleStatus,
}: ResourceSummaryProps) {
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
          {items.map((item) => {
            const isActive = item.isActive ?? true
            const isMutating = actionLoadingId === `${resourceType}:${item.id}`
            const displayLabel = item.name || item.title || item.email || item.id
            const subtitle =
              item.email && item.email !== displayLabel
                ? item.email
                : item.city
                  ? `${item.category ?? ''} · ${item.city}`
                  : null

            return (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800">{displayLabel}</p>
                  {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-2">
                  {item.role && (
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {item.role}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {isActive ? 'Activo' : 'Inactivo'}
                  </span>
                  <button
                    type="button"
                    disabled={isMutating}
                    onClick={() => void onToggleStatus(resourceType, item.id, !isActive)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium transition disabled:opacity-50 ${
                      isActive
                        ? 'border-rose-200 text-rose-700 hover:bg-rose-50'
                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    {isMutating ? '...' : isActive ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default function AdminPage() {
  const { actionLoadingId, error, isLoading, resources, toggleStatus } = useAdminResources()

  return (
    <main className="min-h-screen bg-[#fbf8ff] px-6 pb-16 pt-28 text-[#2e3145]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="mb-2 inline-block rounded bg-indigo-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-700">
            Administración
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">Panel de administración</h1>
          <p className="mt-2 text-slate-600">
            Consulta, audita y gestiona el estado de los usuarios y recursos registrados en la plataforma.
          </p>
        </div>

        {isLoading && (
          <LoadingSpinner message="Cargando información administrativa…" fullPage={false} />
        )}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </div>
        )}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceSummary
              title="Usuarios"
              resourceType="users"
              items={resources.users}
              label="usuarios"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
            />
            <ResourceSummary
              title="Artistas"
              resourceType="artists"
              items={resources.artists}
              label="artistas"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
            />
            <ResourceSummary
              title="Reservas"
              resourceType="bookings"
              items={resources.bookings}
              label="reservas"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
            />
            <ResourceSummary
              title="Calificaciones"
              resourceType="ratings"
              items={resources.ratings}
              label="calificaciones"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
            />
          </div>
        )}
      </div>
    </main>
  )
}
