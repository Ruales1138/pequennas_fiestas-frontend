import * as React from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { cn } from '@/lib/utils'

const Form = React.forwardRef(({ children, className, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-6', className)} {...props}>
    {children}
  </form>
))

Form.displayName = 'Form'

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }
  return fieldContext
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      htmlFor={id}
      {...props}
    />
  )
})

FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <div
      ref={ref}
      data-form-control=""
      data-form-item-id={id}
      className={cn('relative', className)}
      {...props}
    />
  )
})

FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))

FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props} />
))

FormMessage.displayName = 'FormMessage'

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormProvider,
}