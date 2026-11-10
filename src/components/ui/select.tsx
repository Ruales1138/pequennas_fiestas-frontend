import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const selectVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 appearance-none',
  {
    variants: { size: { default: 'h-9 text-sm', sm: 'h-8 text-sm', lg: 'h-10 text-base' } },
    defaultVariants: { size: 'default' },
  },
)

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & VariantProps<typeof selectVariants>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, size = 'default', ...props }, ref) => (
  <div className="relative w-full">
    <select ref={ref} className={cn(selectVariants({ size, className }), 'pr-8')} {...props} />
    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  </div>
))
Select.displayName = 'Select'

export { Select, selectVariants }
