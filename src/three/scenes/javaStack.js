import * as THREE from 'three'
import { fontsReady, makeNodeLabel, makeDotTexture, makePill } from '../labels'

const TONE = { cyan: 0x0891b2, sky: 0x0ea5e9, amber: 0xe8890c, violet: 0x8b5cf6, green: 0x1fa35c }
const TONE_HEX = { cyan: '#0891b2', sky: '#0ea5e9', amber: '#e8890c', violet: '#8b5cf6', green: '#1fa35c' }
const GAP = 1.35 // vertical distance between layers
const W = 5 // slab width
const D = 3 // slab depth
const H = 0.46 // slab thickness

const v3 = (x, y, z) => new THREE.Vector3(x, y, z)

/**
 * The Spring Boot request path as an exploded stack of layers, with a request
 * travelling down and the response coming back up, plus a prop at the bottom:
 * a steaming Java mug (prop 'mug') or a Docker shipping container (prop 'container').
 */
export async function createJavaStack({ el, layers, onHover, onSelect, prop = 'mug' }) {
  await fontsReady
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
  const target = v3(0.4, 0, 0)
  const dir = v3(0, 0.3, 1).normalize()
  camera.position.copy(target).addScaledVector(dir, 15)
  camera.lookAt(target)

  const world = new THREE.Group()
  scene.add(world)
  const dot = makeDotTexture()

  const n = layers.length
  const topY = ((n - 1) / 2) * GAP
  const bottomY = -topY
  const layerY = (i) => topY - i * GAP

  // Floor
  const grid = new THREE.GridHelper(22, 22, 0xc9b995, 0xdccfb3)
  grid.position.set(0.5, bottomY - 1.1, 0)
  grid.material.transparent = true
  grid.material.opacity = 0.45
  world.add(grid)

  // ---- Layers ----
  const slabs = []
  const meshes = []
  layers.forEach((L, i) => {
    const color = TONE[L.tone]
    const g = new THREE.Group()
    g.position.y = layerY(i)

    const isDb = L.id === 'database'
    const geo = isDb ? new THREE.CylinderGeometry(D * 0.62, D * 0.62, H, 40) : new THREE.BoxGeometry(W, H, D)
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, depthWrite: false })
    const mesh = new THREE.Mesh(geo, mat)
    if (isDb) mesh.scale.set(W / (D * 1.24), 1, 1)
    mesh.userData.id = L.id
    g.add(mesh)
    meshes.push(mesh)

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color, transparent: true }))
    if (isDb) edges.scale.copy(mesh.scale)
    g.add(edges)

    // "Beans" sitting on the slab: little blocks that hint at classes in the layer
    const beans = new THREE.Group()
    const count = isDb ? 0 : 3 + (i % 2)
    for (let b = 0; b < count; b++) {
      const bw = 0.7 + ((b + i) % 3) * 0.18
      const bean = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(bw, 0.2, 0.62)),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 }),
      )
      bean.position.set(-1.7 + b * 1.15, H / 2 + 0.11, (b % 2 ? 0.5 : -0.5))
      beans.add(bean)
    }
    g.add(beans)

    // Label to the right, with a leader line
    const label = makeNodeLabel(L.title, L.sub, { color: TONE_HEX[L.tone], height: 0.78 })
    const lx = W / 2 + 0.55 + label.scale.x / 2
    label.position.set(lx, 0, 0.3)
    g.add(label)
    const leader = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([v3(W / 2, 0, 0.3), v3(W / 2 + 0.5, 0, 0.3)]),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }),
    )
    g.add(leader)

    world.add(g)
    slabs.push({ def: L, group: g, mat, edges, label, leader, beans, glow: 0, flash: 0, y: g.position.y })
  })

  // Spine the request travels along
  const spine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([v3(0, topY + 1.1, 0), v3(0, bottomY - 0.6, 0)]),
    new THREE.LineDashedMaterial({ color: 0x0891b2, dashSize: 0.14, gapSize: 0.1, transparent: true, opacity: 0.55 }),
  )
  spine.computeLineDistances()
  world.add(spine)

  // Request / response packet with a short trail
  const TRAIL = 7
  const packet = new THREE.Group()
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), new THREE.MeshBasicMaterial({ color: 0x1c2430 }))
  packet.add(head)
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0x0891b2, transparent: true, opacity: 0.3, blending: THREE.NormalBlending, depthWrite: false }))
  halo.scale.set(1.5, 1.5, 1)
  packet.add(halo)
  world.add(packet)
  const trail = Array.from({ length: TRAIL }, (_, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.1 * (1 - i / TRAIL), 8, 8), new THREE.MeshBasicMaterial({ color: 0x0891b2, transparent: true, opacity: 0.6 * (1 - i / TRAIL) }))
    world.add(m)
    return m
  })

  // ---- Coffee mug with steam ----
  const mug = new THREE.Group()
  mug.position.set(-5.4, bottomY + 0.2, 0.4)
  mug.visible = prop === 'mug'
  world.add(mug)
  const profile = [
    [0.001, 0], [0.9, 0], [0.98, 0.08], [1.05, 1.5], [0.92, 1.5], [0.85, 0.2], [0.001, 0.2],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  const lathe = new THREE.LatheGeometry(profile, 36)
  mug.add(new THREE.Mesh(lathe, new THREE.MeshBasicMaterial({ color: 0xf0612f, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false })))
  mug.add(new THREE.LineSegments(new THREE.EdgesGeometry(lathe, 20), new THREE.LineBasicMaterial({ color: 0xf0612f })))
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.06, 8, 24, Math.PI), new THREE.MeshBasicMaterial({ color: 0xf0612f }))
  handle.position.set(1.0, 0.82, 0)
  handle.rotation.z = -Math.PI / 2
  mug.add(handle)
  const saucer = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(Array.from({ length: 64 }, (_, i) => v3(Math.cos((i / 64) * Math.PI * 2) * 1.55, -0.02, Math.sin((i / 64) * Math.PI * 2) * 1.55))),
    new THREE.LineBasicMaterial({ color: 0xf0612f, transparent: true, opacity: 0.6 }),
  )
  mug.add(saucer)

  const STEAM = 46
  const sp = new Float32Array(STEAM * 3)
  const seed = Array.from({ length: STEAM }, () => ({ a: Math.random() * 6.28, r: Math.random() * 0.55, life: Math.random(), speed: 0.18 + Math.random() * 0.18 }))
  const sg = new THREE.BufferGeometry()
  sg.setAttribute('position', new THREE.BufferAttribute(sp, 3))
  const steam = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.34, map: dot, color: 0xf4a58e, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.NormalBlending }))
  steam.frustumCulled = false
  mug.add(steam)

  // ---- Shipping container (for the 'container' prop) ----
  const box = new THREE.Group()
  box.position.set(-5.4, bottomY + 0.2, 0.4)
  box.visible = prop === 'container'
  world.add(box)
  if (prop === 'container') {
    const G = 0x1fa35c
    const body = new THREE.BoxGeometry(3, 1.5, 1.5)
    const bm = new THREE.Mesh(body, new THREE.MeshBasicMaterial({ color: G, transparent: true, opacity: 0.12, depthWrite: false }))
    bm.position.y = 0.75
    box.add(bm)
    const be = new THREE.LineSegments(new THREE.EdgesGeometry(body), new THREE.LineBasicMaterial({ color: G }))
    be.position.y = 0.75
    box.add(be)
    // corrugation ribs on the long sides and the lid
    const ribs = []
    for (let i = -6; i <= 6; i++) {
      const x = i * 0.22
      ribs.push(v3(x, 0.02, 0.751), v3(x, 1.48, 0.751), v3(x, 0.02, -0.751), v3(x, 1.48, -0.751))
    }
    box.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ribs), new THREE.LineBasicMaterial({ color: G, transparent: true, opacity: 0.35 })))
    // a smaller container stacked on top, shifted, to read as "containers"
    const top = new THREE.BoxGeometry(1.7, 0.9, 1.3)
    const te = new THREE.LineSegments(new THREE.EdgesGeometry(top), new THREE.LineBasicMaterial({ color: 0x0ea5e9 }))
    te.position.set(-0.4, 1.5 + 0.45, 0)
    box.add(te)
    const door = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints([v3(1.51, 0.05, -0.7), v3(1.51, 1.45, -0.7), v3(1.51, 0.05, 0.7), v3(1.51, 1.45, 0.7), v3(1.51, 0.05, 0), v3(1.51, 1.45, 0)]),
      new THREE.LineBasicMaterial({ color: G }),
    )
    box.add(door)
    box.add(new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 64 }, (_, i) => v3(Math.cos((i / 64) * Math.PI * 2) * 2.2, -0.02, Math.sin((i / 64) * Math.PI * 2) * 2.2))),
      new THREE.LineBasicMaterial({ color: G, transparent: true, opacity: 0.5 }),
    ))
    const pill = makePill('Docker container', { color: '#1fa35c', height: 0.42 })
    pill.position.set(0, 3.2, 0)
    box.add(pill)
  }

  // Dust
  {
    const N = 160
    const pp = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pp[i * 3] = (Math.random() - 0.5) * 18
      pp[i * 3 + 1] = bottomY - 1 + Math.random() * (topY * 2 + 3)
      pp[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pp, 3))
    world.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.07, map: dot, color: 0x5aa9bd, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.NormalBlending })))
  }

  const ray = new THREE.Raycaster()
  const state = { yaw: -0.38, hovered: null, idle: 0 }
  let selected = null
  const CYCLE = 6.4 // seconds for request down + response up
  const cyan = new THREE.Color(0x0891b2)
  const amber = new THREE.Color(0xe8890c)
  const tmpC = new THREE.Color()

  return {
    scene,
    camera,
    setSelected(id) {
      selected = id
    },
    onResize(w, h) {
      const aspect = w / h
      const dist = Math.max(12.8, 15 / (0.728 * aspect))
      camera.position.copy(target).addScaledVector(dir, dist)
      camera.lookAt(target)
    },
    update({ t, dt, pointer, reduced }) {
      const k = reduced ? 0.1 : 1
      if (pointer.down) {
        state.yaw = THREE.MathUtils.clamp(state.yaw + pointer.dx * 0.006, -1.1, 1.1)
        state.idle = 0
      } else {
        state.idle += dt
        if (state.idle > 3) state.yaw += (Math.sin(t * 0.25 * k) * 0.32 - 0.1 - state.yaw) * Math.min(1, dt * 0.6)
      }
      world.rotation.y = state.yaw

      mug.rotation.y += dt * 0.35 * k
      box.rotation.y += dt * 0.3 * k

      // Steam
      for (let i = 0; i < STEAM; i++) {
        const s = seed[i]
        s.life += dt * s.speed * k
        if (s.life > 1) {
          s.life = 0
          s.a = Math.random() * 6.28
          s.r = Math.random() * 0.55
        }
        const rise = s.life * 2.4
        sp[i * 3] = Math.cos(s.a + s.life * 3) * (s.r + s.life * 0.3)
        sp[i * 3 + 1] = 1.55 + rise
        sp[i * 3 + 2] = Math.sin(s.a + s.life * 3) * (s.r + s.life * 0.3)
      }
      sg.attributes.position.needsUpdate = true
      steam.material.opacity = 0.5

      // Hover
      scene.updateMatrixWorld()
      let hit = null
      if (pointer.inside && !pointer.down) {
        ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera)
        hit = ray.intersectObjects(meshes, false)[0]?.object.userData.id ?? null
      }
      if (hit !== state.hovered) {
        state.hovered = hit
        onHover?.(hit)
      }
      if (pointer.clicked && hit) onSelect?.(hit)
      el.style.cursor = hit ? 'pointer' : pointer.down ? 'grabbing' : 'grab'
      const focus = state.hovered ?? selected

      // Packet: down as a request (cyan), back up as the response (amber)
      const u = ((t * k) % CYCLE) / CYCLE
      const down = u < 0.5
      const p = down ? u * 2 : (u - 0.5) * 2
      const startY = topY + 0.9
      const endY = bottomY
      const py = down ? THREE.MathUtils.lerp(startY, endY, p) : THREE.MathUtils.lerp(endY, startY, p)
      tmpC.copy(down ? cyan : amber)
      packet.position.set(0, py, 0)
      head.material.color.copy(tmpC).lerp(new THREE.Color(0x1c2430), 0.35)
      halo.material.color.copy(tmpC)
      trail.forEach((m, i) => {
        m.position.set(0, py + (down ? 1 : -1) * (i + 1) * 0.22, 0)
        m.material.color.copy(tmpC)
      })

      for (const s of slabs) {
        const on = focus === s.def.id
        s.glow += ((on ? 1 : 0) - s.glow) * Math.min(1, dt * 10)
        const near = Math.max(0, 1 - Math.abs(py - s.y) / 0.75)
        s.flash += (near - s.flash) * Math.min(1, dt * 14)
        const rel = !focus || on
        s.mat.opacity = 0.12 + s.glow * 0.3 + s.flash * 0.28
        s.edges.material.opacity = rel ? 1 : 0.3
        s.label.material.opacity = rel ? 1 : 0.35
        s.leader.material.opacity = rel ? 0.6 : 0.15
        s.group.position.y = s.y + s.glow * 0.14 + Math.sin(t * 0.9 * k + s.y) * 0.025 * k
        s.beans.position.y = Math.sin(t * 1.4 * k + s.y * 2) * 0.03 * k + s.flash * 0.12
      }
    },
  }
}
