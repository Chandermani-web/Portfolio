import { cn } from '@/lib/utils'

export default function SectionHeading({ title, note, className, align = 'left' }) {
  return (
    <header className={cn('mb-10 max-w-3xl md:mb-14', align === 'center' && 'mx-auto text-center', className)}>
      <h2 className="display-title text-[clamp(2.3rem,5.2vw,4.4rem)] text-balance text-foreground">{title}</h2>
      {note && <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">{note}</p>}
    </header>
  )
}
