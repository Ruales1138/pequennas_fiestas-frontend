'use client'

import { useState } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAdminResources } from '@/features/admin/useAdminResources'
import type {
  AdminResource,
  AdminResourceType,
  AdminUpdatePayload,
} from '@/features/admin/types'

type EditingTarget = {
  resourceType: AdminResourceType
  item: AdminResource
}

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
  onEdit: (resourceType: AdminResourceType, item: AdminResource) => void
  onDelete: (resourceType: AdminResourceType, item: AdminResource) => Promise<void>
}

function ResourceSummary({
  title,
  resourceType,
  items,
  label,
  actionLoadingId,
  onToggleStatus,
  onEdit,
  onDelete,
}: ResourceSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-indigo-500/25 dark:bg-[#151128]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700 dark:border dark:border-indigo-400/35 dark:bg-indigo-500/20 dark:text-indigo-200">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No hay {label} registrados.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100 dark:divide-indigo-500/15">
          {items.map((item) => {
            const isActive = item.isActive ?? true
            const isMutating = actionLoadingId === `${resourceType}:${item.id}`
            const displayLabel = item.name || item.title || item.email || item.id
            const subtitle =
              item.email && item.email !== displayLabel
                ? item.email
                : item.city
                  ? `${item.category ?? ''} · ${item.city}`
                  : item.eventLocation
                    ? `${item.eventLocation}${item.agreedPrice ? ` · $${Number(item.agreedPrice).toLocaleString('es-CO')}` : ''}`
                    : null

            return (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900 dark:text-white">{displayLabel}</p>
                  {subtitle && <p className="truncate text-xs text-slate-500 dark:text-slate-300">{subtitle}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {item.role && (
                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:border-indigo-400/35 dark:bg-indigo-500/20 dark:text-indigo-200">
                      {item.role}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:border dark:border-emerald-400/35 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-700 dark:border dark:border-rose-400/35 dark:bg-rose-500/20 dark:text-rose-300'
                    }`}
                  >
                    {isActive ? 'Activo' : 'Inactivo'}
                  </span>

                  <button
                    type="button"
                    disabled={isMutating}
                    onClick={() => onEdit(resourceType, item)}
                    className="rounded-md border border-indigo-200 bg-indigo-50/70 px-2.5 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50 dark:border-indigo-400/45 dark:bg-indigo-500/15 dark:text-indigo-200 dark:hover:bg-indigo-500/30"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    disabled={isMutating}
                    onClick={() => void onToggleStatus(resourceType, item.id, !isActive)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                      isActive
                        ? 'border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-400/45 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/25'
                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400/45 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/25'
                    }`}
                  >
                    {isMutating ? '...' : isActive ? 'Desactivar' : 'Activar'}
                  </button>

                  <button
                    type="button"
                    disabled={isMutating}
                    onClick={() => void onDelete(resourceType, item)}
                    className="rounded-md border border-rose-200 bg-rose-50/70 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50 dark:border-rose-400/45 dark:bg-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500/30"
                  >
                    Eliminar
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

function AdminEditModal({
  target,
  isSaving,
  onClose,
  onSave,
}: {
  target: EditingTarget
  isSaving: boolean
  onClose: () => void
  onSave: (payload: AdminUpdatePayload) => Promise<void>
}) {
  const { resourceType, item } = target
  const [name, setName] = useState(item.name ?? item.title ?? '')
  const [email, setEmail] = useState(item.email ?? '')
  const [role, setRole] = useState(item.role ?? 'cliente')
  const [category, setCategory] = useState(item.category ?? 'General')
  const [city, setCity] = useState(item.city ?? 'Medellín')
  const [baseRate, setBaseRate] = useState(String(item.baseRate ?? 0))
  const [bio, setBio] = useState(item.bio ?? '')
  const [eventLocation, setEventLocation] = useState(item.eventLocation ?? '')
  const [agreedPrice, setAgreedPrice] = useState(String(item.agreedPrice ?? 0))
  const [status, setStatus] = useState(item.status ?? item.role ?? 'pendiente')
  const [rating, setRating] = useState(String(item.rating ?? 5))
  const [comment, setComment] = useState(item.comment ?? item.name ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (resourceType === 'users') {
      await onSave({ name: name.trim(), email: email.trim(), role })
    } else if (resourceType === 'artists') {
      await onSave({
        name: name.trim(),
        category: category.trim(),
        city: city.trim(),
        baseRate: Number(baseRate) || 0,
        bio: bio.trim(),
      })
    } else if (resourceType === 'bookings') {
      await onSave({
        name: name.trim(),
        eventLocation: eventLocation.trim(),
        agreedPrice: Number(agreedPrice) || 0,
        status,
      })
    } else if (resourceType === 'ratings') {
      await onSave({
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: comment.trim(),
      })
    }
  }

  const modalTitle =
    resourceType === 'users'
      ? 'Editar Usuario'
      : resourceType === 'artists'
        ? 'Editar Artista'
        : resourceType === 'bookings'
          ? 'Editar Reserva'
          : 'Editar Calificación'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-indigo-500/30 dark:bg-[#151128]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-indigo-500/20">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{modalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-indigo-500/20 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-5 space-y-4">
          {resourceType === 'users' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Rol del usuario
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="cliente">cliente</option>
                  <option value="artista">artista</option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </>
          )}

          {resourceType === 'artists' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Nombre artístico
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Categoría
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Tarifa por hora (COP)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Biografía
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {resourceType === 'bookings' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Ubicación del evento
                </label>
                <input
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Precio acordado (COP)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={agreedPrice}
                  onChange={(e) => setAgreedPrice(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Estado de la reserva
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="pendiente">pendiente</option>
                  <option value="confirmada">confirmada</option>
                  <option value="aceptada">aceptada</option>
                  <option value="rechazada">rechazada</option>
                  <option value="cancelada">cancelada</option>
                </select>
              </div>
            </>
          )}

          {resourceType === 'ratings' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Puntaje (1 a 5 estrellas)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="5">5 ★ - Excelente</option>
                  <option value="4">4 ★ - Muy bueno</option>
                  <option value="3">3 ★ - Bueno</option>
                  <option value="2">2 ★ - Regular</option>
                  <option value="1">1 ★ - Malo</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Comentario de la reseña
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end gap-2.5 border-t border-slate-100 pt-4 dark:border-indigo-500/20">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-indigo-400/35 dark:text-slate-300 dark:hover:bg-indigo-500/15"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const {
    actionLoadingId,
    error,
    isLoading,
    resources,
    softDelete,
    toggleStatus,
    updateResource,
  } = useAdminResources()

  const [editingTarget, setEditingTarget] = useState<EditingTarget | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')

  const handleDelete = async (resourceType: AdminResourceType, item: AdminResource) => {
    const label = item.name || item.title || item.email || item.id
    if (!window.confirm(`¿Estás seguro de que deseas eliminar "${label}"?`)) {
      return
    }
    await softDelete(resourceType, item.id)
    setFeedbackMessage(`Registro "${label}" eliminado correctamente.`)
    setTimeout(() => setFeedbackMessage(''), 3500)
  }

  const handleSaveEdit = async (payload: AdminUpdatePayload) => {
    if (!editingTarget) return
    await updateResource(editingTarget.resourceType, editingTarget.item.id, payload)
    setEditingTarget(null)
    setFeedbackMessage('Cambios guardados exitosamente.')
    setTimeout(() => setFeedbackMessage(''), 3500)
  }

  return (
    <main className="min-h-screen bg-[#fbf8ff] px-6 pb-16 pt-28 text-[#2e3145]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="mb-2 inline-block rounded bg-indigo-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-700">
            Administración
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">Panel de administración</h1>
          <p className="mt-2 text-slate-600">
            Consulta, edita, activa/desactiva y elimina usuarios, artistas, reservas y calificaciones registradas en la plataforma.
          </p>
        </div>

        {feedbackMessage && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-300">
            {feedbackMessage}
          </div>
        )}

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
              onEdit={(resourceType, item) => setEditingTarget({ resourceType, item })}
              onDelete={handleDelete}
            />
            <ResourceSummary
              title="Artistas"
              resourceType="artists"
              items={resources.artists}
              label="artistas"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
              onEdit={(resourceType, item) => setEditingTarget({ resourceType, item })}
              onDelete={handleDelete}
            />
            <ResourceSummary
              title="Reservas"
              resourceType="bookings"
              items={resources.bookings}
              label="reservas"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
              onEdit={(resourceType, item) => setEditingTarget({ resourceType, item })}
              onDelete={handleDelete}
            />
            <ResourceSummary
              title="Calificaciones"
              resourceType="ratings"
              items={resources.ratings}
              label="calificaciones"
              actionLoadingId={actionLoadingId}
              onToggleStatus={toggleStatus}
              onEdit={(resourceType, item) => setEditingTarget({ resourceType, item })}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {editingTarget && (
        <AdminEditModal
          target={editingTarget}
          isSaving={actionLoadingId === `${editingTarget.resourceType}:${editingTarget.item.id}`}
          onClose={() => setEditingTarget(null)}
          onSave={handleSaveEdit}
        />
      )}
    </main>
  )
}
