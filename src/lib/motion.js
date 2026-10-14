/**
 * Small shared state for the motion system.
 *  - lenis: the smooth-scroll instance (set by SmoothScroll)
 *  - hold()/whenOpen(): the preloader and the page curtain "hold" page entrances until they have opened,
 *    so the hero and page headers play their intro the moment the curtain lifts, never behind it.
 */
export const motion = { lenis: null }

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const isFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

let holds = 0
let waiters = []

export function hold() {
  holds += 1
  let done = false
  return () => {
    if (done) return
    done = true
    holds -= 1
    if (holds === 0) {
      const w = waiters
      waiters = []
      w.forEach((fn) => fn())
    }
  }
}

/** Resolves once nothing is holding the page closed (preloader / route curtain). */
export const whenOpen = () => (holds === 0 ? Promise.resolve() : new Promise((resolve) => waiters.push(resolve)))

/** Scroll to the top instantly (route changes) or to an element/offset smoothly. */
export function scrollToTop(immediate = true) {
  if (motion.lenis) motion.lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' })
}
export function scrollToTarget(target, opts = {}) {
  if (motion.lenis) motion.lenis.scrollTo(target, { offset: -72, duration: 1.4, ...opts })
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView({ behavior: 'smooth' })
}
