import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { useTilt } from '@/hooks/useTilt'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const STATUS = { Live: 'ok', Winner: 'amber', Shipped: 'default' }

function Flow({ steps }) {
  return (
    <div className="mt-6" aria-label={`Data flow: ${steps.join(', then ')}`}>
      <p className="mb-3 font-mono text-xs text-muted-foreground">data flow</p>
      <ol className="flex flex-wrap items-center gap-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center">
            <span className="rounded-sm border border-primary/40 bg-white/6 px-3 py-1.5 font-mono text-xs text-foreground">{s}</span>
            {i < steps.length - 1 && (
              <span className="relative mx-1 h-px w-8 bg-primary/40 sm:w-10" aria-hidden="true">
                <span className="packet absolute -top-[3px] size-[7px] rounded-full bg-accent shadow-[0_0_6px_rgba(255,122,69,0.6)]" style={{ animationDelay: `${i * 0.35}s` }} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Detail({ p }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(5)
  return (
    <div className="[perspective:1400px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div ref={ref} className="tilt hud-panel hud-clip grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
        <div data-clip="left" className="relative min-h-56 md:min-h-full">
          <img src={p.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-linear-to-t from-abyss from-0% via-abyss/85 via-45% to-abyss/0 to-100%" />
          <div className="lift absolute bottom-5 left-5 right-5">
            <Badge variant={STATUS[p.status]} className="mb-3 bg-black/70">
              {p.status === 'Live' && <span className="size-1.5 rounded-full bg-ok" />} {p.status.toLowerCase()}
            </Badge>
            {p.mern && <Badge variant="ok" className="mb-3 ml-2 bg-black/70">MERN</Badge>}
            <h3 className="display-title text-3xl text-foreground sm:text-4xl">{p.title}</h3>
            <p className="mt-2 text-sm text-foreground/75">{p.subtitle}</p>
          </div>
        </div>
        <div data-stagger="up" data-stagger-each="0.08" className="p-6 sm:p-8">
          <p className="text-base leading-relaxed text-foreground/90">{p.summary}</p>
          <ul className="mt-5 space-y-2.5">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                <span className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                {pt}
              </li>
            ))}
          </ul>
          <Flow steps={p.flow} />
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s}>
                <Badge variant="outline">{s}</Badge>
              </li>
            ))}
          </ul>
          {(p.links.live || p.links.github) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {p.links.live && (
                <Button asChild size="sm">
                  <a href={p.links.live} target="_blank" rel="noreferrer">
                    Open live <ArrowUpRight />
                  </a>
                </Button>
              )}
              {p.links.github && (
                <Button asChild size="sm" variant="outline">
                  <a href={p.links.github} target="_blank" rel="noreferrer">
                    <Github /> Source
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [value, setValue] = useState(projects[0].id)
  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Things I’ve shipped." note="All three run on the MERN stack: React, Node, Express and MongoDB. Two are live, one won nationally. Pick a project to see how it’s wired." />
        <Tabs value={value} onValueChange={setValue} orientation="vertical" className="gap-6 lg:grid lg:grid-cols-[250px_1fr]">
          <TabsList data-stagger="left" data-stagger-each="0.1" className="h-fit w-full flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:items-stretch lg:overflow-visible lg:pb-0" aria-label="Projects">
            {projects.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className={cn('hud-clip shrink-0 flex-col items-start gap-0.5 rounded-none border-border bg-deep/30 px-4 py-3 text-left lg:w-full')}
              >
                <span className="font-display text-base font-bold leading-tight text-foreground">{p.title}</span>
                <span className="font-mono text-[11px] font-normal text-muted-foreground">{p.status.toLowerCase()}{p.mern ? ' · MERN' : ''}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {projects.map((p) => (
            <TabsContent key={p.id} value={p.id} className="min-w-0">
              <Detail p={p} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
