import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap border px-2.5 py-0.5 font-mono text-xs font-medium [&>svg]:size-3 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-primary/40 bg-primary/10 text-primary',
        sky: 'border-[#0284c7]/40 bg-[#0284c7]/10 text-[#0369a1]',
        amber: 'border-accent/45 bg-accent/10 text-accent',
        violet: 'border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#6d28d9]',
        ok: 'border-ok/40 bg-ok/10 text-ok',
        outline: 'border-border text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'span'
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), 'rounded-md', className)} {...props} />
}

export { Badge, badgeVariants }
