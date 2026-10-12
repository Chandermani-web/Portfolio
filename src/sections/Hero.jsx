import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Move3d } from 'lucide-react'
import Stage from '@/components/Stage'
import { Button } from '@/components/ui/button'
import { createHeroScene } from '@/three/scenes/hero'
import { heroStats, heroTags, heroTags2, profile } from '@/data/portfolio'

const LINE = 'MERN & Java full-stack apps, scalable APIs and GenAI workflows.'

function useTyped(text, speed = 34, delay = 900) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length)
      return
    }
    let i = 0
    let id
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) clearInterval(id)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [text, speed, delay])
  return text.slice(0, n)
}

const create = ({ el }) => createHeroScene({ el, portraitUrl: '/portrait.jpg', tags: heroTags, tags2: heroTags2 })

export default function Hero() {
  const typed = useTyped(LINE)
  return (
    <section id="top" className="relative flex min-h-svh items-center px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-2">
        <div className="relative z-10">
          <p className="mb-5 flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="inline-block h-px w-10 bg-primary" />
            hi there, I’m
          </p>
          <h1 className="display-title text-[clamp(3rem,5.8vw,5.6rem)]">
            <span className="block text-foreground glow-text">{profile.first}</span>
            <span
              className="block"
              style={{ WebkitTextStroke: '2px var(--primary)', color: 'rgba(11,114,133,0.07)' }}
            >
              {profile.last}
            </span>
          </h1>

          <p className="mt-8 min-h-[3.2rem] max-w-md font-mono text-base leading-relaxed text-foreground/85 sm:text-lg" aria-label={LINE}>
            <span aria-hidden="true" className={typed.length < LINE.length ? 'cursor-blink' : ''}>
              <span className="text-primary">&gt; </span>
              {typed}
            </span>
          </p>

          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-ok/40 bg-ok/10 px-3.5 py-1.5 font-mono text-xs text-ok sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            Freelance software engineer · taking new projects
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contact">
                Hire me <ArrowUpRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#projects">
                See projects <ArrowDown />
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <Stage create={create} className="h-[min(98vw,560px)] w-full lg:-mr-10 lg:h-[min(80vh,680px)] lg:w-[calc(100%+2.5rem)]" role="img" aria-label={`a large circular portrait of Chandermani ringed by two orbits of tool tags: ${[...heroTags, ...heroTags2].join(', ')}`} />
          <p className="pointer-events-none absolute right-2 bottom-1 hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
            <Move3d className="size-4" /> move over the core, click to pulse
          </p>
        </div>
      </div>
    </section>
  )
}
