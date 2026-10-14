import { about, profile } from '@/data/portfolio'
import { useTilt } from '@/hooks/useTilt'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const TONES = {
  amber: 'border-accent/60 text-accent',
  sky: 'border-[#7fc3ff]/45 text-[#9fd0ff]',
  cyan: 'border-primary/60 text-primary',
}
const BAR = ['bg-primary', 'bg-foreground', 'bg-[#ff7a45]', 'bg-[#7fc3ff]', 'bg-ok']

function IdBadge() {
  const { ref, onPointerMove, onPointerLeave } = useTilt(12)
  return (
    <div data-swing className="relative mx-auto w-full max-w-[340px] [perspective:1200px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {/* lanyard */}
      <div className="mx-auto h-24 w-9 bg-linear-to-b from-[#ff4a3d] to-[#a9120d] shadow-[0_8px_18px_-8px_rgba(224,35,28,0.6)]" aria-hidden="true" />
      <div className="mx-auto -mt-1 h-5 w-14 rounded-b-sm bg-[#3a2f2d]" aria-hidden="true" />
      <div ref={ref} className="tilt relative">
        <div className="hud-panel hud-clip overflow-hidden p-4 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)]">
          <div className="lift mb-3 flex items-center justify-between font-mono text-xs text-primary">
            <span>freelancer pass</span>
            <span>№ 0510</span>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-abyss">
            <img src="/portrait.jpg" alt={`Portrait of ${profile.name}`} className="size-full object-cover" width="420" height="420" />
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
            <Badge className="absolute bottom-3 left-3 bg-black/70">freelance</Badge>
            <div
              className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
              style={{ background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(255,255,255,0.55), transparent 55%)' }}
            />
          </div>
          <div className="lift mt-4">
            <p className="display-title text-3xl text-foreground">{profile.first}</p>
            <p className="display-title text-3xl text-primary">{profile.last}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">Software engineer · MERN + Java</p>
          </div>
          <div
            aria-hidden="true"
            className="mt-4 h-9 opacity-70"
            style={{ background: 'repeating-linear-gradient(90deg,#f4f1e6 0 2px,transparent 2px 4px,#f4f1e6 4px 5px,transparent 5px 9px,#f4f1e6 9px 12px,transparent 12px 14px)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-[360px_1fr] lg:gap-20">
          <IdBadge />
          <div>
            <SectionHeading title={about.headline} className="mb-8" />
            <div data-stagger="up" data-stagger-each="0.12" className="max-w-xl space-y-5 text-lg leading-relaxed text-foreground/85">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p data-reveal="left" className="mt-6 max-w-xl border-l-2 border-primary pl-4 font-serif text-2xl text-foreground italic">{about.quote}</p>

            <ul data-stagger="pop" data-stagger-each="0.1" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: '1 yr', label: 'freelance software engineer', tone: 'cyan' },
                { value: 'SIH 2025', label: 'National winner', tone: 'amber' },
                { value: '500+', label: 'teams outranked', tone: 'sky' },
                { value: '2', label: 'live apps shipped', tone: 'cyan' },
              ].map((c) => (
                <li key={c.label} className={cn('hud-panel hud-clip border p-4', TONES[c.tone])}>
                  <p data-count className="font-display text-2xl font-extrabold tracking-tight">{c.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.label}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 max-w-xl">
              <h3 className="mb-4 font-mono text-sm text-muted-foreground">focus areas</h3>
              <ul className="space-y-3.5">
                {about.focus.map((f, i) => (
                  <li key={f.label} className="grid grid-cols-[9.5rem_1fr] items-center gap-4 text-sm sm:grid-cols-[11rem_1fr]">
                    <span className="text-foreground/90">{f.label}</span>
                    <span className="h-2 rounded-full bg-muted" role="presentation">
                      <span data-bar={f.value} data-bar-delay={i * 0.09} className={cn('block h-full origin-left rounded-full', BAR[i % BAR.length])} style={{ width: `${f.value}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="hud-panel hud-clip mt-10 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-1 p-4">
              <Badge variant="amber">now</Badge>
              <span className="font-medium">{about.now}</span>
              <span className="w-full font-mono text-xs text-muted-foreground sm:w-auto">{about.school}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
