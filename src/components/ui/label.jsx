import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

function Label({ className, ...props }) {
  return <LabelPrimitive.Root data-slot="label" className={cn('flex items-center gap-2 font-mono text-xs leading-none font-medium text-muted-foreground select-none', className)} {...props} />
}

export { Label }
