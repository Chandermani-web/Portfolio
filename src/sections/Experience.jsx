import { useEffect, useRef, useState } from 'react'
import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { timeline } from '@/data/portfolio'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const ICON = { Freelance: Briefcase, Education: GraduationCap, Award }
const COLOR = { sky: '#0284c7', cyan: '#0b7285', amber: '#b45309' }
const VARIANT = { sky: 'sky', cyan: 'default', amber: 'amber' }

export default function Experience() {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    let raf = 0
    const calc = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setFill(Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Experience & education." />

        <ol ref={ref} className="relative space-y-10 pl-14 sm:pl-20">
          {/* spine: dim track + glowing fill that follows scroll */}
          <span className="absolute top-3 bottom-3 left-[19px] w-px bg-border sm:left-[27px]" aria-hidden="true" />
          <span
            className="absolute top-3 bottom-3 left-[19px] w-px origin-top bg-primary sm:left-[27px]"
            style={{ transform: `scaleY(${fill})` }}
            aria-hidden="true"
          />
          {timeline.map((t) => {
            const Icon = ICON[t.kind]
            const c = COLOR[t.tone]
            return (
              <li key={t.title} className="relative">
                <span
                  className="absolute top-5 -left-14 grid size-10 place-items-center border bg-abyss sm:-left-20 sm:size-14 rounded-md"
                  style={{ borderColor: c, color: c, boxShadow: `0 8px 18px -8px ${c}88` }}
                >
                  <Icon className="size-4 sm:size-5" />
                </span>
                <p className="mb-2 font-mono text-xs text-muted-foreground sm:text-sm">{t.when}</p>
                <article
                  className={cn('hud-panel rounded-sm p-5 sm:p-7')}
                  style={{ boxShadow: `6px 6px 0 ${c}33`, borderColor: `${c}66` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t.title}</h3>
                    <Badge variant={VARIANT[t.tone]}>{t.kind.toLowerCase()}</Badge>
                  </div>
                  <p className="mt-1 font-medium" style={{ color: c }}>{t.org}</p>
                  <p className="font-mono text-xs text-muted-foreground">{t.place}</p>
                  <ul className="mt-4 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                        <span className="mt-[7px] size-1.5 shrink-0 rotate-45" style={{ background: c }} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
