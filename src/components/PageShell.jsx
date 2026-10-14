import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav, profile } from '@/data/portfolio'
import PageHeader from '@/components/PageHeader'

/** Wraps one route: sets the tab title, shows the page header, and ends with a link to the next page. */
export default function PageShell({ id, children }) {
  const i = nav.findIndex((n) => n.id === id)
  const item = nav[i]
  const next = nav[i + 1]
  const num = String(i + 1).padStart(2, '0')

  useEffect(() => {
    document.title = `${item.label} · ${profile.name}`
    return () => {
      document.title = `${profile.name} · ${profile.role}`
    }
  }, [item.label])

  return (
    <div>
      <PageHeader n={num} title={item.label} lede={item.lede} />
      {children}
      {next && (
        <section className="relative px-5 py-20 sm:px-8 md:py-28" aria-label="Next page">
          <div className="mx-auto max-w-7xl">
            <p data-reveal="left" className="eyebrow mb-6">
              <b>{String(i + 2).padStart(2, '0')}</b>
              <span>Next</span>
            </p>
            <Link to={next.path} className="group flex flex-wrap items-end justify-between gap-6">
              <span data-split="lines" className="display-title text-[clamp(2.5rem,8.4vw,8rem)] text-foreground transition-colors duration-300 group-hover:text-primary">{next.label}</span>
              <span data-reveal="scale" data-magnetic="0.45" className="mb-3 flex size-14 items-center justify-center border border-foreground/28 text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary md:size-20">
                <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-8" />
              </span>
            </Link>
            <p data-reveal className="mt-4 max-w-md text-base font-light text-muted-foreground">{next.lede}</p>
          </div>
        </section>
      )}
    </div>
  )
}
