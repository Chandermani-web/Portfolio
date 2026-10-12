import { useRef, useState } from 'react'
import { Orbit } from 'lucide-react'
import Stage from '@/components/Stage'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import ArchitectureLab from '@/sections/ArchitectureLab'
import { createArchitecture } from '@/three/scenes/architecture'
import { arch, archFlow } from '@/data/portfolio'

const byId = Object.fromEntries(arch.nodes.map((n) => [n.id, n]))
const VARIANT = { cyan: 'default', sky: 'sky', amber: 'amber', violet: 'violet', green: 'ok' }
const KIND = {
  client: 'client',
  edge: 'AWS edge',
  balancer: 'load balancer',
  proxy: 'proxy',
  compute: 'compute',
  cache: 'cache',
  database: 'database',
  external: 'internet',
  cicd: 'CI/CD',
}

function Steps({ title, steps }) {
  return (
    <div className="hud-panel hud-clip p-5 sm:p-6">
      <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
      <ol className="mt-4 space-y-3.5">
        {steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
            <span className="grid size-7 place-items-center border border-primary/50 bg-abyss/70 font-mono text-xs text-primary">{i + 1}</span>
            <p className="text-sm leading-relaxed text-foreground/85">
              <span className="font-semibold text-foreground">{s.title}.</span> {s.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Architecture() {
  const api = useRef(null)
  const cb = useRef({})
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)
  cb.current.onHover = setHover
  cb.current.onSelect = (id) => {
    const next = selected === id ? null : id
    setSelected(next)
    api.current?.setSelected(next)
  }

  const create = ({ el }) =>
    createArchitecture({ el, data: arch, onHover: (id) => cb.current.onHover(id), onSelect: (id) => cb.current.onSelect(id) })

  const focus = byId[hover ?? selected]
  const links = focus
    ? arch.edges
        .filter(([a, b]) => a === focus.id || b === focus.id)
        .map(([a, b, type]) => ({ name: byId[a === focus.id ? b : a].title, type }))
    : []

  return (
    <section id="architecture" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="How I think about architecture."
          note="First, how each of my projects actually moves data: pick one and follow it from the client to the store. Then the bigger picture: one request end to end on AWS, with a single PostgreSQL database that is sharded and replicated."
        />
      </div>

      <div className="mx-auto mb-20 max-w-[1400px] md:mb-28">
        <ArchitectureLab />
      </div>

      <div className="mx-auto max-w-6xl">
        <h3 className="display-title mb-8 text-[clamp(1.6rem,3vw,2.4rem)] text-foreground">Reference design on AWS</h3>
        <p className="mb-8 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          A system-design diagram I have worked through, not a claim of production use. Hover a node to trace its links; click to pin it.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="hud-clip relative overflow-hidden border border-border bg-abyss/20">
          <Stage
            create={create}
            onReady={(s) => (api.current = s)}
            className="h-[min(120vw,600px)] w-full select-none lg:h-[780px]"
            role="img"
            aria-label="Interactive 3D system diagram. A React client resolves Route 53, reaches CloudFront and S3, then an AWS load balancer, two Nginx reverse proxies and two app servers. The app servers use a Redis cache and one PostgreSQL database split into two shards, each with a read replica. Outbound calls leave through a forward proxy. A GitHub Actions, ECR and ECS pipeline deploys the app servers."
          />

          <div className="pointer-events-none absolute top-4 left-4 max-w-[17rem] sm:max-w-xs" aria-live="polite">
            <div className="hud-panel hud-clip bg-abyss/80 p-4">
              {focus ? (
                <>
                  <Badge variant={VARIANT[focus.tone]} className="mb-2">
                    {selected === focus.id && !hover ? 'pinned · ' : ''}
                    {KIND[focus.kind]}
                  </Badge>
                  <h3 className="font-display text-xl font-bold leading-tight">{focus.title}</h3>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{focus.sub}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{focus.note}</p>
                  {links.length > 0 && (
                    <ul className="mt-3 space-y-0.5 font-mono text-xs">
                      {links.map((l) => (
                        <li key={l.name + l.type} className="flex items-center gap-2">
                          <span className="h-px w-4" style={{ background: arch.edgeTypes[l.type].color }} />
                          <span className="text-foreground/80">{l.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <Orbit className="mt-0.5 size-4 shrink-0 text-primary" />
                  Drag to orbit. Hover a node to follow its connections.
                </p>
              )}
            </div>
          </div>

          <ul className="pointer-events-none absolute right-4 bottom-4 hidden flex-wrap justify-end gap-x-4 gap-y-1.5 font-mono text-xs text-muted-foreground sm:flex sm:max-w-[34rem]">
            {Object.entries(arch.edgeTypes).map(([k, t]) => (
              <li key={k} className="flex items-center gap-2">
                <span className="h-px w-5" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} /> {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Steps title="Life of one request" steps={archFlow.request} />
        <Steps title="Life of one release" steps={archFlow.release} />
      </div>
    </section>
  )
}
