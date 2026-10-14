import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '@/lib/motion'
import { nav, profile } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="hero-poster relative z-10 border-t border-white/12 px-5 pt-16 pb-6 sm:px-8">
      <div data-stagger="up" data-stagger-each="0.14" className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display-title text-[clamp(1.8rem,3.4vw,3rem)]">{profile.first}</p>
          <p className="display-title text-[clamp(1.8rem,3.4vw,3rem)] text-[var(--hero-red)]">{profile.last}</p>
          <p className="mt-4 max-w-xs text-sm font-light text-[var(--hero-dim)]">{profile.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="hero-meta mb-4">Pages</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {nav.map((n, i) => (
              <li key={n.id}>
                <Link to={n.path} className="flex items-baseline gap-2 text-[var(--hero-ink)]/80 transition-colors hover:text-[var(--hero-red)]">
                  <span className="text-[10px] text-[var(--hero-dim)]">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="hero-meta mb-4">Reach me</p>
          <a href={`mailto:${profile.email}`} className="block break-all text-[var(--hero-ink)]/80 transition-colors hover:text-[var(--hero-red)]">
            {profile.email}
          </a>
          <p className="mt-2 font-light text-[var(--hero-dim)]">{profile.location}</p>
        </div>
      </div>
      <div data-reveal className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/12 pt-5 text-[11px] tracking-[0.14em] text-[var(--hero-dim)] uppercase sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="normal-case tracking-normal">Built with Vite, React, Tailwind, shadcn/ui and three.js</p>
        <button type="button" onClick={() => scrollToTop(false)} className="group flex cursor-pointer items-center gap-1.5 uppercase transition-colors hover:text-[var(--hero-red)]">
          Back to top <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  )
}
