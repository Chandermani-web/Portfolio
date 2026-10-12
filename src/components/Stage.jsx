import { useEffect, useRef } from 'react'
import { stageManager } from '@/three/stage'

function disposeScene(scene, stage) {
  stage?.dispose?.()
  scene.traverse((o) => {
    o.geometry?.dispose?.()
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
    for (const m of mats) {
      m.map?.dispose?.()
      m.dispose?.()
    }
  })
}

/**
 * Binds a Three.js scene to this element's rectangle on the shared canvas.
 * `create({ el })` may be async and must return { scene, camera, update }.
 */
export default function Stage({ create, onReady, className, style, children, ...rest }) {
  const ref = useRef(null)
  const createRef = useRef(create)
  const readyRef = useRef(onReady)
  createRef.current = create
  readyRef.current = onReady

  useEffect(() => {
    let cancelled = false
    let remove
    let stage
    ;(async () => {
      try {
        stage = await createRef.current({ el: ref.current })
        if (cancelled) {
          disposeScene(stage.scene, stage)
          return
        }
        remove = stageManager.add(stage, ref.current)
        readyRef.current?.(stage)
      } catch (err) {
        console.error('3D stage failed to start', err)
      }
    })()
    return () => {
      cancelled = true
      remove?.()
      if (stage) disposeScene(stage.scene, stage)
    }
  }, [])

  return (
    <div ref={ref} className={className} style={{ touchAction: 'pan-y', ...style }} {...rest}>
      {children}
    </div>
  )
}
