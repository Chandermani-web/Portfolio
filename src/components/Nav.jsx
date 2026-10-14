import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { nav } from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { motion, prefersReducedMotion, whenOpen } from '@/lib/motion'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
      <svg viewBox="0 0 40 40" className="size-9 transition-transform duration-500 group-hover:rotate-60" aria-hidden="true">
        <path d="M20 3l15 8.5v17L20 37 5 28.5v-17z" fill="rgba(236,47,37,0.14)" stroke="#ec2f25" strokeWidth="2" />
        <path d="M20 9l10 5.8v10.4L20 31 10 25.2V14.8z" fill="none" stroke="#f4f1e6" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">CM</span>
    </Link>
  )
}

/** Mobile menu links: they cascade in each time the sheet opens. */
function MenuLinks() {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from(ref.current.children, { yPercent: 60, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'expo.out', delay: 0.08 })
    },
    { scope: ref },
  )
  return (
    <nav ref={ref} className="flex flex-col">
      <DialogClose asChild>
        <Link to="/" className="border-b border-border/60 py-3.5 font-display text-2xl font-extrabold tracking-tight uppercase hover:text-primary">
          Home
        </Link>
      </DialogClose>
      {nav.map((n) => (
        <DialogClose asChild key={n.id}>
          <Link to={n.path} className="border-b border-border/60 py-3.5 font-display text-2xl font-extrabold tracking-tight uppercase last:border-0 hover:text-primary">
            {n.label}
          </Link>
        </DialogClose>
      ))}
    </nav>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const bar = useRef(null)

  // page scroll is paused behind the open menu
  useEffect(() => {
    if (open) motion.lenis?.stop()
    else motion.lenis?.start()
    return () => motion.lenis?.start()
  }, [open])

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(bar.current, { scaleX: 0 })
        const sync = () => {
          const max = document.documentElement.scrollHeight - window.innerHeight
          gsap.set(bar.current, { scaleX: max > 0 ? window.scrollY / max : 0 })
        }
        window.addEventListener('scroll', sync, { passive: true })
        return () => window.removeEventListener('scroll', sync)
      }

      // the bar drops in once the curtain is gone
      gsap.set(header.current, { yPercent: -140, autoAlpha: 0 })
      whenOpen().then(() => gsap.to(header.current, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', delay: 0.5 }))

      // reading progress, scrubbed (no React renders per scroll tick)
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

      // away on the way down, back on the way up
      let hidden = false
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          const shouldHide = self.direction === 1 && y > 240
          if (shouldHide !== hidden && (shouldHide || self.direction === -1 || y <= 240)) {
            hidden = shouldHide
            gsap.to(header.current, { yPercent: hidden ? -140 : 0, duration: 0.6, ease: hidden ? 'power3.in' : 'expo.out', overwrite: 'auto' })
          }
        },
      })
      return undefined
    },
    { scope: header },
  )

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="hud-panel mx-auto flex max-w-7xl [background:rgba(10,8,8,0.92)]! items-center justify-between gap-4 rounded-sm px-4 py-2.5 sm:px-5">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {nav.map((n, i) => (
            <NavLink
              key={n.id}
              to={n.path}
              className={({ isActive }) =>
                cn(
                  'relative flex items-baseline gap-1.5 rounded-sm px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-foreground/70 uppercase transition-colors hover:text-foreground',
                  isActive && 'text-primary',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-[9px] font-normal text-foreground/40">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                  <span className={cn('absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300', isActive && 'scale-x-100')} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase 2xl:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            open for freelance
          </span>
          <Button asChild size="sm" className="hidden sm:inline-flex" data-magnetic="0.25">
            <Link to="/contact">Hire me</Link>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="outline" size="icon" shape="soft" className="xl:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu />
            </Button>
            <DialogContent className="top-24 translate-y-0 sm:max-w-sm">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Go to a page</DialogDescription>
              <MenuLinks />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-[-3px] mx-auto h-px max-w-7xl sm:inset-x-6" aria-hidden="true">
        <div ref={bar} className="h-full origin-left scale-x-0 rounded-full bg-primary" />
      </div>
    </header>
  )
}
