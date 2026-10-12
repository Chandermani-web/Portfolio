import * as THREE from 'three'
import { fontsReady, makePill, makeDotTexture } from '../labels'

const TEAL = 0x0891b2
const SKY = 0x0ea5e9
const AMBER = 0xe8890c
const PAPER = 0xfffdf8

/** Radius of the portrait circle in scene units. The composition is ~10.8 units wide, so this is ~61% of it. */
const PR = 3.3

/**
 * The hero: your portrait as one big circle, set in a paper-white mat with an amber outline,
 * ringed by a tick dial and two counter-rotating orbits of tool tags.
 * Decorative rings sit behind the photo and the face stays clear; tags swing in front across the chest only.
 */
export async function createHeroScene({ portraitUrl, tags, tags2 = [] }) {
  await fontsReady
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
  camera.position.set(0, 0, 14)

  const root = new THREE.Group()
  scene.add(root)

  const dot = makeDotTexture()

  // ---- Portrait: a big circle ----
  const tex = await new THREE.TextureLoader().loadAsync(portraitUrl)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  // nudge the photo down a touch so the hair isn't tight against the circle's edge
  tex.offset.set(0, 0.05)
  const portrait = new THREE.Mesh(new THREE.CircleGeometry(PR, 128), new THREE.MeshBasicMaterial({ map: tex }))
  root.add(portrait)

  // Paper mat + amber outline
  const mat = new THREE.Mesh(new THREE.RingGeometry(PR - 0.002, PR + 0.14, 128), new THREE.MeshBasicMaterial({ color: PAPER, side: THREE.DoubleSide }))
  mat.position.z = 0.01
  root.add(mat)
  const rim = new THREE.Mesh(new THREE.RingGeometry(PR + 0.14, PR + 0.19, 128), new THREE.MeshBasicMaterial({ color: AMBER, side: THREE.DoubleSide }))
  rim.position.z = 0.012
  root.add(rim)

  // Warm glow plate behind everything
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: AMBER, transparent: true, opacity: 0.3, depthWrite: false }))
  glow.scale.set(PR * 2.9, PR * 2.9, 1)
  glow.position.z = -1
  root.add(glow)

  // ---- Tick dial around the mat ----
  const tickCount = 120
  const ticks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 0.15, 0.01), new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.75 }), tickCount)
  const m4 = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const s = new THREE.Vector3()
  const p = new THREE.Vector3()
  const Z = new THREE.Vector3(0, 0, 1)
  for (let i = 0; i < tickCount; i++) {
    const a = (i / tickCount) * Math.PI * 2
    const long = i % 5 === 0
    p.set(Math.cos(a) * 4.15, Math.sin(a) * 4.15, 0)
    q.setFromAxisAngle(Z, a + Math.PI / 2)
    s.set(1, long ? 1.9 : 1, 1)
    m4.compose(p, q, s)
    ticks.setMatrixAt(i, m4)
  }
  root.add(ticks)

  // Bright rotating arcs hugging the mat
  const arcs = []
  for (const [r, arc, off, c] of [[3.72, 1.1, 0, TEAL], [3.72, 0.7, 3.4, AMBER], [3.92, 0.9, 1.7, SKY]]) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.032, 8, 96, arc), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.95 }))
    m.rotation.z = off
    m.userData.speed = (r > 3.8 ? -1 : 1) * (0.35 + Math.random() * 0.2)
    root.add(m)
    arcs.push(m)
  }

  // Dashed ring with six hexagon nodes
  const dashPts = []
  for (let i = 0; i <= 200; i++) {
    const a = (i / 200) * Math.PI * 2
    dashPts.push(new THREE.Vector3(Math.cos(a) * 4.4, Math.sin(a) * 4.4, 0))
  }
  const dashed = new THREE.Line(new THREE.BufferGeometry().setFromPoints(dashPts), new THREE.LineDashedMaterial({ color: TEAL, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.55 }))
  dashed.computeLineDistances()
  root.add(dashed)
  const hexes = new THREE.Group()
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3
    const hex = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 6 }, (_, k) => new THREE.Vector3(Math.cos((k / 6) * Math.PI * 2) * 0.14, Math.sin((k / 6) * Math.PI * 2) * 0.14, 0))),
      new THREE.LineBasicMaterial({ color: AMBER }),
    )
    hex.position.set(Math.cos(a) * 4.4, Math.sin(a) * 4.4, 0)
    hexes.add(hex)
  }
  root.add(hexes)

  // ---- Gimbal rings, pushed well behind the photo so they never cross the face ----
  const gimbalGroup = new THREE.Group()
  gimbalGroup.position.z = -5.6
  root.add(gimbalGroup)
  const gimbals = []
  const ringSpecs = [
    { r: 4.5, tilt: [Math.PI / 2.2, 0, 0], speed: [0.0, 0.0, 0.35], color: TEAL, op: 0.5 },
    { r: 4.75, tilt: [0, Math.PI / 2.4, 0], speed: [0.28, 0, 0], color: SKY, op: 0.42 },
    { r: 5.0, tilt: [Math.PI / 3, Math.PI / 5, 0], speed: [0, 0.22, 0.12], color: AMBER, op: 0.4 },
  ]
  for (const sp of ringSpecs) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(sp.r, 0.014, 8, 220), new THREE.MeshBasicMaterial({ color: sp.color, transparent: true, opacity: sp.op }))
    m.rotation.set(...sp.tilt)
    m.userData.speed = sp.speed
    gimbalGroup.add(m)
    gimbals.push(m)
  }

  // ---- Orbiting tool tags. Front arcs swing low across the chest; back arcs slip behind the head. ----
  const orbit = new THREE.Group()
  orbit.rotation.set(0.42, 0.1, 0.18)
  root.add(orbit)
  const tagSprites = tags.map((label, i) => {
    const sp = makePill(label.toUpperCase(), { color: i % 2 ? '#0ea5e9' : '#0891b2', height: 0.4 })
    sp.userData.phase = (i / tags.length) * Math.PI * 2
    orbit.add(sp)
    return sp
  })
  const ringLine = (r, color, opacity) =>
    new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 160 }, (_, i) => new THREE.Vector3(Math.cos((i / 160) * Math.PI * 2) * r, 0, Math.sin((i / 160) * Math.PI * 2) * r))),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    )
  orbit.add(ringLine(4.5, TEAL, 0.28))

  const orbit2 = new THREE.Group()
  orbit2.rotation.set(0.62, -0.25, -0.32)
  root.add(orbit2)
  const warm = ['#f0612f', '#1fa35c', '#e8890c', '#0ea5e9']
  const tagSprites2 = tags2.map((label, i) => {
    const sp = makePill(label.toUpperCase(), { color: warm[i % warm.length], height: 0.34 })
    sp.userData.phase = (i / tags2.length) * Math.PI * 2
    orbit2.add(sp)
    return sp
  })
  orbit2.add(ringLine(4.65, AMBER, 0.26))

  // Small wire solids riding a low path (chest height) so they never cover the face
  const solids = [
    new THREE.IcosahedronGeometry(0.3, 0),
    new THREE.OctahedronGeometry(0.34, 0),
    new THREE.TetrahedronGeometry(0.36, 0),
    new THREE.DodecahedronGeometry(0.28, 0),
  ].map((geo, i) => {
    const m = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: [TEAL, AMBER, SKY, 0x1fa35c][i] }))
    m.userData = { a: (i / 4) * Math.PI * 2, r: 4.1 + (i % 2) * 0.2, tilt: (i - 1.5) * 0.35, spin: 0.6 + i * 0.25 }
    root.add(m)
    return m
  })

  // ---- Pulse rings that radiate on load and on click ----
  const pulses = [0, 1].map(() => {
    const m = new THREE.Mesh(new THREE.RingGeometry(PR + 0.2, PR + 0.25, 128), new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }))
    m.userData.age = 9
    root.add(m)
    return m
  })
  let nextPulse = 0
  const firePulse = () => {
    pulses[nextPulse++ % pulses.length].userData.age = 0
  }
  firePulse()

  // Scan line sweeping over the photo, trimmed to the circle's chord
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.05), new THREE.MeshBasicMaterial({ color: 0xcdf6ff, transparent: true, opacity: 0.4, depthWrite: false }))
  scan.position.z = 0.04
  root.add(scan)

  const state = { rx: 0, ry: 0, born: 0 }
  const ease = (x) => 1 - Math.pow(1 - x, 4)

  return {
    scene,
    camera,
    onResize(w, h) {
      // Keep the whole composition (about +/-5.4 wide, +/-5.1 tall) in frame at any aspect ratio
      camera.position.z = Math.max(13.9, 14.9 / (w / h))
    },
    update({ t, dt, pointer, reduced }) {
      const k = reduced ? 0.1 : 1
      if (pointer.clicked) firePulse()
      state.born = Math.min(1, state.born + dt / 1.6)
      const e = ease(state.born)
      root.scale.setScalar(0.55 + 0.45 * e)
      root.rotation.z = (1 - e) * 0.8

      const tx = pointer.inside ? pointer.x : Math.sin(t * 0.3) * 0.3 * k
      const ty = pointer.inside ? pointer.y : Math.cos(t * 0.25) * 0.2 * k
      state.ry += (tx * 0.4 - state.ry) * Math.min(1, dt * 3)
      state.rx += (-ty * 0.28 - state.rx) * Math.min(1, dt * 3)
      root.rotation.y = state.ry
      root.rotation.x = state.rx

      for (const g of gimbals) {
        g.rotation.x += g.userData.speed[0] * dt * k
        g.rotation.y += g.userData.speed[1] * dt * k
        g.rotation.z += g.userData.speed[2] * dt * k
      }
      for (const a of arcs) a.rotation.z += a.userData.speed * dt * k
      ticks.rotation.z -= 0.05 * dt * k
      hexes.rotation.z += 0.07 * dt * k
      dashed.rotation.z -= 0.04 * dt * k

      const sy = Math.sin(t * 0.9 * k) * PR * 0.92
      scan.position.y = sy
      scan.scale.x = 2 * Math.sqrt(Math.max(0.01, PR * PR - sy * sy))
      scan.material.opacity = 0.15 + 0.3 * (1 - Math.abs(sy) / (PR * 0.95))

      for (const m of solids) {
        const d = m.userData
        const a = d.a + t * 0.32 * k
        m.position.set(Math.cos(a) * d.r, -1.6 + Math.sin(a * 1.3 + d.tilt) * 0.5, Math.sin(a) * d.r * 0.6)
        m.rotation.x += dt * d.spin * k
        m.rotation.y += dt * d.spin * 0.7 * k
      }

      for (const m of pulses) {
        m.userData.age += dt * k
        const life = m.userData.age / 2.4
        if (life >= 1) {
          m.material.opacity = 0
          continue
        }
        m.scale.setScalar(1 + life * 0.5)
        m.material.opacity = (1 - life) * 0.7
      }

      const spin = t * 0.45 * k
      for (const sp of tagSprites) {
        const a = sp.userData.phase + spin
        sp.position.set(Math.cos(a) * 4.5, 0, Math.sin(a) * 4.5)
        sp.material.opacity = 0.6 + 0.4 * ((Math.sin(a) + 1) / 2)
      }
      const spin2 = -t * 0.32 * k
      for (const sp of tagSprites2) {
        const a = sp.userData.phase + spin2
        sp.position.set(Math.cos(a) * 4.65, 0, Math.sin(a) * 4.65)
        sp.material.opacity = 0.55 + 0.45 * ((Math.sin(a) + 1) / 2)
      }
    },
  }
}
