import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Stage from '@/components/Stage'
import { stageManager } from '@/three/stage'
import { createGazePortrait } from '@/three/scenes/gazePortrait'
import { fitImage } from '@/three/fit'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/utils'

const clamp = (v, a = -1, b = 1) => Math.max(a, Math.min(b, v))

/**
 * A photograph that pays attention to whatever the visitor focuses, with an SVG layer that draws the data
 * flow between DOM nodes and a gaze beam from the eyes to the active node.
 *
 * Nodes live in `children` as real buttons and opt in with data-holo="<id>". The parent owns hover / focus /
 * click state and passes `activeId`; this component measures the nodes, aims the portrait and draws lines.
 *
 *  edges    [{ a, b, color, on, flow }]  lines between two node ids
 *  linkIds  ids that get a highlighted line from the active node
 *  spatial  true when nodes sit around the photo (measured aim + beam); false on small screens, where
 *           `virtualLook(id)` supplies a {x,y} direction instead
 */
export default function HoloLab({ image, activeId, linkIds = [], linkColor = '#e8890c', edges = [], spatial, virtualLook, className, label, children }) {
  const uid = useId().replace(/:/g, '')
  const wrap = useRef(null)
  const stageApi = useRef(null)
  const live = useRef({})
  const reduced = useReducedMotion()
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [geo, setGeo] = useState({ edges: [], links: [], beam: null })
  const [fallback, setFallback] = useState(false)

  live.current = { image, activeId, linkIds, edges, spatial, virtualLook }
  const edgesKey = JSON.stringify(edges)
  const linksKey = linkIds.join('|')

  useEffect(() => {
    if (!stageManager.ok) setFallback(true)
    const ro = new ResizeObserver(([e]) => setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }))
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [])

  const fit = size.w ? fitImage({ W: size.w, H: size.h, iw: image.size[0], ih: image.size[1], mode: image.fit, ax: image.ax, ay: image.ay }) : null
  const toView = (x, y) => (fit ? { x: fit.offX + x * fit.s, y: fit.offY + y * fit.s } : { x: 0, y: 0 })
  /** Style that places an element at image pixel (x, y), as a percentage of the lab box. */
  const pt = (x, y) => {
    if (!fit) return { left: '-999px', top: 0 }
    const p = toView(x, y)
    return { left: `${(p.x / size.w) * 100}%`, top: `${(p.y / size.h) * 100}%` }
  }

  const measure = useCallback(() => {
    const root = wrap.current
    if (!root) return
    const { image: img, activeId: act, linkIds: links, edges: eds, spatial: sp, virtualLook: vl } = live.current
    const c = root.getBoundingClientRect()
    if (!c.width) return
    const f = fitImage({ W: c.width, H: c.height, iw: img.size[0], ih: img.size[1], mode: img.fit, ax: img.ax, ay: img.ay })
    const view = (x, y) => ({ x: f.offX + x * f.s, y: f.offY + y * f.s })
    const centre = (id) => {
      const el = root.querySelector(`[data-holo="${id}"]`)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 }
    }
    const head = view(...img.head)
    const eyes = view(...img.eyeMid)
    const target = act ? centre(act) : null

    let look = null
    if (act) {
      if (sp && target) look = { x: clamp((target.x - head.x) / (c.width * 0.4)), y: clamp(-(target.y - head.y) / (c.height * 0.4)) }
      else if (vl) look = vl(act)
    }
    stageApi.current?.setLook(look)

    setGeo({
      edges: eds.map((e) => ({ ...e, p: centre(e.a), q: centre(e.b) })).filter((e) => e.p && e.q),
      links: sp && target ? links.map((id) => ({ id, p: target, q: centre(id) })).filter((l) => l.q) : [],
      beam: sp && target ? { from: eyes, to: target } : null,
    })
  }, [])

  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(id)
  }, [measure, size.w, size.h, activeId, spatial, edgesKey, linksKey])

  const create = async () => {
    try {
      return await createGazePortrait(live.current.image)
    } catch (err) {
      setFallback(true)
      throw err
    }
  }

  const curve = (p, q, bow = 0.12) => {
    const mx = (p.x + q.x) / 2
    const my = (p.y + q.y) / 2
    const nx = -(q.y - p.y) * bow
    const ny = (q.x - p.x) * bow
    return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`
  }

  return (
    <div ref={wrap} role="group" aria-label={label} className={cn('relative isolate overflow-hidden border border-border shadow-[0_20px_44px_-22px_rgba(70,48,12,0.45)]', className)}>
      {fallback && (
        <img
          src={image.url}
          alt=""
          className="absolute inset-0 size-full"
          style={{ objectFit: image.fit, objectPosition: `${(image.ax ?? 0.5) * 100}% 50%` }}
          decoding="async"
        />
      )}
      <Stage create={create} onReady={(s) => { stageApi.current = s; measure() }} className="absolute inset-0 select-none" aria-hidden="true" />

      {size.w > 0 && (
        <svg className="pointer-events-none absolute inset-0 size-full" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
          {geo.beam && (
            <defs>
              <linearGradient id={`beam-${uid}`} gradientUnits="userSpaceOnUse" x1={geo.beam.from.x} y1={geo.beam.from.y} x2={geo.beam.to.x} y2={geo.beam.to.y}>
                <stop offset="0" stopColor="#e6fbff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          )}
          {geo.edges.map((e, i) => {
            const d = curve(e.p, e.q, e.bow ?? 0)
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={e.color} strokeWidth={e.on ? 2 : 1} opacity={e.on ? 0.95 : e.faint ? 0.16 : 0.38} style={e.on ? { filter: `drop-shadow(0 0 4px ${e.color})` } : undefined} />
                {e.flow && !reduced && (
                  <circle r={e.on ? 3.2 : 2.2} fill={e.color} opacity={e.on ? 1 : 0.7}>
                    <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            )
          })}
          {geo.links.map((l) => (
            <path key={l.id} d={curve(l.p, l.q, 0.1)} fill="none" stroke={linkColor} strokeWidth="1.6" opacity="0.9" strokeDasharray="5 5" style={{ filter: `drop-shadow(0 0 4px ${linkColor})` }} />
          ))}
          {geo.beam && (
            <>
              <path d={curve(geo.beam.from, geo.beam.to, 0.05)} fill="none" stroke={`url(#beam-${uid})`} strokeWidth="1.5" className="gaze-beam" style={{ filter: 'drop-shadow(0 0 5px #22d3ee)' }} />
              <circle cx={geo.beam.from.x} cy={geo.beam.from.y} r="3" fill="#e6fbff" opacity="0.9" />
            </>
          )}
        </svg>
      )}

      {children({ pt, size, fit })}
    </div>
  )
}
