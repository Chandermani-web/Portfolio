import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-foreground text-[#0b0a0a] hover:bg-primary hover:text-primary-foreground',
        outline: 'border border-foreground/28 text-foreground hover:border-foreground hover:bg-white/6',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
        amber: 'bg-primary text-primary-foreground hover:bg-foreground hover:text-[#0b0a0a]',
        ghost: 'text-foreground/80 hover:bg-white/8 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 has-[>svg]:px-5',
        sm: 'h-9 px-4',
        lg: 'h-12 px-7',
        icon: 'size-10',
      },
      shape: {
        hud: 'rounded-none',
        pill: 'rounded-full',
        soft: 'rounded-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'default', shape: 'hud' },
  },
)

function Button({ className, variant, size, shape, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, shape, className }))} {...props} />
}

export { Button, buttonVariants }
