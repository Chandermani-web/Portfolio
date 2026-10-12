import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return <div data-slot="card" className={cn('hud-panel hud-clip flex flex-col gap-4 text-card-foreground', className)} {...props} />
}
function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn('flex flex-col gap-1.5 px-6 pt-6', className)} {...props} />
}
function CardTitle({ className, ...props }) {
  return <h3 data-slot="card-title" className={cn('font-display text-xl font-bold leading-tight tracking-tight', className)} {...props} />
}
function CardDescription({ className, ...props }) {
  return <p data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />
}
function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn('px-6 pb-6', className)} {...props} />
}
function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn('flex items-center px-6 pb-6', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
