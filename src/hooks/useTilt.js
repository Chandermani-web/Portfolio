import { useCallback, useRef } from 'react'

/** Pointer-driven 3D tilt for a DOM element. Sets --rx / --ry / --gx / --gy CSS variables. */
export function useTilt(max = 10) {
  const ref = useRef(null)
  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el || e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
      el.style.setProperty('--rx', `${-(py - 0.5) * 2 * max}deg`)
      el.style.setProperty('--gx', `${px * 100}%`)
      el.style.setProperty('--gy', `${py * 100}%`)
    },
    [max],
  )
  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }, [])
  return { ref, onPointerMove, onPointerLeave }
}
