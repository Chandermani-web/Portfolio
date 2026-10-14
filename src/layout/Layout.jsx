import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Scene3D from '@/components/Scene3D'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import RouteTransition from '@/components/RouteTransition'
import Choreographer from '@/components/Choreographer'
import Cursor from '@/components/Cursor'
import { scrollToTarget, scrollToTop } from '@/lib/motion'

/** Every route starts at the top; a #hash on the same route still glides to its target. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) scrollToTarget(el, { immediate: true })
      return
    }
    scrollToTop(true)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <Scene3D />
      <Nav />
      <main className="relative z-10 min-h-svh">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Choreographer />
      <RouteTransition />
      <Cursor />
      <Preloader />
    </>
  )
}
