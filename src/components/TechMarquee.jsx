import { useRef } from 'react'
import { stack } from '@/data/portfolio'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const ALL = [...new Set(stack.flatMap((g) => g.items))]
const HALF = Math.ceil(ALL.length / 2)
const ROWS = [ALL.slice(0, HALF), ALL.slice(HALF)]

function Track({ items, outline }) {
  // the list is doubled so a -50% shift loops seamlessly
  return (
    <div className="flex w-max items-center will-change-transform" data-track>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {items.map((t) => (
            <span key={t + copy} className="flex items-center">
              <span className={`display-title px-[2.2vw] text-[clamp(2.6rem,7vw,6.5rem)] whitespace-nowrap ${outline ? 'text-transparent [-webkit-text-stroke:1.5px_var(--primary)] md:[-webkit-text-stroke:2px_var(--primary)]' : 'text-foreground'}`}>{t}</span>
              <span className="size-[clamp(0.5rem,1vw,0.9rem)] shrink-0 rotate-45 bg-primary" aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Two rows of tools drifting in opposite directions. Scrolling pushes them faster, in the direction you scroll. */
export default function TechMarquee() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tracks = root.current.querySelectorAll('[data-track]')
      const tweens = [...tracks].map((t, i) =>
        gsap.fromTo(t, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, ease: 'none', duration: 46 - i * 8, repeat: -1 }),
      )
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 9, 1 + Math.abs(self.getVelocity()) / 260)
          tweens.forEach((tw) => {
            tw.timeScale(boost * self.direction)
            gsap.to(tw, { timeScale: 1, duration: 1.1, ease: 'power2.out', overwrite: true })
          })
        },
      })
      // enters with a slight tilt that settles as it crosses the screen
      gsap.fromTo(root.current.querySelector('[data-rows]'), { rotate: 2.2 }, { rotate: -1.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden border-y border-border py-10 md:py-14" aria-label="Tools I work with">
      <p className="sr-only">Tools I work with: {ALL.join(', ')}.</p>
      <div data-rows className="flex origin-center flex-col gap-3 md:gap-5" aria-hidden="true">
        <Track items={ROWS[0]} />
        <Track items={ROWS[1]} outline />
      </div>
    </section>
  )
}
