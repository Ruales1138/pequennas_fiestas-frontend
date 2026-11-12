'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUpSchema } from './validation'
import { authService } from './authService'
import type { AuthResponse } from './types'
import { useAuth } from '@/context/AuthContext'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  role: 'cliente' | 'artista'
}

interface RegisterFormProps {
  onSuccess?: (result: unknown) => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'cliente',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null)
    setIsLoading(true)

    try {
      const result: AuthResponse = await authService.signUp(data)
      setUser(result.user)
      sessionStorage.setItem('pending_user', JSON.stringify(result.user))

      if (data.role === 'artista') {
        router.push('/onboarding/artista')
      } else {
        router.push('/')
      }

      form.reset()
      onSuccess?.(result)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Error en el registro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full rounded-3xl border border-[#12131a]/15 bg-white/75 p-8 shadow-xl shadow-purple-950/5 backdrop-blur-xl sm:p-10">
      <div className="mb-8 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5b21b6]">
          02 / REGISTRO
        </span>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-[#12131a]">
          Crear cuenta.
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Únete a GigaShow para reservar shows o publicar tu perfil artístico.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-xs font-medium text-rose-700">
          {serverError}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block pl-2 text-xs font-bold uppercase tracking-wider text-[#1e1b4b]">
            Nombre completo
          </label>
          <input
            {...form.register('name')}
            placeholder="Juan Pérez"
            autoComplete="name"
            disabled={isLoading}
            className="w-full rounded-full border border-[#12131a]/30 bg-white/70 px-5 py-3 text-sm text-[#12131a] placeholder:text-slate-400 transition focus:border-[#5b21b6] focus:bg-white focus:outline-none disabled:opacity-50"
          />
          {form.formState.errors.name && (
            <p className="pl-2 text-xs text-rose-600">{String(form.formState.errors.name.message)}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block pl-2 text-xs font-bold uppercase tracking-wider text-[#1e1b4b]">
            Email
          </label>
          <input
            type="email"
            {...form.register('email')}
            placeholder="tu@email.com"
            autoComplete="email"
            disabled={isLoading}
            className="w-full rounded-full border border-[#12131a]/30 bg-white/70 px-5 py-3 text-sm text-[#12131a] placeholder:text-slate-400 transition focus:border-[#5b21b6] focus:bg-white focus:outline-none disabled:opacity-50"
          />
          {form.formState.errors.email && (
            <p className="pl-2 text-xs text-rose-600">{String(form.formState.errors.email.message)}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block pl-2 text-xs font-bold uppercase tracking-wider text-[#1e1b4b]">
            Contraseña
          </label>
          <input
            type="password"
            {...form.register('password')}
            placeholder="Min. 8 caracteres, 1 mayúscula, 1 número"
            autoComplete="new-password"
            disabled={isLoading}
            className="w-full rounded-full border border-[#12131a]/30 bg-white/70 px-5 py-3 text-sm text-[#12131a] placeholder:text-slate-400 transition focus:border-[#5b21b6] focus:bg-white focus:outline-none disabled:opacity-50"
          />
          {form.formState.errors.password && (
            <p className="pl-2 text-xs text-rose-600">{String(form.formState.errors.password.message)}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block pl-2 text-xs font-bold uppercase tracking-wider text-[#1e1b4b]">
            Tipo de cuenta
          </label>
          <select
            {...form.register('role')}
            disabled={isLoading}
            className="w-full rounded-full border border-[#12131a]/30 bg-white/70 px-5 py-3 text-sm text-[#12131a] transition focus:border-[#5b21b6] focus:bg-white focus:outline-none disabled:opacity-50"
          >
            <option value="artista">Artista</option>
            <option value="cliente">Cliente</option>
          </select>
          {form.formState.errors.role && (
            <p className="pl-2 text-xs text-rose-600">{String(form.formState.errors.role.message)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 w-full rounded-full bg-[#5b21b6] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-purple-900/20 transition hover:bg-[#4c1d95] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="mt-7 border-t border-slate-200/70 pt-5 text-center text-xs text-slate-600">
        ¿Ya tienes una cuenta?{' '}
        <Link
          href="/login"
          className="ml-1 font-bold uppercase tracking-wider text-[#5b21b6] underline underline-offset-4 hover:text-[#4c1d95]"
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}
