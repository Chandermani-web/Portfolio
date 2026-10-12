import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { nav } from '@/data/portfolio'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const ids = nav.map((n) => n.id)

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
      <svg viewBox="0 0 40 40" className="size-9 transition-transform duration-500 group-hover:rotate-60" aria-hidden="true">
        <path d="M20 3l15 8.5v17L20 37 5 28.5v-17z" fill="rgba(11,114,133,0.08)" stroke="#0b7285" strokeWidth="2" />
        <path d="M20 9l10 5.8v10.4L20 31 10 25.2V14.8z" fill="none" stroke="#e8890c" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">CM</span>
    </a>
  )
}

export default function Nav() {
  const active = useScrollSpy(ids)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="hud-panel mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 sm:px-5">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              className={cn(
                'relative rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground',
                active === n.id && 'text-primary',
              )}
            >
              {n.label}
              <span className={cn('absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300', active === n.id && 'scale-x-100')} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-xs text-muted-foreground xl:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            open for freelance
          </span>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Hire me</a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="outline" size="icon" shape="soft" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu />
            </Button>
            <DialogContent className="top-24 translate-y-0 sm:max-w-sm">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Jump to a section</DialogDescription>
              <nav className="flex flex-col">
                {nav.map((n) => (
                  <DialogClose asChild key={n.id}>
                    <a href={`#${n.id}`} className="border-b border-border/60 py-3.5 font-display text-2xl font-bold tracking-tight last:border-0 hover:text-primary">
                      {n.label}
                    </a>
                  </DialogClose>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-[-3px] mx-auto h-px max-w-6xl sm:inset-x-6" aria-hidden="true">
        <div className="h-full origin-left rounded-full bg-accent" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  )
}
