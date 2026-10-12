import { useState } from 'react'
import { ArrowUpRight, Pin } from 'lucide-react'
import HoloLab from '@/components/HoloLab'
import SectionHeading from '@/components/SectionHeading'
import TechStats from '@/components/TechStats'
import { Badge } from '@/components/ui/badge'
import { useMedia } from '@/hooks/useMedia'
import { alsoShipped, skillNotes, skillTargets, stack, techStats } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const total = stack.reduce((n, g) => n + g.items.length, 0)
const byId = Object.fromEntries(stack.map((g) => [g.id, g]))
const groupOf = (skill) => stack.find((g) => g.items.includes(skill))
const targetOf = Object.fromEntries(skillTargets.map((t) => [t.id, t]))

// Two columns of panels, balanced by how many tools each group holds
const COLUMNS = [
  ['mern', 'frontend', 'realtime', 'ai'],
  ['backend', 'data', 'java', 'devops'],
]

// Photo 2 (1639 x 960). Coordinates are image pixels, measured on the supplied photo.
const IMAGE = {
  url: "/lab/05e1a771-840a-4329-a7f5-150406c66f65.png",
  size: [1639, 960],
  fit: 'cover',
  ax: 1,
  ay: 0.5,
  scale: 1.04,
  head: [1110, 300],
  eyeMid: [1031, 350],
  eyes: [[981, 358, 24, 8], [1082, 343, 28, 9]],
  // head, jacket, the Iron Man hologram, and the four floating panels baked into the photo
  bumps: [[1100, 300, 170, 1.0], [1250, 720, 380, 0.5], [330, 420, 360, 0.7], [750, 230, 170, 0.55], [1450, 200, 190, 0.8], [1550, 470, 130, 0.7], [1500, 800, 200, 0.9]],
  irisMax: 3.5,
  irisVertical: 0.4,
  headShift: 0.014,
  depth: 0.7,
  feather: [0.1, 0, 0, 0],
}

function Panel({ group, active, pinned, spatial, onEnter, onLeave, onToggle }) {
  return (
    <div
      className="hud-panel hud-clip bg-abyss/75 p-3"
      style={spatial ? { transform: 'perspective(1500px) rotateY(9deg)', transformOrigin: 'right center' } : undefined}
      role="group"
      aria-label={`${group.label}: ${group.items.join(', ')}`}
    >
      <h3 className="mb-2 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 0 3px ${group.color}33` }} aria-hidden="true" />
          {group.label}
        </span>
        <span className="text-muted-foreground">{String(group.items.length).padStart(2, '0')}</span>
      </h3>
      <ul className="flex flex-wrap gap-1.5">
        {group.items.map((s) => {
          const on = active === s
          return (
            <li key={s}>
              <button
                type="button"
                data-holo={`s-${s}`}
                aria-pressed={pinned === s}
                onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter(s)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
                onFocus={() => onEnter(s)}
                onBlur={onLeave}
                onClick={() => onToggle(s)}
                style={{ borderColor: on ? group.color : undefined, background: on ? `${group.color}22` : undefined, boxShadow: on ? `0 6px 14px -6px ${group.color}aa` : undefined }}
                className={cn(
                  'cursor-pointer rounded-md border border-border bg-white/70 px-2 py-1 font-mono text-[11px] leading-none text-foreground/85 transition-all duration-150 hover:border-foreground/30 hover:text-foreground',
                  on && 'scale-105 text-foreground',
                )}
              >
                {s}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Stack() {
  const spatial = useMedia('(min-width: 1024px)')
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)
  const skill = hover ?? selected
  const note = skill ? skillNotes[skill] : null
  const group = skill ? groupOf(skill) : null
  const uses = note?.uses ?? []
  const stats = skill ? techStats[skill] : null

  const virtualLook = (id) => {
    const g = stack.findIndex((x) => x.items.some((s) => `s-${s}` === id))
    return { x: -0.85, y: 0.45 - Math.max(g, 0) * 0.2 }
  }
  const toggle = (s) => setSelected((cur) => (cur === s ? null : s))
  const panelProps = (g) => ({ group: g, active: skill, pinned: selected, spatial, onEnter: setHover, onLeave: () => setHover(null), onToggle: toggle })

  return (
    <section id="stack" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Tools change. Curiosity doesn’t."
          note={`${total} tools in ${stack.length} groups, MERN first. Hover, focus or tap one: its power, speed and ability appear beside the portrait, and the note says where I actually used it.`}
        />
      </div>

      <div className="mx-auto max-w-[1180px]" onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}>
        <HoloLab
          image={IMAGE}
          label="skills-lab"
          activeId={skill ? `s-${skill}` : null}
          linkIds={uses.map((u) => `t-${u}`)}
          linkColor={group?.color}
          edges={[]}
          spatial={spatial}
          virtualLook={virtualLook}
          className={spatial ? 'aspect-[3/2] w-full' : 'aspect-[1639/960] w-full'}
        >
          {() =>
            spatial && (
              <>
                <div className="absolute top-[4%] left-[2%] z-10 grid w-[49%] grid-cols-2 items-start gap-3">
                  {COLUMNS.map((col, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      {col.map((id) => (
                        <Panel key={id} {...panelProps(byId[id])} />
                      ))}
                    </div>
                  ))}
                </div>
                {stats && <TechStats key={skill} name={skill} stats={stats} color={group.color} className="pointer-events-none absolute top-[5%] right-[2%] z-10 w-[min(15.5rem,21%)]" />}
                <ul className="absolute right-[3%] bottom-[3%] left-[2%] z-10 flex flex-wrap items-center gap-2" aria-label="Where tools were used">
                  <li className="mr-1 rounded-md bg-white/85 px-2 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">used in</li>
                  {skillTargets.map((t) => {
                    const on = uses.includes(t.id)
                    return (
                      <li key={t.id}>
                        <a
                          href={t.href}
                          data-holo={`t-${t.id}`}
                          className={cn('hud-clip block border bg-abyss/80 px-3 py-1.5 font-mono text-[11px] transition-all', on ? 'scale-105 border-accent text-accent shadow-[0_6px_14px_-6px_rgba(232,137,12,0.7)]' : skill ? 'border-border text-muted-foreground/60' : 'border-border text-foreground/80 hover:border-primary/60')}
                        >
                          {t.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </>
            )
          }
        </HoloLab>

        {!spatial && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stack.map((g) => (
              <Panel key={g.id} {...panelProps(g)} />
            ))}
          </div>
        )}

        <div className="hud-panel hud-clip mt-5 min-h-[9.5rem] p-5 sm:p-6" aria-live="polite">
          {skill ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default" style={{ color: `color-mix(in srgb, ${group.color} 62%, #1c2430)`, borderColor: `${group.color}80` }}>
                  {selected === skill && !hover ? <Pin className="mr-1 size-3" /> : null}
                  {group.label}
                </Badge>
                <h3 className="font-display text-xl font-bold">{skill}</h3>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/85">{note.text}</p>
              {!spatial && stats && <TechStats key={skill} name={skill} stats={stats} color={group.color} className="mt-4 sm:grid sm:grid-cols-2" />}
              <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>used in</span>
                {uses.length === 0 && <span className="text-foreground/70">no single project on this page</span>}
                {uses.map((u) => (
                  <a key={u} href={targetOf[u].href} className="inline-flex items-center gap-1 rounded-md border border-accent/50 px-2 py-0.5 text-accent hover:bg-accent/10">
                    {targetOf[u].label} <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-display text-xl font-bold">Pick a tool</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/85">
                Hover or focus a tool: the portrait looks toward it and five small boxes show its power, speed, ability, best use and pairings. Tap or press Enter to pin it, Esc to release.
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                The boxes describe the tool, not a rating of me. Gaze is simulated with depth parallax and a small iris shift.
              </p>
            </>
          )}
          <p className="mt-4 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
            also shipped with: <span className="text-foreground/80">{alsoShipped.join(' · ')}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
