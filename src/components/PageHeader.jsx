import { useRef } from 'react'
import { Link } from 'react-router-dom'
import RedField from '@/components/RedField'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion, whenOpen } from '@/lib/motion'

/** The hero's poster treatment, scaled down for inner pages: red rays, giant title, outlined page number. */
export default function PageHeader({ n, title, lede }) {
  const root = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return undefined
      const q = gsap.utils.selector(root)
      gsap.set(q('[data-h="eyebrow"], [data-h="lede"]'), { autoAlpha: 0, y: 22 })
      gsap.set(q('[data-h="title"]'), { autoAlpha: 0 })
      gsap.set(q('.page-numeral-inner'), { autoAlpha: 0 })
      let alive = true

      const play = contextSafe(() => {
        const split = new SplitText(q('[data-h="title"]'), { type: 'lines,chars', mask: 'lines' })
        gsap.set(q('[data-h="title"]'), { autoAlpha: 1 })
        gsap
          .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() })
          .fromTo(q('.page-numeral-inner'), { autoAlpha: 0, yPercent: 30, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.8 }, 0)
          .to(q('[data-h="eyebrow"]'), { autoAlpha: 1, y: 0, duration: 0.9 }, 0.1)
          .from(split.chars, { yPercent: 120, rotate: 4, duration: 1.15, stagger: 0.028 }, 0.15)
          .to(q('[data-h="lede"]'), { autoAlpha: 1, y: 0, duration: 1 }, 0.55)
      })
      Promise.all([document.fonts?.ready ?? Promise.resolve(), whenOpen()]).then(() => alive && play())

      // leaving: the numeral lags behind the page, the title thins out
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 }, defaults: { ease: 'none' } })
        .to(q('.page-numeral'), { yPercent: 26 }, 0)
        .to(q('[data-h="drift"]'), { yPercent: -16, opacity: 0.1 }, 0)

      return () => {
        alive = false
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="hero-poster page-header relative isolate overflow-hidden">
      <RedField center={[0.8, 0.46]} className="absolute inset-0 -z-20 h-full w-full" />
      <div className="hero-vignette absolute inset-0 -z-10" aria-hidden="true" />
      <span className="page-numeral" aria-hidden="true">
        <span className="page-numeral-inner block">{n}</span>
      </span>
      <div className="relative mx-auto flex min-h-[58svh] w-full max-w-[1680px] flex-col justify-end px-5 pt-32 pb-10 sm:px-8 lg:px-[4.5vw] lg:pb-14">
        <div data-h="drift">
          <p data-h="eyebrow" className="hero-eyebrow">
            <Link to="/" className="text-[var(--hero-dim)] transition-colors hover:text-[var(--hero-ink)]">
              Home
            </Link>
            <span className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-[var(--hero-red)]" />
              {n} — {title}
            </span>
          </p>
          <h1 data-h="title" className="hero-name page-title mt-5">
            {title}
          </h1>
          <p data-h="lede" className="hero-body mt-6 max-w-xl text-lg">
            {lede}
          </p>
        </div>
      </div>
    </section>
  )
}
