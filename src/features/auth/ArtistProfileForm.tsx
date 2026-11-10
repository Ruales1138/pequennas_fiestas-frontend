'use client'

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { artistProfileSchema } from './validation'
import { authService } from './authService'
import { apiRequest } from '@/lib/apiClient'

const CATEGORIES = [
  { value: 'musica', label: 'Música en vivo' },
  { value: 'teatro', label: 'Teatro' },
  { value: 'talleres', label: 'Talleres' },
  { value: 'dj', label: 'DJ' },
  { value: 'otros', label: 'Otros' },
  { value: 'animacion_infantil', label: 'Animación infantil' },
]

interface ArtistProfileFormProps {
  userId: string
  onSuccess?: () => void
}

type ArtistProfileFormValues = z.infer<typeof artistProfileSchema>
type ArtistProfileFormInput = z.input<typeof artistProfileSchema>

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export default function ArtistProfileForm({ userId, onSuccess }: ArtistProfileFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<ArtistProfileFormInput, unknown, ArtistProfileFormValues>({
    resolver: zodResolver(artistProfileSchema),
    defaultValues: {
      bio: '',
      contactPhone: '',
      contactSocial: '',
      baseRate: '',
      city: '',
      coverageArea: '',
      category: undefined,
    },
  })

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImageFile(null)
      setImagePreview(null)
      setImageError('Selecciona un archivo de imagen válido.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageFile(null)
      setImagePreview(null)
      setImageError('La imagen no puede superar los 5 MB.')
      event.target.value = ''
      return
    }

    setImageError(null)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImageLocal = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const payload = await apiRequest<{ fileUrl: string }>('/api/upload/image', {
      method: 'POST',
      body: formData,
    })

    return payload.fileUrl
  }

  const onSubmit = async (data: ArtistProfileFormValues) => {
    setServerError(null)
    setIsLoading(true)

    try {
      if (imageFile) {
        const imageUrl = await uploadImageLocal(imageFile)
        await authService.updateImageUser(imageUrl)
      }

      await authService.updateArtistProfile({
        userId,
        bio: data.bio,
        contactPhone: data.contactPhone,
        contactSocial: data.contactSocial,
        baseRate: Number(data.baseRate),
        city: data.city,
        coverageArea: data.coverageArea,
        category: data.category,
      })

      onSuccess?.()
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Error al actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">Completa tu perfil de artista</h2>
        <p className="mt-1 text-sm text-slate-600">Esta información será visible para tus clientes</p>
      </div>

      <div className="px-6 py-5">
        {serverError && (
          <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:border-indigo-400"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="px-2 text-center text-xs text-slate-500">Subir foto</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageError && <p className="text-center text-xs text-rose-600">{imageError}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Biografía</label>
            <textarea
              {...form.register('bio')}
              placeholder="Cuéntale a tus clientes quién eres y qué ofreces..."
              disabled={isLoading}
              rows={4}
              className="flex min-h-24 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.bio && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.bio.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Categoría</label>
            <select
              {...form.register('category')}
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {form.formState.errors.category && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.category.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Tarifa base (COP)</label>
            <input
              type="number"
              {...form.register('baseRate')}
              placeholder="150000"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.baseRate && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.baseRate.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Ciudad</label>
            <input
              {...form.register('city')}
              placeholder="Medellín"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.city && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.city.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Área de cobertura</label>
            <input
              {...form.register('coverageArea')}
              placeholder="Antioquia y Eje Cafetero"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.coverageArea && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.coverageArea.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Teléfono de contacto</label>
            <input
              type="tel"
              {...form.register('contactPhone')}
              placeholder="+57 300 000 0000"
              autoComplete="tel"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.contactPhone && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.contactPhone.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Red social</label>
            <input
              {...form.register('contactSocial')}
              placeholder="instagram.com/tuperfil"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.contactSocial && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.contactSocial.message)}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Guardando perfil...' : 'Guardar perfil'}
          </button>
        </form>
      </div>
    </div>
  )
}
