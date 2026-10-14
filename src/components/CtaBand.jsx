import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/** Closing call to action for the home page. */
export default function CtaBand() {
  return (
    <section className="hero-poster relative isolate overflow-hidden px-5 py-24 sm:px-8 md:py-36" aria-label="Start a project">
      <div className="hero-vignette absolute inset-0 -z-10" aria-hidden="true" />
      <div data-parallax="0.5" className="absolute top-1/2 right-[-8vw] -z-20 aspect-square w-[min(60vw,520px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff5144,#e0231c_55%,#a9120d)] opacity-90 blur-[2px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <p data-reveal="left" className="hero-eyebrow mb-6">Taking new projects</p>
        <h2 data-split="lines" className="hero-name text-[clamp(2.6rem,9vw,8.5rem)]">
          Have a build
          <span className="hero-name-outline block">in mind?</span>
        </h2>
        <div data-stagger="pop" data-stagger-each="0.12" className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className="hero-btn hero-btn-solid" data-magnetic="0.3">
            Hire me <ArrowUpRight className="size-4" />
          </Link>
          <Link to="/services" className="hero-btn hero-btn-ghost" data-magnetic="0.3">
            What I build
          </Link>
        </div>
      </div>
    </section>
  )
}
