import { useState } from 'react'
import { Atom, Coffee } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import MernBody from '@/sections/MernStack'
import JavaBody from '@/sections/JavaStack'
import { cn } from '@/lib/utils'

const VARIANTS = {
  mern: {
    label: 'MERN',
    icon: Atom,
    title: 'MERN, from the controller to the container.',
    note: 'The layers of an Express service as I build them for clients. A request travels down the stack, the response comes back up, and the whole thing ships in a Docker container. Drag to rotate, hover a layer, click to open its code.',
  },
  java: {
    label: 'Java',
    icon: Coffee,
    title: 'Java, from the controller to the container.',
    note: 'The layers of a Spring Boot service as I build them. A request travels down the stack and the response comes back up. Drag to rotate, hover a layer, click to open its code.',
  },
}

export default function Backend() {
  const [variant, setVariant] = useState('mern')
  const v = VARIANTS[variant]
  return (
    <section id="backend" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={v.title} note={v.note} className="mb-6 md:mb-8" />

        <div role="tablist" data-stagger="pop" data-stagger-each="0.1" aria-label="Choose a backend stack" className="mb-8 flex flex-wrap gap-2">
          {Object.entries(VARIANTS).map(([id, o]) => {
            const Icon = o.icon
            const on = id === variant
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setVariant(id)}
                className={cn(
                  'hud-clip inline-flex cursor-pointer items-center gap-2 border px-5 py-2.5 font-mono text-sm transition-colors',
                  on ? 'border-primary bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_rgba(236,47,37,0.6)]' : 'border-border bg-white/5 text-muted-foreground hover:border-primary/60 hover:text-foreground',
                )}
              >
                <Icon className="size-4" /> {o.label}
              </button>
            )
          })}
        </div>

        <div key={variant} className="animate-in fade-in-0 duration-300">
          {variant === 'mern' ? <MernBody /> : <JavaBody />}
        </div>
      </div>
    </section>
  )
}
