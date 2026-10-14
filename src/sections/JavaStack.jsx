import { useRef, useState } from 'react'
import { Coffee, Container, Database, FlaskConical, Layers, Orbit, ShieldCheck } from 'lucide-react'
import Stage from '@/components/Stage'
import CodeBlock from '@/components/CodeBlock'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { createJavaStack } from '@/three/scenes/javaStack'
import { javaCode, javaLayers, javaTopics } from '@/data/portfolio'
import { useTilt } from '@/hooks/useTilt'

const ICONS = { Coffee, Layers, ShieldCheck, Database, FlaskConical, Container }
const byId = Object.fromEntries(javaLayers.map((l) => [l.id, l]))
const VARIANT = { cyan: 'default', sky: 'sky', amber: 'amber', violet: 'violet', green: 'ok' }

function Topic({ t }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(8)
  const Icon = ICONS[t.icon] ?? Layers
  return (
    <li className="[perspective:1000px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div ref={ref} className="tilt hud-panel hud-clip h-full p-5">
        <span className="lift mb-4 grid size-11 place-items-center border border-primary/50 bg-abyss/70">
          <Icon className="size-5 text-primary" />
        </span>
        <h3 className="lift font-display text-xl font-bold tracking-tight">{t.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
      </div>
    </li>
  )
}

export default function JavaBody() {
  const api = useRef(null)
  const cb = useRef({})
  const [hover, setHover] = useState(null)
  const [selected, setSelected] = useState(null)
  const [, setTab] = useState(javaCode[0].id)
  cb.current.onHover = setHover
  cb.current.onSelect = (id) => {
    const next = selected === id ? null : id
    setSelected(next)
    api.current?.setSelected(next)
    // Layers that have a code tab jump the code panel to it
    if (next && javaCode.some((c) => c.id === next)) setTab(next)
  }

  const create = ({ el }) =>
    createJavaStack({ el, layers: javaLayers, onHover: (id) => cb.current.onHover(id), onSelect: (id) => cb.current.onSelect(id) })

  const focus = byId[hover ?? selected]

  return (
    <div>
        <div data-reveal="fade" data-cursor="Drag" className="hud-clip relative overflow-hidden border border-border bg-abyss/20">
          <Stage
            create={create}
            onReady={(s) => (api.current = s)}
            className="h-[min(100vw,520px)] w-full select-none lg:h-[600px]"
            role="img"
            aria-label="Interactive 3D stack of a Spring Boot service: React UI, REST controllers, security filter chain, service layer, repositories and PostgreSQL, with a request travelling down and the response back up, next to a steaming Java mug."
          />
          <div className="pointer-events-none absolute top-4 left-4 max-w-[17rem] sm:max-w-xs" aria-live="polite">
            <div className="hud-panel hud-clip bg-abyss/80 p-4">
              {focus ? (
                <>
                  <Badge variant={VARIANT[focus.tone]} className="mb-2">
                    {selected === focus.id && !hover ? 'pinned · layer' : 'layer'}
                  </Badge>
                  <h3 className="font-display text-xl font-bold leading-tight">{focus.title}</h3>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{focus.sub}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{focus.note}</p>
                </>
              ) : (
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <Orbit className="mt-0.5 size-4 shrink-0 text-primary" />
                  Drag to rotate. Hover a layer to see what lives in it.
                </p>
              )}
            </div>
          </div>
          <ul className="pointer-events-none absolute right-4 bottom-4 hidden gap-4 font-mono text-xs text-muted-foreground sm:flex">
            <li className="flex items-center gap-2"><span className="h-px w-5 bg-primary" /> request down</li>
            <li className="flex items-center gap-2"><span className="h-px w-5 bg-accent" /> response up</li>
          </ul>
        </div>

        <ul data-stagger="rise" data-stagger-each="0.08" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {javaTopics.map((t) => (
            <Topic key={t.title} t={t} />
          ))}
        </ul>

        {/* <div className="hud-panel hud-clip mt-8 overflow-hidden">
          <Tabs value={tab} onValueChange={setTab} className="gap-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <TabsList className="flex-wrap" aria-label="Spring Boot code samples">
                {javaCode.map((c) => (
                  <TabsTrigger key={c.id} value={c.id}>
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Badge variant="outline">Spring Boot 3 · Java 21</Badge>
            </div>
            {javaCode.map((c) => (
              <TabsContent key={c.id} value={c.id} className="min-w-0">
                <p className="border-b border-border/60 px-5 py-2 font-mono text-xs text-muted-foreground">{c.file}</p>
                <CodeBlock code={c.code} label={`${c.label} code sample, ${c.file}`} />
              </TabsContent>
            ))}
          </Tabs>
        </div> */}
    </div>
  )
}
