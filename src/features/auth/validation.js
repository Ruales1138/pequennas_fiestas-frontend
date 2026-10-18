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
    errorMap: () => ({ message: 'Selecciona un rol válido' }),
  }),
})

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const artistProfileSchema = z.object({
  Image: z.string().url('Debe ser una URL válida').optional(),
  bio: z.string().min(10, 'La biografía debe tener al menos 10 caracteres').max(500),
  contactPhone: z.string().min(7, 'Telefono invalido'),
  baseRate: z.coerce.number().positive('La tarifa base debe ser mayot a 0').max(10000000, 'La tarifa base no puede ser tan alta'),
  city: z.string().min(2, 'Ingresa tu ciudad'),
  coverageArea: z.string().min(2, 'Ingresa tu área de cobertura'),
  category: z.enum(['musica', 'animación', 'talleres', 'otros', 'dj','teatro', 'animacion_infantil'], {
    errorMap: () => ({ message: 'Selecciona una categoría válida' }),
  }),  
})