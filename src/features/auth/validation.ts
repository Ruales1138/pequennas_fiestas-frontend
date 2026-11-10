import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  role: z.enum(['cliente', 'artista'], {
    message: 'Selecciona un rol válido',
  }),
})

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const artistProfileSchema = z.object({
  bio: z.string().min(10, 'La biografía debe tener al menos 10 caracteres').max(500),
  contactPhone: z.string().min(7, 'Telefono invalido'),
  contactSocial: z.string().max(200, 'El contacto social no puede superar 200 caracteres'),
  baseRate: z.coerce.number().positive('La tarifa base debe ser mayor a 0').max(10000000, 'La tarifa base no puede ser tan alta'),
  city: z.string().min(2, 'Ingresa tu ciudad'),
  coverageArea: z.string().min(2, 'Ingresa tu área de cobertura'),
  category: z.enum(['musica', 'animación', 'talleres', 'otros', 'dj', 'teatro', 'animacion_infantil'], {
    message: 'Selecciona una categoría válida',
  }),
})
