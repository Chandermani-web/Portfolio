import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav } from '@/data/portfolio'

/** Home's table of contents: every page as one big row, like the poster's numbered menu. */
export default function HomeIndex() {
  return (
    <section id="index" className="relative px-5 py-24 sm:px-8 md:py-32" aria-labelledby="index-title">
      <div className="mx-auto max-w-7xl">
        <p data-reveal="left" className="eyebrow mb-5">
          <b>01</b>
          <span>Index</span>
        </p>
        <h2 id="index-title" data-split="lines" className="display-title mb-10 max-w-3xl text-[clamp(2rem,4.6vw,4rem)] text-balance md:mb-14">
          Pick a door.
        </h2>
        <span data-line className="block h-px bg-border" aria-hidden="true" />
        <ol data-stagger="rise" data-stagger-each="0.07">
          {nav.map((n, i) => (
            <li key={n.id} className="border-b border-border">
              <Link
                to={n.path}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 px-1 py-5 transition-[background-color,padding] duration-300 hover:bg-white/[0.04] hover:pl-4 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:py-7"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span className="display-title text-[clamp(1.6rem,4.2vw,3.5rem)] transition-colors duration-300 group-hover:text-primary">{n.label}</span>
                <span className="col-start-2 max-w-md text-sm leading-snug font-light text-muted-foreground md:col-start-3">{n.lede}</span>
                <ArrowUpRight className="col-start-3 row-start-1 size-6 text-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary md:col-start-4" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
