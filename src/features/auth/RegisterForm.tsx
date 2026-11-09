import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { signUpSchema } from './validation'
import { authClient } from '@/lib/authClient'
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
  const navigate = useNavigate()
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
      const result = (await authClient.signUp(data)) as any
      setUser(result.user)
      sessionStorage.setItem('pending_user', JSON.stringify(result.user))

      if (data.role === 'artista') {
        navigate('/onboarding/artista')
      } else {
        navigate('/')
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
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">Crear cuenta</h2>
        <p className="mt-1 text-sm text-slate-600">Regístrate para comenzar</p>
      </div>

      <div className="px-6 py-5">
        {serverError && (
          <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Nombre completo</label>
            <input
              {...form.register('name')}
              placeholder="Juan Pérez"
              autoComplete="name"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.name.message)}</p>
            )}
          </div>

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
              placeholder="Min. 8 caracteres, 1 mayúscula, 1 número"
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.password.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Rol</label>
            <select
              {...form.register('role')}
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:opacity-50"
            >
              <option value="artista">Artista</option>
              <option value="cliente">Cliente</option>
            </select>
            {form.formState.errors.role && (
              <p className="text-xs text-rose-600">{String(form.formState.errors.role.message)}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}
