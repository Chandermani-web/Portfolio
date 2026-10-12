import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-[#095a69] shadow-[0_10px_22px_-10px_rgba(11,114,133,0.7)] hover:shadow-[0_14px_28px_-10px_rgba(11,114,133,0.8)] hover:-translate-y-px',
        outline: 'border border-primary/40 bg-white/60 text-foreground hover:bg-primary/10 hover:border-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        amber: 'bg-accent text-accent-foreground hover:bg-[#92400e] shadow-[0_10px_22px_-10px_rgba(180,83,9,0.7)]',
        ghost: 'text-foreground/80 hover:bg-primary/10 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 text-sm has-[>svg]:px-5',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10',
      },
      shape: {
        hud: 'rounded-lg',
        pill: 'rounded-full',
        soft: 'rounded-md',
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
