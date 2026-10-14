import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion, prefersReducedMotion, scrollToTarget } from '@/lib/motion'

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger, the WebGL canvas and the scroll stay in one frame. */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis
    let tick
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, anchors: false })
      motion.lenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // in-page anchors (#index ...) glide instead of jump
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented) return
      const id = a.getAttribute('href').slice(1)
      const el = id ? document.getElementById(id) : null
      if (!el) return
      e.preventDefault()
      scrollToTarget(el)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
      motion.lenis = null
    }
  }, [])
  return null
}
