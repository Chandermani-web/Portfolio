import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { hold, prefersReducedMotion } from '@/lib/motion'
import { profile } from '@/data/portfolio'

// Taken at import time, before any page mounts, so the hero's intro waits for the curtain to lift.
const skip = typeof window === 'undefined' || prefersReducedMotion()
const release = skip ? () => {} : hold()

/** One-time intro: a counter climbs to 100 while the name settles in, then the slab lifts away like a stage curtain. */
export default function Preloader() {
  const root = useRef(null)
  const [gone, setGone] = useState(skip)

  useGSAP(
    () => {
      if (skip) return undefined
      const counter = { v: 0 }
      const num = root.current.querySelector('[data-num]')
      const fontsReady = document.fonts?.ready ?? Promise.resolve()
      const tl = gsap.timeline({ paused: true, onComplete: () => { release(); setGone(true) } })

      gsap.set('[data-pre-line]', { yPercent: 110 })
      gsap.set('[data-pre-fade]', { opacity: 0, y: 12 })

      tl.to('[data-pre-line]', { yPercent: 0, duration: 1, stagger: 0.09, ease: 'expo.out' }, 0.1)
        .to('[data-pre-fade]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.3)
        .to(counter, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, '0') } }, 0.1)
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.1)
        .to('[data-pre-sun]', { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.2)
        .addLabel('out', '+=0.15')
        .to('[data-pre-line]', { yPercent: -110, duration: 0.7, stagger: 0.05, ease: 'power3.in' }, 'out')
        .to('[data-pre-fade]', { opacity: 0, y: -10, duration: 0.4, stagger: 0.03 }, 'out')
        .to('[data-pre-sun]', { scale: 14, duration: 1, ease: 'expo.in' }, 'out')
        .set(root.current, { borderRadius: '0 0 50% 50% / 0 0 12vh 12vh' }, 'out+=0.3')
        .to(root.current, { yPercent: -102, duration: 1, ease: 'expo.inOut' }, 'out+=0.45')

      // never wait on fonts for more than a moment
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => tl.play())
      return () => tl.kill()
    },
    { scope: root },
  )

  if (gone) return null
  return (
    <div ref={root} className="hero-poster fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden px-5 py-6 sm:px-8 sm:py-8" role="status" aria-label="Loading">
      <div className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div data-pre-sun className="size-full scale-0 rounded-full bg-[radial-gradient(circle_at_34%_28%,#ff5144,#e0231c_55%,#a9120d)] shadow-[0_0_140px_20px_rgba(224,35,28,0.35)]" />
      </div>

      <div className="relative flex items-start justify-between text-[11px] font-semibold tracking-[0.2em] uppercase">
        <span data-pre-fade>Portfolio — 2026</span>
        <span data-pre-fade className="text-[var(--hero-dim)]">{profile.location}</span>
      </div>

      <div className="relative">
        <div className="overflow-hidden pb-[0.06em]">
          <p data-pre-line className="hero-name text-[clamp(2.4rem,11vw,9rem)]">{profile.first}</p>
        </div>
        <div className="overflow-hidden pb-[0.06em]">
          <p data-pre-line className="hero-name hero-name-outline text-[clamp(2.4rem,11vw,9rem)]">{profile.last}</p>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-white/15">
            <div data-pre-bar className="h-full origin-left scale-x-0 bg-[var(--hero-red)]" />
          </div>
          <span data-num data-pre-fade className="font-mono text-sm tabular-nums">000</span>
        </div>
      </div>
    </div>
  )
}
