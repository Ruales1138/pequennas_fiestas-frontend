import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from './validation'
import { authClient } from '@/lib/authClient'
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

import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'cliente',
    },
  })

  const onSubmit = async (data) => {
    console.log('✅ onSubmit ejecutado', data)
    setServerError(null)
    setIsLoading(true)
    try {
      const result = await authClient.signUp(data)
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>Regístrate para comenzar</CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-md text-sm">
            {serverError}
          </div>
        )}
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Pérez"
                    autoComplete="name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Min. 8 caracteres, 1 mayúscula, 1 número"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select disabled={isLoading} {...field}>
                    <option value="">Selecciona un rol</option>
                    <option value="artista">Artista</option>
                    <option value="cliente">Cliente</option>
                  </Select>
                </FormControl>
                <FormMessage>{form.formState.errors.role?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}