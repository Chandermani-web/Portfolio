import * as THREE from 'three'
import { makeDotTexture } from '../labels'

/** Persistent page-wide backdrop: a spaceship / science-lab corridor with starfield and grid.
 *  The camera flies forward as the page scrolls; reactor rings spin with the scroll. */
export function createBackground() {
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x020a18, 0.018)
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 300)
  camera.position.set(0, 1, 10)

  // Stars
  const N = 1700
  const pos = new Float32Array(N * 3)
  const col = new Float32Array(N * 3)
  const palette = [new THREE.Color('#22d3ee'), new THREE.Color('#bff3ff'), new THREE.Color('#14b8ff'), new THREE.Color('#ffb347')]
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 120
    pos[i * 3 + 1] = (Math.random() - 0.5) * 70
    pos[i * 3 + 2] = 20 - Math.random() * 150
    const c = palette[Math.random() < 0.06 ? 3 : Math.floor(Math.random() * 3)]
    const k = 0.35 + Math.random() * 0.65
    col[i * 3] = c.r * k
    col[i * 3 + 1] = c.g * k
    col[i * 3 + 2] = c.b * k
  }
  const sg = new THREE.BufferGeometry()
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  sg.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const stars = new THREE.Points(
    sg,
    new THREE.PointsMaterial({ size: 0.34, map: makeDotTexture(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }),
  )
  scene.add(stars)

  // Grid floor + ceiling
  const gridMat = (c, o) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o })
  const floor = new THREE.GridHelper(260, 130, 0x14b8ff, 0x0a4a73)
  floor.position.set(0, -9, -60)
  floor.material = gridMat(0x1a8fc0, 0.12)
  scene.add(floor)

  const CYAN = 0x22d3ee, SKY = 0x14b8ff, AMBER = 0xffb347, GREEN = 0x34e08a
  const v = (x, y, z) => new THREE.Vector3(x, y, z)
  const lineMat = (c, o) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o, depthWrite: false })
  const segs = (pts, c, o) => new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), lineMat(c, o))
  const ring = (r, n = 64, plane = 'xy') =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2
      return plane === 'xy' ? v(Math.cos(a) * r, Math.sin(a) * r, 0) : v(Math.cos(a) * r, 0, Math.sin(a) * r)
    })

  // ---- Reactor rings: segmented, ticked rings that spin with the scroll ----
  // Each ring group holds three counter-rotating layers (arc segments + tick marks).
  const reactors = []
  for (let i = 0; i < 9; i++) {
    const color = [CYAN, SKY, AMBER][i % 3]
    const g = new THREE.Group()
    const mat = lineMat(color, 0.4)
    const layers = [5.4, 6.6, 8.1].map((r, li) => {
      const pts = []
      const count = 5 + li * 2
      for (let k = 0; k < count; k++) {
        const a0 = (k / count) * Math.PI * 2 + 0.06
        const a1 = ((k + 0.7) / count) * Math.PI * 2
        for (let m = 0; m < 10; m++) {
          const u0 = a0 + ((a1 - a0) * m) / 10
          const u1 = a0 + ((a1 - a0) * (m + 1)) / 10
          pts.push(v(Math.cos(u0) * r, Math.sin(u0) * r, 0), v(Math.cos(u1) * r, Math.sin(u1) * r, 0))
        }
      }
      const ticks = 30 + li * 14
      for (let k = 0; k < ticks; k++) {
        const a = (k / ticks) * Math.PI * 2
        const l = k % 5 === 0 ? 0.42 : 0.16
        pts.push(v(Math.cos(a) * r, Math.sin(a) * r, 0), v(Math.cos(a) * (r + l), Math.sin(a) * (r + l), 0))
      }
      const m = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), mat)
      g.add(m)
      return { m, dir: li % 2 ? -1 : 1, speed: 0.55 + li * 0.4 }
    })
    // four amber "docking clamps" on the outer ring
    const clamps = []
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4
      clamps.push(v(Math.cos(a) * 8.8, Math.sin(a) * 8.8, 0), v(Math.cos(a) * 9.8, Math.sin(a) * 9.8, 0))
    }
    g.add(segs(clamps, AMBER, 0.55))
    g.position.set(0, -i * 0.4, -16 - i * 11)
    g.userData = { layers, mat, base: (i * 1.7) % 6.28 }
    scene.add(g)
    reactors.push(g)
  }

  // ---- Corridor ribs: octagonal hull frames the camera flies through ----
  const ribMat = lineMat(SKY, 0.2)
  for (let i = 0; i < 18; i++) {
    const rib = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ring(13.5, 8)), ribMat)
    rib.rotation.z = Math.PI / 8
    rib.position.set(0, -2, 2 - i * 6.2)
    scene.add(rib)
  }
  // long hull beams + windows on both sides
  const beams = []
  for (const sx of [-1, 1]) {
    for (const y of [-7.5, 3.5]) beams.push(v(sx * 14, y, 6), v(sx * 14, y, -115))
    beams.push(v(sx * 9.5, -9.2, 6), v(sx * 9.5, -9.2, -115))
  }
  scene.add(segs(beams, SKY, 0.22))
  const windows = []
  for (let i = 0; i < 14; i++) {
    const z0 = -4 - i * 8
    for (const sx of [-1, 1]) {
      const x = sx * 14
      windows.push(v(x, -1.2, z0), v(x, 1.8, z0), v(x, 1.8, z0), v(x, 1.8, z0 - 3.6), v(x, 1.8, z0 - 3.6), v(x, -1.2, z0 - 3.6), v(x, -1.2, z0 - 3.6), v(x, -1.2, z0))
      windows.push(v(x, 0.3, z0), v(x, 0.3, z0 - 3.6))
    }
  }
  scene.add(segs(windows, CYAN, 0.3))

  // ---- Lab / bridge components at the page margins ----
  const props = { consoles: [], radars: [], helices: [], atoms: [] }
  const side = (i) => (i % 2 === 0 ? -1 : 1)

  const makeConsole = (color) => {
    const g = new THREE.Group()
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.8, 1.8, 0.9)), lineMat(color, 0.6)))
    const sc = [v(-1.15, -0.7, 0.46), v(1.15, -0.7, 0.46), v(1.15, -0.7, 0.46), v(1.15, 0.7, 0.46), v(1.15, 0.7, 0.46), v(-1.15, 0.7, 0.46), v(-1.15, 0.7, 0.46), v(-1.15, -0.7, 0.46)]
    for (let k = 0; k < 5; k++) {
      const y = -0.5 + k * 0.25
      sc.push(v(-1, y, 0.46), v(-1 + 0.5 + ((k * 37) % 10) * 0.12, y, 0.46))
    }
    g.add(segs(sc, color, 0.55))
    const scan = segs([v(-1.15, 0, 0.47), v(1.15, 0, 0.47)], 0xffffff, 0.7)
    g.add(scan)
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: GREEN, transparent: true }))
    led.position.set(1.0, 1.05, 0.46)
    g.add(led)
    // short stand
    g.add(segs([v(-0.6, -0.9, 0), v(-0.9, -1.7, 0), v(0.6, -0.9, 0), v(0.9, -1.7, 0), v(-1.1, -1.7, 0), v(1.1, -1.7, 0)], color, 0.45))
    g.userData = { scan, led, ph: Math.random() * 6 }
    return g
  }
  const makeRadar = (color) => {
    const g = new THREE.Group()
    for (const r of [1, 2, 3]) g.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ring(r, 56)), lineMat(color, 0.5)))
    g.add(segs([v(-3, 0, 0), v(3, 0, 0), v(0, -3, 0), v(0, 3, 0)], color, 0.35))
    const sweep = new THREE.Mesh(new THREE.CircleGeometry(3, 28, 0, 0.8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }))
    g.add(sweep)
    const blips = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints([v(1.2, 0.8, 0), v(-1.7, 1.1, 0), v(0.6, -2, 0), v(-0.9, -0.7, 0)]),
      new THREE.PointsMaterial({ size: 0.28, map: makeDotTexture(), color: AMBER, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    g.add(blips)
    g.userData = { sweep }
    return g
  }
  const makeHelix = (color) => {
    const g = new THREE.Group()
    const n = 70, H = 11, R = 1.15
    const A = [], B = [], rungs = []
    for (let i = 0; i < n; i++) {
      const y = (i / (n - 1) - 0.5) * H
      const a = (i / (n - 1)) * Math.PI * 2 * 3.2
      A.push(v(Math.cos(a) * R, y, Math.sin(a) * R))
      B.push(v(Math.cos(a + Math.PI) * R, y, Math.sin(a + Math.PI) * R))
      if (i % 3 === 0) rungs.push(A[i], B[i])
    }
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(A), lineMat(color, 0.7)))
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(B), lineMat(AMBER, 0.6)))
    g.add(segs(rungs, 0xbff3ff, 0.35))
    return g
  }
  const makeAtom = (color) => {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.34, 14, 14), new THREE.MeshBasicMaterial({ color: AMBER })))
    const orbits = [0, 1, 2].map((i) => {
      const o = new THREE.Group()
      o.rotation.set(i * 1.05, i * 0.6, i * 0.9)
      o.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ring(2.2, 64)), lineMat(color, 0.55)))
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xbff3ff }))
      o.add(e)
      g.add(o)
      return { e, sp: 1.1 + i * 0.5, ph: i * 2 }
    })
    g.userData = { orbits }
    return g
  }

  for (let i = 0; i < 12; i++) {
    const z = -8 - i * 8.5
    const x = side(i) * (10.5 + (i % 3) * 1.6)
    const kind = i % 4
    let o
    if (kind === 0) { o = makeConsole([CYAN, SKY, AMBER][(i / 4) % 3 | 0]); props.consoles.push(o) }
    else if (kind === 1) { o = makeRadar(i % 8 === 1 ? GREEN : CYAN); o.scale.setScalar(1.15); props.radars.push(o) }
    else if (kind === 2) { o = makeHelix(CYAN); props.helices.push(o) }
    else { o = makeAtom(SKY); props.atoms.push(o) }
    o.position.set(x, kind === 2 ? 0 : -1 + ((i * 7) % 5) - 2, z)
    if (kind === 0 || kind === 1) o.rotation.y = -side(i) * 0.5
    scene.add(o)
  }

  // A few drifting wire solids so the far field is never empty
  const solids = []
  const geos = [new THREE.IcosahedronGeometry(1.6, 0), new THREE.OctahedronGeometry(1.5, 0), new THREE.DodecahedronGeometry(1.4, 0)]
  for (let i = 0; i < 6; i++) {
    const m = new THREE.LineSegments(new THREE.EdgesGeometry(geos[i % 3]), lineMat([CYAN, SKY, AMBER][i % 3], 0.28))
    m.position.set(side(i + 1) * (16 + Math.random() * 8), (Math.random() - 0.5) * 12, -i * 18 - 10)
    m.userData = { sx: 0.1 + Math.random() * 0.2, sy: 0.1 + Math.random() * 0.25, bob: Math.random() * 6 }
    scene.add(m)
    solids.push(m)
  }

  // Shooting streaks that cross the far field now and then
  const streaks = []
  const streakMat = new THREE.LineBasicMaterial({ color: 0xbff3ff, transparent: true, opacity: 0.0 })
  for (let i = 0; i < 5; i++) {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-3.2, 0.9, 0)])
    const line = new THREE.Line(geo, streakMat.clone())
    line.userData = { life: Math.random() * 6, wait: 3 + Math.random() * 6, speed: 26 + Math.random() * 14 }
    scene.add(line)
    streaks.push(line)
  }
  const respawn = (l) => {
    l.position.set(20 + Math.random() * 15, 6 + Math.random() * 14, -20 - Math.random() * 70)
    l.userData.life = 0
    l.userData.wait = 4 + Math.random() * 7
  }
  streaks.forEach(respawn)
  streaks.forEach((l) => (l.userData.life = -Math.random() * 6))

  const smooth = { x: 0, y: 0, scroll: 0, vel: 0 }
  let prev = 0
  return {
    scene,
    camera,
    update({ t, dt, scroll, reduced, pointer }) {
      const k = reduced ? 0.05 : 1
      smooth.scroll += (scroll - smooth.scroll) * Math.min(1, dt * 4)
      smooth.vel += (Math.min(3, Math.abs(scroll - prev) / Math.max(dt, 1e-3)) - smooth.vel) * Math.min(1, dt * 6)
      prev = scroll
      const rk = reduced ? 0.35 : 1
      const p = pointer || { x: 0, y: 0 }
      smooth.x += (p.x - smooth.x) * Math.min(1, dt * 2)
      smooth.y += (p.y - smooth.y) * Math.min(1, dt * 2)
      camera.position.x = smooth.x * 1.2 * k
      camera.position.y = 1 - smooth.scroll * 4 + smooth.y * 0.6 * k
      camera.position.z = 10 - smooth.scroll * 95
      camera.rotation.z = Math.sin(smooth.scroll * Math.PI * 2) * 0.05 * k
      camera.rotation.y = -smooth.x * 0.05 * k
      for (const s of solids) {
        s.rotation.x += s.userData.sx * dt * k
        s.rotation.y += s.userData.sy * dt * k
        s.position.y += Math.sin(t * 0.4 + s.userData.bob) * 0.004 * k
      }
      stars.rotation.z = t * 0.003 * k

      // Reactor rings turn with the scroll: position sets the angle, scroll speed adds a surge
      for (const g of reactors) {
        const dz = camera.position.z - g.position.z
        const near = dz > -2 && dz < 22 ? 1 - Math.abs(dz - 8) / 14 : 0
        g.userData.mat.opacity = 0.18 + Math.max(0, near) * 0.5
        const turn = smooth.scroll * 16 * rk + t * 0.05 * k
        for (const L of g.userData.layers) L.m.rotation.z = g.userData.base + L.dir * L.speed * turn
        g.scale.setScalar(1 + Math.min(1, smooth.vel * 0.5) * 0.06)
      }

      // Lab and bridge components
      for (const c of props.consoles) {
        const u = c.userData
        u.scan.position.y = Math.sin(t * 1.3 * k + u.ph) * 0.62
        u.led.material.opacity = 0.35 + 0.65 * (Math.sin(t * 3 * k + u.ph) > 0 ? 1 : 0.2)
      }
      for (const r of props.radars) r.userData.sweep.rotation.z = -(t * 1.1 * k + smooth.scroll * 6 * rk)
      for (const h of props.helices) h.rotation.y = t * 0.5 * k + smooth.scroll * 8 * rk
      for (const a of props.atoms) {
        a.rotation.y = t * 0.25 * k + smooth.scroll * 3 * rk
        for (const o of a.userData.orbits) {
          const ang = t * o.sp * k + o.ph + smooth.scroll * 10 * rk
          o.e.position.set(Math.cos(ang) * 2.2, Math.sin(ang) * 2.2, 0)
        }
      }

      for (const l of streaks) {
        const u = l.userData
        u.life += dt * k
        if (u.life < 0) continue
        const f = u.life / 0.9
        if (f >= 1) {
          if (u.life > u.wait) respawn(l)
          l.material.opacity = 0
          continue
        }
        l.position.x -= u.speed * dt * k
        l.position.y -= u.speed * 0.28 * dt * k
        l.material.opacity = Math.sin(f * Math.PI) * 0.8
      }
    },
  }
}
