import * as THREE from 'three'

/**
 * A photograph rendered as a lightly "2.5D" plane.
 *
 * What this does, honestly:
 *  - Depth parallax: a hand-placed set of gaussian depth bumps (head, body, floating holograms) displaces
 *    a subdivided plane. Moving the look vector pushes nearer bumps further than the background, so the
 *    head and panels slide against the backdrop like a small head turn. This is a parallax illusion.
 *  - Iris shift: inside a small elliptical mask around each eye the texture is sampled with a few pixels
 *    of offset, so the iris and pupil in the real photo drift toward the target. The eyelids stay put.
 *    It is a simulation of gaze, not a facial rig, and is kept to a few pixels so it stays believable.
 *  Eyes respond faster than the head, which is what makes the attention feel natural.
 */
const FOV = 40
const DIST = 4
const MAX_BUMPS = 10

const VERT = /* glsl */ `
  uniform vec2 uSize;
  uniform vec4 uBumps[${MAX_BUMPS}];
  uniform vec2 uLook;
  uniform float uDepth;
  uniform float uShift;
  uniform float uDist;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec2 px = vec2(uv.x, 1.0 - uv.y) * uSize;
    float d = 0.0;
    for (int i = 0; i < ${MAX_BUMPS}; i++) {
      vec4 b = uBumps[i];
      vec2 q = (px - b.xy) / max(b.z, 1.0);
      d += b.w * exp(-dot(q, q));
    }
    vec3 pos = position;
    pos.xy += uLook * d * uShift;
    vec4 w = modelMatrix * vec4(pos, 1.0);
    w.z += d * uDepth;
    // cancel the perspective growth of raised points, so the rest pose matches the photo exactly;
    // moving the camera then reveals the depth as parallax
    w.xy *= (uDist - w.z) / uDist;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uSize;
  uniform vec4 uEyes[2];
  uniform vec2 uIris;
  uniform vec4 uFeather;
  uniform float uTime;
  uniform float uScan;
  varying vec2 vUv;
  void main() {
    vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uSize;
    vec2 shift = vec2(0.0);
    for (int i = 0; i < 2; i++) {
      vec4 e = uEyes[i];
      vec2 q = (px - e.xy) / e.zw;
      shift += uIris * (1.0 - smoothstep(0.5, 1.0, length(q)));
    }
    vec2 uv2 = vUv - vec2(shift.x, -shift.y) / uSize;
    vec4 c = texture2D(uMap, uv2);

    // restrained holographic sweep, a faint band drifting down the frame
    float band = exp(-pow((vUv.y - (1.0 - fract(uTime * 0.06))) * 16.0, 2.0));
    c.rgb += vec3(0.02, 0.16, 0.22) * band * uScan;

    vec4 f = max(uFeather, vec4(0.0001));
    float a = smoothstep(0.0, f.x, vUv.x) * smoothstep(0.0, f.y, 1.0 - vUv.x)
            * smoothstep(0.0, f.z, 1.0 - vUv.y) * smoothstep(0.0, f.w, vUv.y);
    gl_FragColor = vec4(c.rgb, a);
    #include <colorspace_fragment>
  }
`

const damp = (cur, target, tau, dt) => cur + (target - cur) * (1 - Math.exp(-dt / tau))

/**
 * cfg: { url, size:[w,h], fit, ax, ay, scale, bumps:[[x,y,r,h]], eyes:[[x,y,rx,ry]x2],
 *        irisMax:[px], irisVertical, headShift, depth, feather:[l,r,t,b] }
 * Returns a stage ({scene,camera,update,onResize,dispose}) plus setLook({x,y}|null).
 * Look vectors are -1..1, x to the right and y up.
 */
export async function createGazePortrait(cfg) {
  const {
    url, size, fit = 'cover', ax = 0.5, ay = 0.5, scale = 1,
    bumps, eyes, irisMax = 3, irisVertical = 0.4, headShift = 0.014, depth = 0.7,
    feather = [0, 0, 0, 0],
  } = cfg
  const [iw, ih] = size

  const tex = await new THREE.TextureLoader().loadAsync(url)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50)
  camera.position.set(0, 0, DIST)

  const b4 = Array.from({ length: MAX_BUMPS }, (_, i) => new THREE.Vector4(...(bumps[i] ?? [0, 0, 1, 0])))
  const e4 = eyes.map((e) => new THREE.Vector4(...e))
  const uniforms = {
    uMap: { value: tex },
    uSize: { value: new THREE.Vector2(iw, ih) },
    uBumps: { value: b4 },
    uEyes: { value: e4 },
    uLook: { value: new THREE.Vector2() },
    uIris: { value: new THREE.Vector2() },
    uDepth: { value: depth },
    uShift: { value: headShift },
    uDist: { value: DIST },
    uFeather: { value: new THREE.Vector4(...feather) },
    uTime: { value: 0 },
    uScan: { value: 1 },
  }
  const segX = 96
  const segY = Math.round((96 * ih) / iw)
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, segX, Math.max(segY, 24)),
    new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false }),
  )
  scene.add(mesh)

  const viewH = 2 * DIST * Math.tan((FOV * Math.PI) / 360)
  let target = null // {x,y} or null
  const head = { x: 0, y: 0 }
  const eye = { x: 0, y: 0 }

  const onResize = (w, h) => {
    const s = fit === 'cover' ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih)
    const dw = iw * s
    const dh = ih * s
    const offX = (w - dw) * ax
    const offY = (h - dh) * ay
    const k = viewH / h // world units per css pixel
    mesh.scale.set(dw * k * scale, dh * k * scale, 1)
    mesh.position.set(((offX + dw / 2) - w / 2) * k, -((offY + dh / 2) - h / 2) * k, 0)
  }

  const update = ({ t, dt, pointer, reduced, mobile }) => {
    let tx = 0
    let ty = 0
    let follow = 0
    if (target) {
      tx = target.x
      ty = target.y
      follow = 1
    } else if (pointer.inside && !mobile) {
      // no node selected: glance loosely toward the pointer
      tx = pointer.x * 0.5
      ty = pointer.y * 0.5
      follow = 0.6
    }
    const idle = reduced || follow ? 0 : 1
    tx += Math.sin(t * 0.37) * 0.06 * idle
    ty += Math.cos(t * 0.29) * 0.04 * idle

    // eyes lead (fast), head follows (slow); reduced motion keeps only a quick, small eye shift
    eye.x = damp(eye.x, tx, reduced ? 0.05 : 0.07, dt)
    eye.y = damp(eye.y, ty, reduced ? 0.05 : 0.07, dt)
    head.x = damp(head.x, reduced ? 0 : tx, 0.28, dt)
    head.y = damp(head.y, reduced ? 0 : ty, 0.28, dt)

    uniforms.uIris.value.set(eye.x * irisMax * (reduced ? 0.7 : 1), -eye.y * irisMax * irisVertical * (reduced ? 0.7 : 1))
    uniforms.uLook.value.set(head.x, head.y)
    uniforms.uTime.value = t
    uniforms.uScan.value = reduced ? 0 : 1
    const par = reduced ? 0 : 1
    camera.position.x = head.x * 0.2 * par
    camera.position.y = head.y * 0.12 * par + Math.sin(t * 0.5) * 0.008 * par
    camera.lookAt(0, 0, 0)
  }

  return {
    scene,
    camera,
    update,
    onResize,
    setLook: (v) => { target = v },
    dispose: () => {
      tex.dispose()
    },
  }
}
