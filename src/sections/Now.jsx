import { Activity, Bot, Cloud, Coffee, GitBranch, Layers } from 'lucide-react'
import { missions } from '@/data/portfolio'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'

const ICONS = [Layers, Bot, Coffee, Cloud, Activity, GitBranch]
const VARIANT = { Active: 'default', Learning: 'amber', Ongoing: 'sky', Weekly: 'sky' }
const EDGE = { Active: '#7fc3d1', Learning: '#e6b873', Ongoing: '#8fc1dc', Weekly: '#8fc1dc' }

export default function Now() {
  return (
    <section id="now" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="What I’m building now." />
        <ul className="space-y-5">
          {missions.map((m, i) => {
            const Icon = ICONS[i]
            return (
              <li key={m.title}>
                <div
                  className="group hud-panel flex items-center gap-4 rounded-xl p-4 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 sm:gap-6 sm:p-5"
                  style={{ boxShadow: `5px 5px 0 ${EDGE[m.status]}, 10px 14px 26px -10px rgba(70,48,12,0.3)` }}
                >
                  <span className="grid size-12 shrink-0 place-items-center border border-primary/50 bg-abyss/70 rounded-md sm:size-14">
                    <Icon className="size-5 text-primary sm:size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{m.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                  </div>
                  <Badge variant={VARIANT[m.status]} className="shrink-0 self-start sm:self-center">
                    {m.status.toLowerCase()}
                  </Badge>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
