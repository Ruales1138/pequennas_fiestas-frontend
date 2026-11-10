'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signInSchema } from './validation'
import { authService } from './authService'
import type { AuthResponse } from './types'
import { useAuth } from '@/context/AuthContext'

interface LoginFormValues {
  email: string
  password: string
}

interface LoginFormProps {
  onSuccess?: (result: unknown) => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null)
    setIsLoading(true)

    try {
      const result: AuthResponse = await authService.signIn(data)
      setUser(result.user)
      form.reset()
      router.push('/')
      onSuccess?.(result)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">Iniciar sesión</h2>
        <p className="mt-1 text-sm text-slate-600">Accede a tu cuenta</p>
      </div>

      <div className="px-6 py-5">
        {serverError && (
          <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              {...form.register('email')}
              placeholder="tu@email.com"
              autoComplete="email"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.email.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              {...form.register('password')}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.password.message)}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
