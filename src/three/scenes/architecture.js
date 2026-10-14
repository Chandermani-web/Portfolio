import * as THREE from 'three'
import { fontsReady, makeNodeLabel, makePill, makeDotTexture } from '../labels'

const TONE = { cyan: 0xff5a4f, sky: 0x7fc3ff, amber: 0xffb347, violet: 0xb794f6, green: 0x3ddc84 }
const TONE_HEX = { cyan: '#ff5a4f', sky: '#7fc3ff', amber: '#ffb347', violet: '#b794f6', green: '#3ddc84' }
const Y = 0.05 // height of every connector
const FLOOR = -0.78
// Radial segments per prism shape. Boxes are handled separately.
const SEGMENTS = { hex: 6, oct: 8, cyl: 32 }
// How fast packets travel on each kind of connector
const SPEED = { req: 1, cache: 1.1, repl: 0.6, egress: 0.8, deploy: 0.55 }
const PACKETS = { req: 3, cache: 3, repl: 2, egress: 2, deploy: 2 }
const DASHED = new Set(['repl', 'deploy'])

const v3 = (x, y, z) => new THREE.Vector3(x, y, z)

/** Orthogonal route between two nodes. `bend` is the x where the connector jogs in depth. */
function route(A, B) {
  const pts = []
  const dx = B.pos[0] - A.pos[0]
  if (Math.abs(dx) > 0.8) {
    const dir = Math.sign(dx)
    const sx = A.pos[0] + (dir * A.size[0]) / 2
    const ex = B.pos[0] - (dir * B.size[0]) / 2
    const mid = (sx + ex) / 2
    pts.push(v3(sx, Y, A.pos[2]))
    if (A.pos[2] !== B.pos[2]) pts.push(v3(mid, Y, A.pos[2]), v3(mid, Y, B.pos[2]))
    pts.push(v3(ex, Y, B.pos[2]))
  } else {
    const dz = Math.sign(B.pos[2] - A.pos[2])
    pts.push(v3(A.pos[0], Y, A.pos[2] + (dz * A.size[2]) / 2), v3(B.pos[0], Y, B.pos[2] - (dz * B.size[2]) / 2))
  }
  return pts
}

export async function createArchitecture({ el, data, onHover, onSelect }) {
  await fontsReady
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 160)
  const target = new THREE.Vector3(0, -0.3, 0)
  const dir = new THREE.Vector3(0, 0.62, 1).normalize()
  camera.position.copy(target).addScaledVector(dir, 31)
  camera.lookAt(target)

  const world = new THREE.Group() // yaws / pitches as you drag
  scene.add(world)
  const content = new THREE.Group() // re-centres the diagram on the pivot
  content.position.set(0, 0, -0.3)
  world.add(content)

  const dot = makeDotTexture()

  // Ambient dust floating over the diagram
  {
    const N = 260
    const pp = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pp[i * 3] = (Math.random() - 0.5) * 26
      pp[i * 3 + 1] = FLOOR + 0.3 + Math.random() * 6
      pp[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pp, 3))
    const dust = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.07, map: dot, color: 0xff8a7f, transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.NormalBlending }))
    dust.userData.dust = true
    content.add(dust)
    scene.userData.dust = dust
  }

  const grid = new THREE.GridHelper(30, 30, 0x4a3836, 0x2a1f1e)
  grid.position.set(0, FLOOR, 0.4)
  grid.material.transparent = true
  grid.material.opacity = 0.4
  content.add(grid)

  // ---- Floor frames: edge, VPC, subnets, database, pipeline ----
  const frames = []
  for (const z of data.zones) {
    const [x0, x1] = z.x
    const [z0, z1] = z.z
    const y = FLOOR + 0.012
    const col = TONE[z.tone]
    if (z.fill) {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(x1 - x0, z1 - z0),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.045, side: THREE.DoubleSide, depthWrite: false }),
      )
      plane.rotation.x = -Math.PI / 2
      plane.position.set((x0 + x1) / 2, y - 0.004, (z0 + z1) / 2)
      content.add(plane)
    } else {
      const pts = [v3(x0, y, z0), v3(x1, y, z0), v3(x1, y, z1), v3(x0, y, z1)]
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = z.dashed
        ? new THREE.LineDashedMaterial({ color: col, dashSize: 0.22, gapSize: 0.16, transparent: true, opacity: 0.6 })
        : new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 })
      const loop = new THREE.LineLoop(geo, mat)
      if (z.dashed) loop.computeLineDistances()
      content.add(loop)
      frames.push({ loop, mat })
    }
    const tag = makePill(z.label, { color: TONE_HEX[z.tone], dot: false, height: 0.27 })
    tag.position.set(x0 + tag.scale.x / 2 + 0.08, FLOOR + 0.2, z1 - 0.02)
    tag.material.opacity = 0.9
    content.add(tag)
  }

  // Shared AWS services, drawn as a quiet strip along the front
  {
    let cursor = -4.2
    const row = ['SHARED AWS SERVICES', ...data.platform]
    row.forEach((text, i) => {
      const lead = i === 0
      const p = makePill(text, { color: lead ? '#7fc3ff' : '#c9857f', dot: !lead, height: 0.27 })
      p.position.set(cursor + p.scale.x / 2, FLOOR + 0.2, 8.2)
      p.material.opacity = lead ? 0.95 : 0.8
      content.add(p)
      cursor += p.scale.x + 0.22
    })
  }

  // ---- Nodes ----
  const nodes = new Map()
  const meshes = []
  for (const def of data.nodes) {
    const [sx, sy, sz] = def.size
    const color = TONE[def.tone]
    const seg = SEGMENTS[def.shape]
    const g = new THREE.Group()
    g.position.set(def.pos[0], Y, def.pos[2])

    const geo = seg ? new THREE.CylinderGeometry(0.5, 0.5, sy, seg) : new THREE.BoxGeometry(sx, sy, sz)
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, depthWrite: false })
    const mesh = new THREE.Mesh(geo, mat)
    if (seg) mesh.scale.set(sx, 1, sz)
    mesh.userData.id = def.id
    g.add(mesh)
    meshes.push(mesh)

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color, transparent: true }))
    if (seg) edges.scale.set(sx, 1, sz)
    g.add(edges)

    // Database look: two extra rings make the cylinder read as a disk stack
    if (def.shape === 'cyl') {
      const ringPts = Array.from({ length: 48 }, (_, i) => v3(Math.cos((i / 48) * Math.PI * 2) * 0.5, 0, Math.sin((i / 48) * Math.PI * 2) * 0.5))
      for (const f of [-1 / 6, 1 / 6]) {
        const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 }))
        ring.scale.set(sx, 1, sz)
        ring.position.y = sy * f
        g.add(ring)
      }
    }

    // Lit top face
    const top = new THREE.Mesh(
      seg ? new THREE.CircleGeometry(0.44, seg) : new THREE.PlaneGeometry(sx * 0.86, sz * 0.7),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false }),
    )
    if (seg) top.scale.set(sx, sz, 1)
    top.rotation.x = -Math.PI / 2
    top.position.y = sy / 2 + 0.002
    g.add(top)

    const slab = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(sx + 0.5, 0.08, sz + 0.5)),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 }),
    )
    slab.position.y = FLOOR - Y + 0.04
    g.add(slab)
    const post = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([v3(0, -sy / 2, 0), v3(0, FLOOR - Y + 0.08, 0)]),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }),
    )
    g.add(post)

    const label = makeNodeLabel(def.title, def.sub, { color: TONE_HEX[def.tone], height: 0.72 })
    label.position.y = sy / 2 + 0.68
    g.add(label)

    content.add(g)
    nodes.set(def.id, { def, group: g, mat, edges, label, glow: 0 })
  }

  // ---- Connectors ----
  const colors = Object.fromEntries(Object.entries(data.edgeTypes).map(([k, t]) => [k, new THREE.Color(t.color)]))
  const routes = data.edges.map(([a, b, type = 'req'], i) => {
    const A = nodes.get(a).def
    const B = nodes.get(b).def
    const pts = route(A, B)
    const lens = [0]
    for (let k = 1; k < pts.length; k++) lens.push(lens[k - 1] + pts[k].distanceTo(pts[k - 1]))
    const total = lens[lens.length - 1]
    const col = colors[type]
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = DASHED.has(type)
      ? new THREE.LineDashedMaterial({ color: col, dashSize: 0.2, gapSize: 0.13, transparent: true, opacity: 0.6 })
      : new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.55 })
    const line = new THREE.Line(geo, mat)
    if (DASHED.has(type)) line.computeLineDistances()
    content.add(line)

    const last = pts[pts.length - 1]
    const prev = pts[pts.length - 2]
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 10), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9 }))
    const d = last.clone().sub(prev).normalize()
    arrow.position.copy(last).addScaledVector(d, -0.14)
    arrow.quaternion.setFromUnitVectors(v3(0, 1, 0), d)
    content.add(arrow)

    const at = (u) => {
      const dist = u * total
      for (let k = 1; k < pts.length; k++) {
        if (dist <= lens[k]) return pts[k - 1].clone().lerp(pts[k], (dist - lens[k - 1]) / (lens[k] - lens[k - 1] || 1))
      }
      return last.clone()
    }
    return { a, b, type, mat, arrow, at, total, speed: (0.45 + (i % 4) * 0.05) * SPEED[type], phase: i * 0.21, per: PACKETS[type] }
  })

  // Packets travelling on every connector, tinted by connector type
  const packetCount = routes.reduce((n, r) => n + r.per, 0)
  const packets = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }), packetCount)
  packets.frustumCulled = false
  {
    let n = 0
    const tint = new THREE.Color()
    for (const r of routes) {
      tint.copy(colors[r.type]).lerp(new THREE.Color(0xffffff), 0.25)
      for (let p = 0; p < r.per; p++) packets.setColorAt(n++, tint)
    }
    packets.instanceColor.needsUpdate = true
  }
  content.add(packets)
  const m4 = new THREE.Matrix4()

  // Selector ring that follows the focused node
  const selector = new THREE.Mesh(
    new THREE.RingGeometry(1.18, 1.26, 64),
    new THREE.MeshBasicMaterial({ color: 0xf4f1e6, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.NormalBlending }),
  )
  selector.rotation.x = -Math.PI / 2
  selector.position.y = FLOOR + 0.03
  content.add(selector)
  const selPos = new THREE.Vector3()

  const ray = new THREE.Raycaster()
  const state = { yaw: -0.12, pitch: 0, hovered: null, idle: 0 }
  let selected = null

  return {
    scene,
    camera,
    setSelected(id) {
      selected = id
    },
    onResize(w, h) {
      const aspect = w / h
      // Keep the full diagram in frame on narrow screens too
      const dist = Math.max(30, 52 / aspect)
      camera.position.copy(target).addScaledVector(dir, dist)
      camera.lookAt(target)
    },
    update({ t, dt, pointer, reduced }) {
      const k = reduced ? 0.1 : 1
      // Orbit by dragging; sway gently when left alone
      if (pointer.down) {
        state.yaw = THREE.MathUtils.clamp(state.yaw + pointer.dx * 0.006, -1.15, 1.15)
        state.pitch = THREE.MathUtils.clamp(state.pitch + pointer.dy * 0.003, -0.25, 0.3)
        state.idle = 0
      } else {
        state.idle += dt
        if (state.idle > 3.5) {
          const sway = Math.sin(t * 0.2 * k) * 0.22
          state.yaw += (sway - state.yaw) * Math.min(1, dt * 0.6)
          state.pitch += (0 - state.pitch) * Math.min(1, dt * 0.6)
        }
      }
      world.rotation.y = state.yaw
      world.rotation.x = state.pitch
      const dust = scene.userData.dust
      if (dust) dust.rotation.y += dt * 0.02 * k

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
      const linked = new Set()
      if (focus) {
        linked.add(focus)
        for (const r of routes) {
          if (r.a === focus) linked.add(r.b)
          if (r.b === focus) linked.add(r.a)
        }
      }

      for (const n of nodes.values()) {
        const on = focus === n.def.id
        const rel = !focus || linked.has(n.def.id)
        n.glow += ((on ? 1 : 0) - n.glow) * Math.min(1, dt * 10)
        n.mat.opacity = 0.14 + n.glow * 0.34
        n.group.scale.setScalar(1 + n.glow * 0.05)
        n.edges.material.opacity = rel ? 1 : 0.25
        n.label.material.opacity = rel ? 1 : 0.3
        n.group.position.y = Y + n.glow * 0.12 + Math.sin(t * 0.8 * k + n.def.pos[0] + n.def.pos[2]) * 0.03 * k
      }

      // Selector ring eases to the focused node and breathes
      const fn = focus ? nodes.get(focus) : null
      if (fn) {
        selPos.set(fn.def.pos[0], FLOOR + 0.03, fn.def.pos[2])
        if (selector.material.opacity < 0.05) selector.position.copy(selPos)
        selector.position.lerp(selPos, Math.min(1, dt * 12))
        const s = 1 + Math.sin(t * 4 * k) * 0.06
        const w = Math.max(fn.def.size[0], fn.def.size[2] * 1.3) / 2.2
        selector.scale.set(w * s, w * s, 1)
      }
      selector.material.opacity += ((fn ? 0.8 : 0) - selector.material.opacity) * Math.min(1, dt * 10)
      selector.material.color.setHex(fn ? TONE[fn.def.tone] : 0xf4f1e6)

      // Frames shimmer very slightly
      for (const f of frames) f.mat.opacity = 0.42 + Math.sin(t * 0.7 * k) * 0.06

      let i = 0
      for (const r of routes) {
        const active = !focus || r.a === focus || r.b === focus
        r.mat.opacity = active ? (focus ? 1 : 0.55) : 0.1
        r.arrow.material.opacity = active ? 0.95 : 0.15
        for (let p = 0; p < r.per; p++) {
          const u = (t * r.speed * k * (focus && active ? 1.8 : 1) * 0.35 + r.phase + p / r.per) % 1
          const pos = r.at(u)
          const sc = active ? 1 : 0.4
          m4.makeScale(sc, sc, sc).setPosition(pos)
          packets.setMatrixAt(i++, m4)
        }
      }
      packets.instanceMatrix.needsUpdate = true
    },
  }
}
