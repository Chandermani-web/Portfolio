import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="hero-poster relative flex min-h-svh flex-col items-start justify-center px-5 sm:px-8 lg:px-[4.5vw]">
      <p data-reveal="left" className="hero-eyebrow mb-4">Page not found</p>
      <h1 data-split="chars" className="hero-name text-[clamp(6rem,24vw,20rem)]">404</h1>
      <Link to="/" data-reveal data-magnetic="0.3" className="hero-btn hero-btn-solid mt-8">
        Back home
      </Link>
    </section>
  )
}
