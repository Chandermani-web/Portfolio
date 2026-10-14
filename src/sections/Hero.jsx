import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import RedField from '@/components/RedField'
import { heroStats, profile } from '@/data/portfolio'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { isFinePointer, prefersReducedMotion, whenOpen } from '@/lib/motion'

const LINE = 'MERN & Java full-stack apps, scalable APIs and GenAI workflows.'

/** Dark poster hero: giant name, one red sun, the portrait in front of it. Everything below it stays on cream paper. */
export default function Hero() {
  const sectionRef = useRef(null)
  const orbRef = useRef(null)
  const [sun, setSun] = useState([0.78, 0.5])

  // the rays meet at the middle of the sun/portrait, wherever the layout puts it (y is up in GL)
  useLayoutEffect(() => {
    const section = sectionRef.current
    const orb = orbRef.current
    if (!section || !orb) return undefined
    const measure = () => {
      const s = section.getBoundingClientRect()
      const o = orb.getBoundingClientRect()
      if (!s.width || !s.height) return
      setSun([(o.left + o.width / 2 - s.left) / s.width, 1 - (o.top + o.height / 2 - s.top) / s.height])
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(section)
    ro.observe(orb)
    return () => ro.disconnect()
  }, [])

  /* ---------- Intro, pointer depth and scroll exit ---------- */
  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return undefined
      const root = sectionRef.current
      const q = gsap.utils.selector(root)
      const quiet = q('[data-h="eyebrow"], [data-h="meta"], [data-h="body"], [data-h="cta"], [data-h="foot"]')
      const orbParts = q('.hero-orb-sun, .hero-orb-ring, .hero-orb-photo')

      // hidden before first paint; the curtain is still closed, so nothing flashes
      gsap.set(quiet, { autoAlpha: 0, y: 26 })
      gsap.set(q('[data-h="name"], [data-h="tagline"]'), { autoAlpha: 0 })
      gsap.set(orbParts, { autoAlpha: 0 })
      let alive = true

      const play = contextSafe(() => {
        const name = new SplitText(q('[data-h="name"]'), { type: 'lines,chars', mask: 'lines' })
        const tag = new SplitText(q('[data-h="tagline"]'), { type: 'lines', mask: 'lines' })
        gsap.set(q('[data-h="name"], [data-h="tagline"]'), { autoAlpha: 1 })

        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          onComplete: () => {
            name.revert()
            tag.revert()
            // idle life: the sun breathes, the ring keeps a slow turn
            gsap.to(q('.hero-orb-sun'), { scale: 1.035, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
            gsap.to(q('.hero-orb-ring'), { rotate: 360, duration: 90, ease: 'none', repeat: -1 })
          },
        })

        tl.fromTo(q('.hero-orb-sun'), { autoAlpha: 0, scale: 0.15 }, { autoAlpha: 1, scale: 1, duration: 1.9 }, 0)
          .fromTo(q('.hero-orb-ring'), { autoAlpha: 0, scale: 1.35, rotate: -120 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 2.1 }, 0.1)
          .fromTo(q('.hero-orb-photo'), { autoAlpha: 1, clipPath: 'circle(0% at 50% 50%)', scale: 1.3 }, { clipPath: 'circle(50% at 50% 50%)', scale: 1, duration: 1.7, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.35)
          .from(name.chars, { yPercent: 118, rotate: 5, duration: 1.2, stagger: { each: 0.03, from: 'start' } }, 0.2)
          .to(q('[data-h="eyebrow"]'), { autoAlpha: 1, y: 0, duration: 1 }, 0.15)
          .to(q('[data-h="meta"]'), { autoAlpha: 1, y: 0, duration: 1 }, 0.75)
          .from(tag.lines, { yPercent: 120, duration: 1.2, stagger: 0.12 }, 0.85)
          .to(q('[data-h="body"]'), { autoAlpha: 1, y: 0, duration: 1 }, 1.05)
          .to(q('[data-h="cta"]'), { autoAlpha: 1, y: 0, duration: 1 }, 1.2)
          .to(q('[data-h="foot"]'), { autoAlpha: 1, y: 0, duration: 1 }, 1.35)
          .fromTo(q('[data-h="foot-rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 1.3)
      })

      Promise.all([document.fonts?.ready ?? Promise.resolve(), whenOpen()]).then(() => alive && play())

      // pointer depth: sun, ring and portrait drift at different rates
      let offPointer
      if (isFinePointer()) {
        const mk = (sel, amt) => ({ amt, x: gsap.quickTo(q(sel)[0], 'x', { duration: 1.1, ease: 'power3' }), y: gsap.quickTo(q(sel)[0], 'y', { duration: 1.1, ease: 'power3' }) })
        const layers = [mk('.hero-orb-photo', 18), mk('.hero-orb-sun', -12), mk('.hero-orb-ring', -26)]
        const onMove = (e) => {
          const r = root.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          layers.forEach((l) => { l.x(nx * l.amt * 2); l.y(ny * l.amt * 2) })
        }
        root.addEventListener('pointermove', onMove)
        offPointer = () => root.removeEventListener('pointermove', onMove)
      }

      // scroll exit: the copy drifts up and thins out, the sun pulls back, the ring unwinds
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 }, defaults: { ease: 'none' } })
        .to(q('[data-h="drift"]'), { yPercent: -14, opacity: 0.15 }, 0)
        .to(q('[data-h="orb"]'), { scale: 0.86, opacity: 0.5 }, 0)
        .to(q('.hero-vertical'), { opacity: 0 }, 0)

      return () => {
        alive = false
        offPointer?.()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="top" className="hero-poster relative isolate min-h-svh overflow-hidden">
      <RedField center={sun} className="absolute inset-0 -z-20 h-full w-full" />
      <div className="hero-vignette absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-[1680px] flex-col px-5 pt-24 pb-5 sm:px-8 lg:px-[4.5vw] lg:pt-28">
        <p data-h="eyebrow" className="hero-eyebrow">
          <span className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--hero-red)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--hero-red)]" />
            </span>
            Taking new projects
          </span>
          <span className="text-[var(--hero-dim)]">Freelance software engineer</span>
        </p>

        <div className="relative flex flex-1 flex-col justify-center py-8 lg:py-6">
          {/* the sun, with the portrait set in front of it */}
          <div ref={orbRef} className="hero-orb relative mx-auto mb-8 lg:absolute lg:top-1/2 lg:right-0 lg:mb-0 lg:-translate-y-1/2" data-cursor="Hello">
            <div data-h="orb" className="absolute inset-0">
              <span className="hero-orb-ring" aria-hidden="true" />
              <span className="hero-orb-sun" aria-hidden="true" />
              <img src="/portrait.jpg" alt={`Portrait of ${profile.name}`} className="hero-orb-photo" width="420" height="420" fetchPriority="high" />
            </div>
          </div>

          <div data-h="drift" className="relative z-10">
            <h1 data-h="name" className="hero-name">
              <span className="block">{profile.first}</span>
              <span className="hero-name-outline block">{profile.last}</span>
            </h1>
            <p data-h="meta" className="hero-meta-label mt-4">
              {profile.role} &nbsp;·&nbsp; MERN &amp; Java
            </p>

            <div className="mt-7 max-w-2xl lg:mt-9">
              <p data-h="tagline" className="hero-tagline">
                From the first screen to the live deploy.
              </p>
              <p data-h="body" className="hero-body mt-4 max-w-md">
                {LINE}
              </p>
              <div data-h="cta" className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="hero-btn hero-btn-solid" data-magnetic="0.3">
                  Hire me <ArrowUpRight className="size-4" />
                </Link>
                <Link to="/projects" className="hero-btn hero-btn-ghost" data-magnetic="0.3">
                  See projects <ArrowDown className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div data-h="foot" className="relative grid items-end gap-4 pt-4 sm:grid-cols-[1fr_1fr_2fr]">
          <span data-h="foot-rule" className="absolute inset-x-0 top-0 h-px origin-left bg-white/12" aria-hidden="true" />
          <a href="#index" className="hero-meta group hidden flex-col gap-1.5 sm:flex">
            <span className="flex items-center gap-2 text-[var(--hero-ink)]">
              Scroll to explore
              <ArrowDown className="size-3 animate-bounce text-[var(--hero-red)]" />
            </span>
            <span>The work begins below</span>
          </a>
          <p className="hero-meta hidden flex-col gap-1.5 sm:flex">
            <span className="text-[var(--hero-ink)]">28.69° N · 76.93° E</span>
            <span>{profile.location}</span>
          </p>
          <dl className="grid grid-cols-3 gap-4">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-meta flex flex-col gap-1.5">
                <dt className="hero-stat" data-count>{s.value}</dt>
                <dd className="max-w-[18ch] leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <span className="hero-vertical" aria-hidden="true">
        Portfolio — 2026
      </span>
    </section>
  )
}
