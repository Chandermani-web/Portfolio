import { Atom, Bot, Coffee, Container, LayoutDashboard, Radio } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTilt } from '@/hooks/useTilt'
import { process, services } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const ICONS = { Atom, Bot, Coffee, Container, LayoutDashboard, Radio }

function Service({ s }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(7)
  const Icon = ICONS[s.icon] ?? Atom
  return (
    <li className={cn('[perspective:1000px]', s.lead && 'sm:col-span-2 lg:col-span-1')} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div ref={ref} className={cn('tilt hud-panel hud-clip h-full p-5', s.lead && 'border-ok/60')}>
        <span className={cn('lift mb-4 grid size-11 place-items-center border bg-abyss/70', s.lead ? 'border-ok/60' : 'border-primary/50')}>
          <Icon className={cn('size-5', s.lead ? 'text-ok' : 'text-primary')} />
        </span>
        <h3 className="lift font-display text-xl font-bold tracking-tight">{s.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <li key={t}><Badge variant={s.lead ? 'ok' : 'outline'}>{t}</Badge></li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I build for clients."
          note="I take freelance work end to end, MERN first, with Java Spring Boot when the project needs it. One engineer, one conversation, one live deploy."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Service key={s.title} s={s} />
          ))}
        </ul>

        <div className="hud-panel hud-clip mt-8 p-5 sm:p-7">
          <h3 className="font-display text-xl font-bold tracking-tight">How a project runs</h3>
          <ol className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
                <span className="grid size-7 place-items-center border border-primary/50 bg-abyss/70 font-mono text-xs text-primary">{i + 1}</span>
                <p className="text-sm leading-relaxed text-foreground/85">
                  <span className="font-semibold text-foreground">{p.title}.</span> {p.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Button asChild>
              <a href="#contact">Start a project</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
