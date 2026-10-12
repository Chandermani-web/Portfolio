import * as THREE from 'three'
import { fontsReady, makePill, makeDotTexture } from '../labels'

const R = 2.6
const rad = (d) => (d * Math.PI) / 180
const ll = (lat, lon, r = R) => new THREE.Vector3(r * Math.cos(rad(lat)) * Math.sin(rad(lon)), r * Math.sin(rad(lat)), r * Math.cos(rad(lat)) * Math.cos(rad(lon)))

const HOME = { name: 'BAHADURGARH · IN', lat: 28.69, lon: 76.93 }
const REACH = [
  { lat: 22.72, lon: 75.86 }, // Indore
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 1.35, lon: 103.8 }, // Singapore
  { lat: 37.77, lon: -122.42 }, // San Francisco
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 52.5, lon: 13.4 }, // Berlin
]

/** A dotted globe centred on home, with signal arcs out to the rest of the world. */
export async function createGlobe({ el }) {
  await fontsReady
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  camera.position.set(0, 0, 10.5)
  const dot = makeDotTexture()

  const globe = new THREE.Group()
  scene.add(globe)

  // Solid dark core so the far side is hidden behind the near side
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), new THREE.MeshBasicMaterial({ color: 0xf4ecd9 })))

  // Lat / lon lines
  const lines = []
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let i = 0; i < 96; i++) {
      lines.push(ll(lat, (i / 96) * 360), ll(lat, ((i + 1) / 96) * 360))
    }
  }
  for (let lon = 0; lon < 360; lon += 30) {
    for (let i = 0; i < 64; i++) {
      lines.push(ll(-90 + (i / 64) * 180, lon), ll(-90 + ((i + 1) / 64) * 180, lon))
    }
  }
  globe.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lines), new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.24 })))

  // Dotted surface in patches, which reads like landmass without shipping map data
  const pts = []
  const cols = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  const N = 2600
  const c1 = new THREE.Color('#0891b2')
  const c2 = new THREE.Color('#0e7fa8')
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const x = Math.cos(th) * r
    const z = Math.sin(th) * r
    const n = Math.sin(x * 2.3 + 1.2) * Math.sin(y * 2.9 + 0.4) * Math.sin(z * 2.1 + 2.2) + Math.sin(x * 5 + z * 4) * 0.12
    if (n < -0.05) continue
    pts.push(x * R, y * R, z * R)
    const c = c2.clone().lerp(c1, Math.min(1, (n + 0.1) * 2.2))
    cols.push(c.r, c.g, c.b)
  }
  const dg = new THREE.BufferGeometry()
  dg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  dg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3))
  globe.add(new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, map: dot, transparent: true, depthWrite: false, blending: THREE.NormalBlending })))

  // Atmosphere rim
  const rim = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0x0ea5e9, transparent: true, opacity: 0.5, blending: THREE.NormalBlending, depthWrite: false }))
  rim.scale.set(R * 2.45, R * 2.45, 1)
  scene.add(rim)

  // Home marker
  const home = ll(HOME.lat, HOME.lon)
  const normal = home.clone().normalize()
  const marker = new THREE.Group()
  marker.position.copy(home)
  marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
  globe.add(marker)
  const pulses = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.13, 48), new THREE.MeshBasicMaterial({ color: 0xe8890c, transparent: true, side: THREE.DoubleSide, depthWrite: false }))
    marker.add(m)
    return m
  })
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), new THREE.MeshBasicMaterial({ color: 0xf6b34a }))
  marker.add(core)
  const pole = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.8)]), new THREE.LineBasicMaterial({ color: 0xe8890c }))
  marker.add(pole)
  const tag = makePill(HOME.name, { color: '#e8890c', height: 0.38 })
  tag.position.set(0, 0, 1.0)
  tag.material.depthTest = false
  tag.renderOrder = 10
  marker.add(tag)

  // Arcs
  const arcs = REACH.map((p, i) => {
    const b = ll(p.lat, p.lon)
    const dist = home.distanceTo(b)
    const mid = home.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + dist * 0.38)
    const curve = new THREE.QuadraticBezierCurve3(home, mid, b)
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), new THREE.LineBasicMaterial({ color: 0x0891b2, transparent: true, opacity: 0.5 }))
    globe.add(line)
    const end = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: 0x0891b2 }))
    end.position.copy(b)
    globe.add(end)
    const runner = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xe8890c, transparent: true, blending: THREE.NormalBlending, depthWrite: false }))
    runner.scale.set(0.24, 0.24, 1)
    globe.add(runner)
    return { curve, runner, phase: i * 0.17 }
  })

  const lonHome = -HOME.lon
  const tilt = rad(HOME.lat) * 0.85
  const st = { offset: 0, ry: lonHome, vel: 0 }
  globe.rotation.set(tilt, lonHome, 0)

  return {
    scene,
    camera,
    onResize(w, h) {
      camera.position.z = Math.max(10.5, 10.5 / (w / h) * 0.95)
    },
    update({ t, dt, pointer, reduced }) {
      const k = reduced ? 0.1 : 1
      if (pointer.down) {
        st.offset += pointer.dx * 0.007
        globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + pointer.dy * 0.004, -0.2, 1.1)
      } else {
        st.offset += (0 - st.offset) * Math.min(1, dt * 0.35)
        globe.rotation.x += (tilt - globe.rotation.x) * Math.min(1, dt * 0.5)
      }
      globe.rotation.y = lonHome + st.offset + Math.sin(t * 0.25 * k) * 0.35 * k
      el.style.cursor = pointer.down ? 'grabbing' : 'grab'

      pulses.forEach((m, i) => {
        const u = (t * 0.6 * k + i / 3) % 1
        m.scale.setScalar(1 + u * 5)
        m.material.opacity = (1 - u) * 0.8
      })
      core.scale.setScalar(1 + Math.sin(t * 4 * k) * 0.15)
      for (const a of arcs) {
        const u = (t * 0.22 * k + a.phase) % 1
        a.runner.position.copy(a.curve.getPoint(u))
        a.runner.material.opacity = Math.sin(u * Math.PI)
      }
    },
  }
}
