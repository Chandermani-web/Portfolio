import * as THREE from 'three'

const MONO = '"JetBrains Mono Variable", ui-monospace, Consolas, monospace'
const SANS = '"Onest Variable", "Segoe UI", system-ui, sans-serif'

/** Resolves once the bundled fonts are ready, so canvas text never falls back. */
export const fontsReady = (async () => {
  try {
    await Promise.all([
      document.fonts.load(`700 26px ${MONO}`),
      document.fonts.load(`500 22px ${MONO}`),
      document.fonts.load(`800 40px ${SANS}`),
      document.fonts.load(`300 22px ${SANS}`),
    ])
    await document.fonts.ready
  } catch { /* fall back to system fonts */ }
})()

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function toSprite(canvas, worldHeight, extra = {}) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, ...extra })
  const sprite = new THREE.Sprite(mat)
  const aspect = canvas.width / canvas.height
  sprite.scale.set(worldHeight * aspect, worldHeight, 1)
  sprite.userData.aspect = aspect
  sprite.userData.baseHeight = worldHeight
  return sprite
}

/** Small tag: coloured dot + mono text inside a chamfer-ish pill. */
export function makePill(text, { color = '#ff5a4f', height = 0.5, dot = true } = {}) {
  const S = 2
  const fs = 24
  const m = document.createElement('canvas').getContext('2d')
  m.font = `700 ${fs}px ${MONO}`
  const tw = m.measureText(text).width
  const padX = 22
  const w = Math.ceil(tw + padX * 2 + (dot ? 24 : 0))
  const h = 52
  const c = document.createElement('canvas')
  c.width = w * S
  c.height = h * S
  const ctx = c.getContext('2d')
  ctx.scale(S, S)
  roundRect(ctx, 2, 2, w - 4, h - 4, 16)
  ctx.fillStyle = 'rgba(14, 11, 11, 0.94)'
  ctx.fill()
  ctx.lineWidth = 2.5
  ctx.strokeStyle = color
  ctx.stroke()
  let x = padX
  if (dot) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(padX - 2, h / 2, 5, 0, Math.PI * 2)
    ctx.fill()
    x = padX + 14
  }
  ctx.font = `700 ${fs}px ${MONO}`
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#f4f1e6'
  ctx.fillText(text, x, h / 2 + 1)
  return toSprite(c, height)
}

/** Two-line node label: bold title, dim sub-line. */
export function makeNodeLabel(title, sub, { color = '#ff5a4f', height = 0.82 } = {}) {
  const S = 2
  const m = document.createElement('canvas').getContext('2d')
  m.font = `800 30px ${SANS}`
  const w1 = m.measureText(title).width
  m.font = `500 19px ${MONO}`
  const w2 = m.measureText(sub).width
  const padX = 24
  const w = Math.ceil(Math.max(w1, w2) + padX * 2)
  const h = 86
  const c = document.createElement('canvas')
  c.width = w * S
  c.height = h * S
  const ctx = c.getContext('2d')
  ctx.scale(S, S)
  roundRect(ctx, 2, 2, w - 4, h - 4, 10)
  ctx.fillStyle = 'rgba(14, 11, 11, 0.94)'
  ctx.fill()
  ctx.lineWidth = 2.5
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fillRect(2, 14, 5, h - 28)
  ctx.textBaseline = 'alphabetic'
  ctx.font = `800 30px ${SANS}`
  ctx.fillStyle = '#f4f1e6'
  ctx.fillText(title, padX, 38)
  ctx.font = `500 19px ${MONO}`
  ctx.fillStyle = 'rgba(244, 241, 230, 0.6)'
  ctx.fillText(sub, padX, 66)
  return toSprite(c, height)
}

/** Soft round dot used for star and particle fields. */
export function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
