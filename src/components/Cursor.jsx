import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { isFinePointer, prefersReducedMotion } from '@/lib/motion'

const INTERACTIVE = 'a[href], button:not([disabled]), [role="tab"], summary, label[for], input, textarea, select'

/**
 * A soft ring that trails the pointer. It swells over links and buttons, and shows a word
 * (Drag, View...) over anything carrying data-cursor="...". The native cursor stays, so nothing is lost.
 */
export default function Cursor() {
  const ring = useRef(null)
  const text = useRef(null)

  useGSAP(
    () => {
      if (!isFinePointer() || prefersReducedMotion()) return undefined
      const el = ring.current
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
      const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
      let shown = false
      let kind = 'idle'

      const set = (next, word = '') => {
        if (next === kind && text.current.textContent === word) return
        kind = next
        text.current.textContent = word
        const to = { idle: { scale: 1, backgroundColor: 'rgba(236,47,37,0)', borderColor: 'rgba(244,241,230,0.55)' }, link: { scale: 1.7, backgroundColor: 'rgba(236,47,37,0.16)', borderColor: 'rgba(236,47,37,0.9)' }, word: { scale: 3.1, backgroundColor: 'rgba(236,47,37,0.92)', borderColor: 'rgba(236,47,37,1)' } }[next]
        gsap.to(el, { ...to, duration: 0.35, overwrite: 'auto' })
        gsap.to(text.current, { opacity: next === 'word' ? 1 : 0, duration: 0.2 })
      }

      const move = (e) => {
        if (e.pointerType === 'touch') return
        if (!shown) {
          shown = true
          gsap.set(el, { x: e.clientX, y: e.clientY })
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.4 })
        }
        x(e.clientX)
        y(e.clientY)
        const t = e.target
        const w = t.closest?.('[data-cursor]')
        if (w) set('word', w.getAttribute('data-cursor'))
        else if (t.closest?.(INTERACTIVE)) set('link')
        else set('idle')
      }
      const out = (e) => {
        if (e.relatedTarget) return
        shown = false
        gsap.to(el, { opacity: 0, scale: 0, duration: 0.3 })
      }
      const down = () => gsap.to(el, { scale: kind === 'word' ? 2.6 : kind === 'link' ? 1.3 : 0.75, duration: 0.2 })
      const up = () => gsap.to(el, { scale: kind === 'word' ? 3.1 : kind === 'link' ? 1.7 : 1, duration: 0.3, ease: 'back.out(2)' })

      window.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('pointerout', out)
      window.addEventListener('pointerdown', down)
      window.addEventListener('pointerup', up)
      return () => {
        window.removeEventListener('pointermove', move)
        document.removeEventListener('pointerout', out)
        window.removeEventListener('pointerdown', down)
        window.removeEventListener('pointerup', up)
      }
    },
    { scope: ring },
  )

  return (
    <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[95] grid size-9 place-items-center rounded-full border border-white/50 opacity-0 max-md:hidden [@media(hover:none)]:hidden" aria-hidden="true">
      <span ref={text} className="text-[5px] leading-none font-bold tracking-[0.12em] text-white uppercase opacity-0" />
    </div>
  )
}
