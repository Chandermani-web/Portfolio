import { useEffect, useRef } from 'react'
import { stageManager } from '@/three/stage'

/** The one fixed, transparent canvas behind the whole page. Each 3D section draws into its own rectangle on it;
 *  the cream paper background itself is plain CSS (see body::before in index.css). */
export default function Scene3D() {
  const ref = useRef(null)
  useEffect(() => {
    stageManager.init(ref.current)
    return () => stageManager.destroy()
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
