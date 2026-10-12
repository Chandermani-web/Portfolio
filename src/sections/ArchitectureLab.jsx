import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Github, Pin, ScanSearch } from 'lucide-react'
import HoloLab from '@/components/HoloLab'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMedia } from '@/hooks/useMedia'
import { flowKinds, projectFlows, projects } from '@/data/portfolio'
import { cn } from '@/lib/utils'

// Photo 1 (941 x 1671). Coordinates below are image pixels, measured on the supplied photo.
const IMAGE = {
  url: '/lab/architecture-portrait.webp',
  size: [941, 1671],
  fit: 'contain',
  ax: 0.5,
  ay: 0.5,
  head: [320, 430],
  eyeMid: [331, 544],
  eyes: [[276, 556, 22, 7], [385, 532, 22, 7]],
  // [x, y, radius, height]: head, body, hand, the cube, and the three floating panels baked into the photo
  bumps: [[320, 420, 190, 1.0], [480, 1150, 430, 0.45], [500, 1120, 170, 0.7], [520, 950, 120, 0.95], [140, 830, 150, 0.8], [800, 900, 160, 0.8], [270, 1330, 190, 0.7]],
  irisMax: 3,
  irisVertical: 0.3,
  headShift: 0.014,
  depth: 0.7,
  feather: [0.1, 0.1, 0.05, 0.04],
}
const CORE = [520, 950] // the cube, in image pixels

// Slots around the portrait, in % of the lab box, ordered so the data flow reads as a U around the cube.
const SLOTS = [[12, 26], [12, 62], [50, 92], [88, 62], [88, 26]]
const slotsFor = (n) => (n >= 5 ? SLOTS : n === 4 ? [SLOTS[0], SLOTS[1], SLOTS[2], SLOTS[3]] : [SLOTS[0], SLOTS[2], SLOTS[4]])
const clamp = (v) => Math.max(-1, Math.min(1, v))

function Node({ node, active, pinned, spatial, style, onEnter, onLeave, onToggle }) {
  const kind = flowKinds[node.kind]
  return (
    <button
      type="button"
      data-holo={node.id}
      aria-pressed={pinned}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      style={{ ...(spatial ? { position: 'absolute' } : null), ...style, borderColor: active ? kind.color : undefined }}
      className={cn(
        'hud-panel hud-clip cursor-pointer px-3 py-2 text-left transition-all duration-200 bg-abyss/80',
        spatial ? 'z-10 w-[9.5rem] -translate-x-1/2 -translate-y-1/2' : 'w-full',
        active && 'scale-[1.05] bg-abyss/95',
      )}
    >
      <span className="block font-mono text-[10px] tracking-wider uppercase" style={{ color: `color-mix(in srgb, ${kind.color} 62%, #1c2430)` }}>{kind.label}</span>
      <span className="block font-display text-sm leading-tight font-bold">{node.name}</span>
      <span className="block truncate font-mono text-[10px] text-muted-foreground">{node.sub}</span>
      {active && <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 14px ${kind.color}33, 0 8px 18px -8px ${kind.color}aa` }} />}
    </button>
  )
}

const STATUS = { Live: 'ok', Winner: 'amber', Shipped: 'default' }

/** The project box: always visible, with the details and the source / live links. */
function ProjectBox({ project }) {
  const { live, github } = project.links
  return (
    <article key={project.id} className="hud-panel hud-clip animate-in fade-in-0 overflow-hidden duration-200" aria-label={`${project.title} project details`}>
      <div className="relative h-32 sm:h-40">
        <img src={project.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-linear-to-t from-abyss from-0% via-abyss/85 via-45% to-abyss/0 to-100%" />
        <div className="absolute right-5 bottom-3 left-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="display-title text-3xl text-foreground">{project.title}</h3>
            <p className="mt-1 text-sm text-foreground/80">{project.subtitle}</p>
          </div>
          <div className="flex gap-2">
            {project.mern && <Badge variant="ok" className="bg-white/90">MERN</Badge>}
            <Badge variant={STATUS[project.status]} className="bg-white/90">{project.status.toLowerCase()}</Badge>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-foreground/90">{project.summary}</p>
        <ul className="mt-4 space-y-2">
          {project.points.map((pt) => (
            <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
              <span className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((t) => (
            <li key={t}><Badge variant="outline">{t}</Badge></li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {live && (
            <Button asChild size="sm">
              <a href={live} target="_blank" rel="noreferrer">Live app <ArrowUpRight /></a>
            </Button>
          )}
          {github && (
            <Button asChild size="sm" variant="outline">
              <a href={github} target="_blank" rel="noreferrer"><Github /> Source code</a>
            </Button>
          )}
          {!live && !github && <p className="font-mono text-xs text-muted-foreground">Live link and source are not public yet.</p>}
          {live && !github && <p className="font-mono text-xs text-muted-foreground">Source is private.</p>}
          {!live && github && <p className="font-mono text-xs text-muted-foreground">No live link for this one.</p>}
        </div>
      </div>
    </article>
  )
}

export default function ArchitectureLab() {
  const spatial = useMedia('(min-width: 1024px)')
  const [projectId, setProjectId] = useState('cmai')
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)

  const project = projects.find((p) => p.id === projectId)
  const slots = slotsFor(projectFlows[projectId].length)
  const nodes = projectFlows[projectId].map((n, i) => ({ ...n, id: `${projectId}-${i}`, slot: slots[i] }))
  const active = hover ?? selected
  const node = nodes.find((n) => n.id === active)
  const idx = node ? nodes.indexOf(node) : -1

  const edges = [
    ...nodes.slice(0, -1).map((n, i) => ({ a: n.id, b: nodes[i + 1].id, color: flowKinds[n.kind].color, flow: true, bow: 0.06, on: active === n.id || active === nodes[i + 1].id })),
    ...nodes.map((n) => ({ a: 'core', b: n.id, color: '#0891b2', faint: true, on: active === n.id })),
  ]

  const choose = (id) => {
    setProjectId(id)
    setHover(null)
    setSelected(null)
  }
  const virtualLook = (id) => {
    const n = nodes.find((x) => x.id === id)
    if (!n) return { x: 0, y: -0.5 }
    return { x: clamp((n.slot[0] - 44) / 38), y: clamp((32 - n.slot[1]) / 30) }
  }

  return (
    <div className="mx-auto max-w-[1100px]" onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}>
      <div role="tablist" aria-label="Choose a project" className="mb-5 flex flex-wrap gap-2">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === projectId}
            onClick={() => choose(p.id)}
            className={cn(
              'hud-clip cursor-pointer border px-4 py-2 font-mono text-xs transition-colors',
              p.id === projectId ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground',
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <HoloLab
        image={IMAGE}
        label="architecture-lab"
        activeId={active}
        linkIds={[]}
        edges={edges}
        spatial={spatial}
        virtualLook={virtualLook}
        className={spatial ? 'aspect-[16/10] w-full' : 'mx-auto aspect-[941/1671] w-full max-w-[420px]'}
      >
        {({ pt }) => (
          <>
            <div
              data-holo="core"
              aria-hidden="true"
              style={pt(...CORE)}
              className="pointer-events-none absolute z-10 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 sm:size-20 motion-safe:animate-pulse"
            />
            {spatial &&
              nodes.map((n) => (
                <Node
                  key={n.id}
                  node={n}
                  active={active === n.id}
                  pinned={selected === n.id}
                  spatial
                  style={{ left: `${n.slot[0]}%`, top: `${n.slot[1]}%` }}
                  onEnter={() => setHover(n.id)}
                  onLeave={() => setHover(null)}
                  onToggle={() => setSelected(selected === n.id ? null : n.id)}
                />
              ))}
          </>
        )}
      </HoloLab>

      {!spatial && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {nodes.map((n) => (
            <Node
              key={n.id}
              node={n}
              active={active === n.id}
              pinned={selected === n.id}
              onEnter={() => setHover(n.id)}
              onLeave={() => setHover(null)}
              onToggle={() => setSelected(selected === n.id ? null : n.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <ProjectBox project={project} />

        <div key={node?.id ?? 'idle'} aria-live="polite" className="hud-panel hud-clip animate-in fade-in-0 min-h-[10.5rem] p-5 duration-200 sm:p-6">
          {node ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">
                  {selected === node.id && !hover ? <Pin className="mr-1 size-3" /> : null}
                  {flowKinds[node.kind].label}
                </Badge>
                <h3 className="font-display text-xl font-bold">{node.name}</h3>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{node.sub} · in {project.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{node.text}</p>
              <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                {idx > 0 ? <span>receives from <b className="text-foreground">{nodes[idx - 1].name}</b></span> : <span>entry point</span>}
                <ArrowRight className="size-3.5 text-primary" />
                {idx < nodes.length - 1 ? <span>sends to <b className="text-foreground">{nodes[idx + 1].name}</b></span> : <span>end of the flow</span>}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-display text-xl font-bold">Follow the data</h3>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-foreground/85">
                <ScanSearch className="mt-0.5 size-4 shrink-0 text-primary" />
                Hover a box beside the portrait ({nodes.map((n) => n.name).join(', ')}) to see its role and where its data goes next.
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">Click a box to pin it, click again or press Esc to release.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
