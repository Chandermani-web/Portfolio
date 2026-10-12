import * as THREE from 'three'

/**
 * One fixed full-screen WebGL canvas serves the whole page.
 * Every section that wants 3D registers a "stage": { scene, camera, update(ctx) }
 * bound to a DOM element. Each frame the manager scissors the canvas to that
 * element's rectangle and renders the stage's scene there. This keeps us at a
 * single WebGL context, and scenes scroll naturally with the layout.
 */
class StageManager {
  constructor() {
    this.renderer = null
    this.entries = new Set()
    this.background = null
    this.raf = 0
    this.last = 0
    this.time = 0
    this.scroll = 0
    this.reduced = false
    this.mobile = false
    this.ok = false
    this._loop = this._loop.bind(this)
  }

  init(canvas) {
    if (this.renderer) return this.ok
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      this.ok = false
      return false
    }
    const r = this.renderer
    r.setClearColor(0x000000, 0)
    r.autoClear = false
    r.outputColorSpace = THREE.SRGBColorSpace
    this.ok = true

    this.mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.reduced = this.mq.matches
    this.mq.addEventListener?.('change', (e) => (this.reduced = e.matches))

    this._resize = () => {
      this.mobile = window.innerWidth < 768
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 1.75))
      r.setSize(window.innerWidth, window.innerHeight, false)
      if (this.background) {
        this.background.camera.aspect = window.innerWidth / window.innerHeight
        this.background.camera.updateProjectionMatrix()
      }
    }
    this._resize()
    window.addEventListener('resize', this._resize)
    this.globalPointer = { x: 0, y: 0 }
    this._gp = (e) => {
      this.globalPointer.x = (e.clientX / window.innerWidth) * 2 - 1
      this.globalPointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', this._gp, { passive: true })
    this._visibility = () => {
      if (document.hidden) cancelAnimationFrame(this.raf)
      else {
        this.last = performance.now()
        this.raf = requestAnimationFrame(this._loop)
      }
    }
    document.addEventListener('visibilitychange', this._visibility)
    this.last = performance.now()
    this.raf = requestAnimationFrame(this._loop)
    return true
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this._resize)
    window.removeEventListener('pointermove', this._gp)
    document.removeEventListener('visibilitychange', this._visibility)
    this.renderer?.dispose()
    this.renderer = null
    this.ok = false
    this.entries.clear()
    this.background = null
  }

  setBackground(stage) {
    this.background = stage
    if (stage && this.renderer) {
      stage.camera.aspect = window.innerWidth / window.innerHeight
      stage.camera.updateProjectionMatrix()
    }
  }

  /** Bind a stage to a DOM element. Returns a remove() function. */
  add(stage, el) {
    const pointer = { x: 0, y: 0, inside: false, down: false, dx: 0, dy: 0, clicked: false }
    let sx = 0
    let sy = 0
    let px = 0
    let py = 0
    let travelled = 0

    const local = (e) => {
      const rect = el.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    const onMove = (e) => {
      local(e)
      pointer.inside = true
      if (pointer.down) {
        pointer.dx += e.clientX - px
        pointer.dy += e.clientY - py
        travelled += Math.abs(e.clientX - px) + Math.abs(e.clientY - py)
      }
      px = e.clientX
      py = e.clientY
    }
    const onDown = (e) => {
      local(e)
      pointer.down = true
      pointer.inside = true
      sx = px = e.clientX
      sy = py = e.clientY
      travelled = 0
      try { el.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    }
    const onUp = (e) => {
      if (pointer.down && travelled < 8 && Math.hypot(e.clientX - sx, e.clientY - sy) < 8) pointer.clicked = true
      pointer.down = false
    }
    const onLeave = (e) => {
      if (e.pointerType === 'touch') pointer.inside = false
      else if (!pointer.down) pointer.inside = false
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('pointerleave', onLeave)

    const entry = { stage, el, pointer, w: 0, h: 0, visible: false, prevVisible: false }
    this.entries.add(entry)
    return () => {
      this.entries.delete(entry)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('pointerleave', onLeave)
    }
  }

  _loop(now) {
    this.raf = requestAnimationFrame(this._loop)
    const r = this.renderer
    if (!r) return
    const dt = Math.min((now - this.last) / 1000, 0.05)
    this.last = now
    this.time += dt
    const vw = window.innerWidth
    const vh = window.innerHeight
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
    this.scroll = Math.min(1, Math.max(0, window.scrollY / maxScroll))

    r.setScissorTest(false)
    r.clear()

    const bg = this.background
    if (bg) {
      r.setViewport(0, 0, vw, vh)
      bg.update?.({ t: this.time, dt, scroll: this.scroll, reduced: this.reduced, mobile: this.mobile, pointer: this.globalPointer })
      r.render(bg.scene, bg.camera)
    }

    r.setScissorTest(true)
    for (const e of this.entries) {
      const rect = e.el.getBoundingClientRect()
      const visible = rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw && rect.width > 2 && rect.height > 2
      e.visible = visible
      if (!visible) continue
      const { stage, pointer } = e
      if (Math.abs(rect.width - e.w) > 0.5 || Math.abs(rect.height - e.h) > 0.5) {
        e.w = rect.width
        e.h = rect.height
        stage.camera.aspect = rect.width / rect.height
        stage.camera.updateProjectionMatrix()
        stage.onResize?.(rect.width, rect.height)
      }
      const x = Math.max(0, rect.left)
      const y = Math.max(0, vh - rect.bottom)
      const w = Math.min(vw, rect.right) - x
      const h = Math.min(vh, vh - rect.top) - y
      // Viewport is the full element box (so the aspect stays right); scissor clips to the screen.
      r.setViewport(rect.left, vh - rect.bottom, rect.width, rect.height)
      r.setScissor(x, y, w, h)
      r.clearDepth()
      const progress = (vh - rect.top) / (vh + rect.height)
      stage.update?.({
        t: this.time,
        dt,
        pointer,
        size: { w: rect.width, h: rect.height },
        progress,
        reduced: this.reduced,
        mobile: this.mobile,
      })
      pointer.dx = 0
      pointer.dy = 0
      pointer.clicked = false
      r.render(stage.scene, stage.camera)
    }
  }
}

export const stageManager = new StageManager()
export { THREE }
