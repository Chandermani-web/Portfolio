import { useEffect, useRef } from 'react'

/**
 * Hero atmosphere: three hairline rays that meet at one hot point (the "sun" behind the portrait),
 * pulses that travel along them, and a jagged bolt that snaps from the rays to the cursor.
 * Adapted from the "Quantum Matrix" shader, recoloured red and pointed at the portrait.
 *
 * - `center` is where the rays meet, in 0..1 of the canvas (y up).
 * - Pauses off-screen and when the tab is hidden; with reduced motion it draws one still frame.
 * - If WebGL is missing the canvas just stays empty and the CSS glow underneath carries the hero.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_active;
uniform vec2 u_center;
uniform vec3 u_color;

float hash(float n) { return fract(sin(n) * 753.5453123); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

// x = distance to the segment, y = position along it (0..1)
vec2 sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return vec2(length(pa - ba * h), h);
}

float lightning(vec2 uv, vec2 a, vec2 b, float t) {
  vec2 ab = b - a;
  float len = length(ab);
  if (len < 0.01) return 0.0;
  vec2 dir = ab / len;
  vec2 pa = uv - a;
  float h = clamp(dot(pa, dir) / len, 0.0, 1.0);
  float dist = length(pa - dir * (h * len));
  float env = sin(h * 3.1415);
  float offset = (noise(h * 25.0 - t * 35.0) - 0.5) * 0.08 * env;
  offset += (noise(h * 70.0 + t * 50.0) - 0.5) * 0.02 * env;
  float d = abs(dist + offset);
  return (0.0002 / (d + 0.0002) + 0.00001 / (d * d + 0.00001)) * env;
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 st = uv * 2.0 - 1.0;
  st.x *= aspect;

  vec2 m = u_mouse / u_res * 2.0 - 1.0;
  m.x *= aspect;

  vec2 center = u_center * 2.0 - 1.0;
  center.x *= aspect;
  center.x += sin(u_time * 0.4) * 0.03;
  center.y += cos(u_time * 0.3) * 0.03;

  vec2 dirUp = normalize(vec2(-0.12, 1.0));
  vec2 dirRight = normalize(vec2(1.0, -0.22));
  vec2 dirLeft = normalize(vec2(-1.0, -0.42));

  vec2 l1 = sdLine(st, center, center + dirUp * 5.0);
  vec2 l2 = sdLine(st, center, center + dirRight * 5.0);
  vec2 l3 = sdLine(st, center, center + dirLeft * 5.0);

  float k = 0.0042;
  float glow = k / (l1.x + 0.001) + k / (l2.x + 0.001) + (k * 0.45) / (l3.x + 0.001);

  float p1 = smoothstep(0.1, 0.0, abs(l1.y - fract(u_time * 0.4))) * 0.024 / (l1.x + 0.001);
  float p2 = smoothstep(0.1, 0.0, abs(l2.y - fract(u_time * 0.5 + 0.3))) * 0.024 / (l2.x + 0.001);
  float p3 = smoothstep(0.1, 0.0, abs(l3.y - fract(u_time * 0.3 + 0.7))) * 0.012 / (l3.x + 0.001);
  glow += p1 + p2 + p3;

  // bolts: from the nearest point on each ray to the cursor (skipped while idle)
  if (u_active > 0.001) {
    vec2 q1 = center + dirUp * clamp(dot(m - center, dirUp), 0.0, 5.0);
    vec2 q2 = center + dirRight * clamp(dot(m - center, dirRight), 0.0, 5.0);
    vec2 q3 = center + dirLeft * clamp(dot(m - center, dirLeft), 0.0, 5.0);
    float flicker = step(0.1, noise(u_time * 60.0)) * (noise(u_time * 150.0) * 0.8 + 0.2);
    glow += lightning(st, q1, m, u_time) * (1.0 - smoothstep(0.0, 2.0, length(m - q1))) * u_active * flicker;
    glow += lightning(st, q2, m, u_time + 10.0) * (1.0 - smoothstep(0.0, 2.0, length(m - q2))) * u_active * flicker;
    glow += lightning(st, q3, m, u_time + 20.0) * (1.0 - smoothstep(0.0, 2.0, length(m - q3))) * u_active * flicker;
  }

  float dc = length(st - center);
  glow += 0.035 / (dc + 0.01);

  // hot core drifts toward warm white, the rest stays red
  vec3 col = mix(u_color, vec3(1.0, 0.62, 0.45), clamp(glow * 0.05, 0.0, 0.7)) * glow;
  col *= 0.85 + 0.15 * sin(u_time * 2.0 - dc * 8.0);

  // keep the copy side quiet so the headline stays readable
  col *= mix(0.32, 1.0, smoothstep(0.12, 0.62, uv.x));
  col *= 1.0 - smoothstep(0.5, 2.1, length(st - center * 0.4));
  col = max(col, vec3(0.0));

  col = 1.0 - exp(-col * 1.15);
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.018;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('RedField shader:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export default function RedField({ center = [0.78, 0.5], color = [0.88, 0.14, 0.11], className = '' }) {
  const canvasRef = useRef(null)
  const cfg = useRef({ center, color })
  cfg.current = { center, color }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return undefined

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return undefined
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {}
    for (const n of ['u_res', 'u_time', 'u_mouse', 'u_active', 'u_center', 'u_color']) u[n] = gl.getUniformLocation(prog, n)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let raf = 0
    let visible = true
    let mx = -1000
    let my = -1000
    let lastMove = -1e9
    let active = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
    }

    const draw = (now) => {
      raf = 0
      resize()
      const t = reduced ? 2.4 : (now - t0) / 1000
      const since = now - lastMove
      const target = since < 150 ? 1 : Math.max(0, 1 - (since - 150) / 350)
      active += (target - active) * 0.15
      const { center: c, color: col } = cfg.current
      gl.uniform2f(u.u_res, canvas.width, canvas.height)
      gl.uniform1f(u.u_time, t)
      gl.uniform2f(u.u_mouse, mx, my)
      gl.uniform1f(u.u_active, reduced ? 0 : active)
      gl.uniform2f(u.u_center, c[0], c[1])
      gl.uniform3f(u.u_color, col[0], col[1], col[2])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(draw)
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return
      const sx = canvas.width / r.width
      const sy = canvas.height / r.height
      mx = (e.clientX - r.left) * sx
      my = (r.bottom - e.clientY) * sy
      lastMove = performance.now()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) start()
      else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      if (reduced) start()
    })
    ro.observe(canvas)
    const onVis = () => (document.hidden ? raf && (cancelAnimationFrame(raf), (raf = 0)) : start())
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
    start()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
