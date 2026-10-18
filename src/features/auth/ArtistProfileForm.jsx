import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { artistProfileSchema } from './validation'
import { useRef } from 'react'
import { authClient } from '../../lib/authClient'
import { Form } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const CATEGORIES = [
    { value: 'musica', label: 'Música en vivo' },
    { value: 'teatro', label: 'Teatro' },
    { value: 'talleres', label: 'Talleres' },
    { value: 'dj', label: 'DJ' },
    { value: 'otros', label: 'Otros' },
    { value: 'animacion_infantil', label: 'Animación infantil' }
]


export default function ArtistProfileForm({userId, onSuccess}) {
    console.log(userId);
    
    const [serverError, setServerError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const fileInputRef = useRef(null)

    const form = useForm({
        resolver: zodResolver(artistProfileSchema),
        defaultValues: {
        bio: '',
        contactPhone: '',
        contactSocial: '',
        baseRate: '',
        city: '',
        coverageArea: '',
        category: '',
        image: '',
        },
    })

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const uploadImageLocal = async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        if (!response.ok) throw new Error("Error al subir al imagen")
        
        const { fileUrl } = await response.json()
        return fileUrl
    }

    const onSubmit = async (data) => {
        
        setServerError(null)
        setIsLoading(true)
        console.log('✅ onSubmit ejecutado', data)
        try {
            if (imageFile) {
                const imageUrl = await uploadImageLocal(imageFile)
                await authClient.updateImageUser(imageUrl)
            }

            await authClient.updateArtistProfile({
                userId,
                bio: data.bio,
                contactPhone: data.contactPhone,
                contactSocial: data.contactSocial,
                baseRate: data.baseRate,
                city: data.city,
                coverageArea: data.coverageArea,
                category: data.category
            })
            
            onSuccess?.()

        } catch (error) {
            setServerError(error instanceof Error ? error.message : 'Error al actualizar el perfil')
        } finally {
            setIsLoading(false)
        }}
        console.log('Errores de validación:', form.formState.errors)
        return(
        <Card className="w-full max-w-lg">
        <CardHeader>
            <CardTitle>Completa tu perfil de artista</CardTitle>
            <CardDescription>Esta información será visible para tus clientes</CardDescription>
        </CardHeader>
        <CardContent>
            {serverError && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-md text-sm">
                {serverError}
            </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center gap-3">
                <div
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-full border-2 border-dashed border-input bg-muted flex items-center justify-center cursor-pointer overflow-hidden hover:border-ring transition-colors"
                >
                {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    : <span className="text-xs text-muted-foreground text-center px-2">Subir foto</span>
                }
                </div>
                <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                />
            </div>
            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Biografía</FormLabel>
                    <FormControl>
                    <textarea
                        placeholder="Cuéntale a tus clientes quién eres y qué ofreces..."
                        disabled={isLoading}
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/20 disabled:opacity-50 resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                    <Select disabled={isLoading} {...field}>
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                        ))}
                    </Select>
                    </FormControl>
                    <FormMessage>{form.formState.errors.category?.message}</FormMessage>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="baseRate"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tarifa base (COP)</FormLabel>
                    <FormControl>
                    <Input
                        type="number"
                        placeholder="150000"
                        disabled={isLoading}
                        {...field}
                    />
                    </FormControl>
                    <FormMessage>{form.formState.errors.baseRate?.message}</FormMessage>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                    <Input placeholder="Medellín" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.city?.message}</FormMessage>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="coverageArea"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Área de cobertura</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Antioquia y Eje Cafetero"
                        disabled={isLoading}
                        {...field}
                    />
                    </FormControl>
                    <FormMessage>{form.formState.errors.coverageArea?.message}</FormMessage>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Teléfono de contacto</FormLabel>
                    <FormControl>
                    <Input
                        type="tel"
                        placeholder="+57 300 000 0000"
                        autoComplete="tel"
                        disabled={isLoading}
                        {...field}
                    />
                    </FormControl>
                    <FormMessage>{form.formState.errors.contactPhone?.message}</FormMessage>
                </FormItem>
                )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Guardando perfil...' : 'Guardar perfil'}
            </Button>
            </form>
        </CardContent>
        </Card>
    )
}