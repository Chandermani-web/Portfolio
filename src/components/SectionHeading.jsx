import { cn } from '@/lib/utils'

/** Poster-style section heading: numbered eyebrow, giant tight uppercase title, light note. */
export default function SectionHeading({ title, note, n, label, className, align = 'left' }) {
  return (
    <header className={cn('mb-10 max-w-3xl md:mb-14', align === 'center' && 'mx-auto text-center', className)}>
      {(n || label) && (
        <p data-reveal="left" className={cn('eyebrow mb-5', align === 'center' && 'justify-center')}>
          {n && <b>{n}</b>}
          {label && <span>{label}</span>}
        </p>
      )}
      <h2 data-split="lines" className="display-title text-[clamp(2rem,4.6vw,4rem)] text-balance text-foreground">{title}</h2>
      {note && <p data-reveal className="mt-5 max-w-2xl text-base leading-relaxed font-light text-muted-foreground">{note}</p>}
    </header>
  )
}
