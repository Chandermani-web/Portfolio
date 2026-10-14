import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { hold, prefersReducedMotion, scrollToTop } from '@/lib/motion'
import { nav } from '@/data/portfolio'

const labelFor = (path) => (path === '/' ? 'Home' : (nav.find((n) => n.path === path)?.label ?? ''))

/**
 * Page curtain. Internal link clicks are intercepted: two slabs rise to cover the page, the route changes underneath,
 * then they lift away and the new page plays its own entrance. Back/forward and reduced motion skip the curtain.
 */
export default function RouteTransition() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const red = useRef(null)
  const ink = useRef(null)
  const label = useRef(null)
  const busy = useRef(null) // { release, to } while a transition is running
  const first = useRef(true)

  // 1. Intercept internal navigation and run the cover animation
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) {
        if (!url.hash) {
          e.preventDefault()
          e.stopPropagation()
          scrollToTop(false)
        }
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (busy.current) return
      if (prefersReducedMotion()) {
        navigate(url.pathname + url.search + url.hash)
        return
      }

      busy.current = { release: hold(), to: url.pathname }
      label.current.textContent = labelFor(url.pathname)
      gsap.set([red.current, ink.current], { yPercent: 102, borderRadius: '50% 50% 0 0 / 14vh 14vh 0 0', display: 'block' })
      gsap.set(label.current, { yPercent: 110, opacity: 1 })
      gsap
        .timeline({ onComplete: () => navigate(url.pathname + url.search + url.hash) })
        .to(red.current, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' }, 0)
        .to(ink.current, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' }, 0.09)
        .to(label.current, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, 0.45)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate])

  // 2. The route has changed: lift the curtain
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return undefined
    }
    const job = busy.current
    if (!job) return undefined
    scrollToTop(true)
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([red.current, ink.current], { display: 'none' })
        busy.current = null
      },
    })
    tl.to(label.current, { yPercent: -110, duration: 0.45, ease: 'power3.in' }, 0.25)
      .set([red.current, ink.current], { borderRadius: '0 0 50% 50% / 0 0 14vh 14vh' }, 0.5)
      .call(() => job.release(), null, 0.62) // page entrance starts while the slabs are still leaving
      .to(ink.current, { yPercent: -102, duration: 0.85, ease: 'expo.inOut' }, 0.5)
      .to(red.current, { yPercent: -102, duration: 0.85, ease: 'expo.inOut' }, 0.58)
    return () => tl.kill()
  }, [pathname])

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div ref={red} className="absolute inset-0 hidden bg-[#e0231c]" />
      <div ref={ink} className="hero-poster absolute inset-0 hidden">
        <div className="grid h-full place-items-center overflow-hidden">
          <p ref={label} className="hero-name px-4 text-center text-[clamp(2.4rem,11vw,9rem)]">{''}</p>
        </div>
      </div>
    </div>
  )
}
