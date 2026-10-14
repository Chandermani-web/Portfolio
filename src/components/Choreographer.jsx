import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { isFinePointer, prefersReducedMotion, whenOpen } from '@/lib/motion'

/*
 * The scroll choreographer.
 * Pages never write their own ScrollTriggers: they tag elements with data-attributes and this component, which watches
 * <main>, wires each tagged element the moment it mounts (lazy routes, tabs and all) and tears everything down per route.
 *
 *   data-split="lines|words|chars"   headline text rises out of a mask          (optional data-split-delay)
 *   data-reveal[="up|left|right|scale|blur"]  one element eases in
 *   data-stagger[="up|left|rise|pop"] children arrive one after another          (optional data-stagger-each)
 *   data-clip[="up|left|right"]       image/panel is unwrapped by a clip-path, its content settles from a zoom
 *   data-line                         a rule draws itself left to right
 *   data-swing                        hangs from the top and swings still (the lanyard badge)
 *   data-parallax="0.2"               scrubbed vertical drift (negative = opposite way)
 *   data-count                        numbers inside count up from zero
 *   data-bar="72"                     bar grows to 72% (scaleX from the left)
 *   data-magnetic                     element leans towards the pointer
 *   data-scrub-fill                   (Experience spine) scaleY follows scroll through the element's parent
 */

const START = 'top 86%'
const ONCE = { once: true }

/** CSS transitions (transition-all on buttons, tabs...) would chase every GSAP frame: switch them off while it plays. */
const calm = (targets) => gsap.set(targets, { transition: 'none' })

function reveal(el, ctx) {
  const kind = el.dataset.reveal || 'up'
  const from = {
    up: { y: 48, opacity: 0 },
    left: { x: -64, opacity: 0 },
    right: { x: 64, opacity: 0 },
    scale: { scale: 0.88, opacity: 0, transformOrigin: '50% 60%' },
    blur: { y: 24, opacity: 0, filter: 'blur(12px)' },
    fade: { opacity: 0 }, // for anything holding a WebGL stage: its rect must not be transformed
  }[kind]
  calm(el)
  gsap.from(el, { ...from, duration: kind === 'fade' ? 1.6 : 1.1, ease: kind === 'fade' ? 'power2.out' : 'expo.out', clearProps: 'filter,transform,transition', scrollTrigger: { trigger: el, start: START, ...ONCE } })
  void ctx
}

function stagger(el) {
  const kind = el.dataset.stagger || 'up'
  const each = parseFloat(el.dataset.staggerEach ?? '0.09')
  const kids = [...el.children]
  if (!kids.length) return
  const from = {
    up: { y: 44, opacity: 0 },
    left: { x: -48, opacity: 0 },
    rise: { y: 70, opacity: 0, rotateX: -14, transformPerspective: 900, transformOrigin: '50% 100%' },
    pop: { scale: 0.82, y: 20, opacity: 0, ease: 'back.out(1.6)' },
  }[kind]
  calm(kids)
  gsap.from(kids, { ...from, duration: 1, ease: from.ease ?? 'expo.out', stagger: each, clearProps: 'transform,opacity,transition', scrollTrigger: { trigger: el, start: START, ...ONCE } })
}

function clip(el) {
  const kind = el.dataset.clip || 'up'
  const hidden = { up: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' }[kind]
  const inner = el.querySelector('img, [data-clip-inner]')
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', ...ONCE } })
  tl.fromTo(el, { clipPath: hidden }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' })
  if (inner) tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
}

function split(el, ctx) {
  const type = el.dataset.split || 'lines'
  const delay = parseFloat(el.dataset.splitDelay ?? '0')
  const tween = (self) => {
    const targets = type === 'chars' ? self.chars : type === 'words' ? self.words : self.lines
    return gsap.from(targets, {
      yPercent: 115,
      rotate: type === 'chars' ? 4 : 0,
      duration: type === 'chars' ? 0.9 : 1.15,
      ease: 'expo.out',
      delay,
      stagger: type === 'chars' ? 0.025 : type === 'words' ? 0.05 : 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%', ...ONCE },
      onComplete: () => self.revert(), // hand the clean DOM back once it has landed
    })
  }
  SplitText.create(el, { type: type === 'chars' ? 'lines,chars' : type === 'words' ? 'lines,words' : 'lines', mask: 'lines', autoSplit: true, onSplit: tween })
  void ctx
}

function swing(el) {
  // hangs from its lanyard: drops in, then swings itself still
  gsap.set(el, { transformOrigin: '50% 0%' })
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', ...ONCE } })
  tl.from(el, { opacity: 0, y: -90, duration: 0.7, ease: 'power3.out' }).from(el, { rotate: 14, duration: 2.6, ease: 'elastic.out(1, 0.3)', clearProps: 'transform' }, 0.15)
}

function line(el) {
  gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', ...ONCE } })
}

function parallax(el) {
  const k = parseFloat(el.dataset.parallax || '0.2')
  gsap.fromTo(el, { yPercent: -k * 50 }, { yPercent: k * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
}

function count(el) {
  // finds the first number in the text ("500+", "SIH 2025" ...) and counts it up, keeping the rest of the string
  const original = el.textContent
  const m = original.match(/(\d[\d,]*)/)
  if (!m) return
  const target = parseInt(m[1].replace(/,/g, ''), 10)
  if (!target || target > 99999 || target >= 1900) return // years and ids stay as written
  const [pre, post] = [original.slice(0, m.index), original.slice(m.index + m[1].length)]
  const o = { v: 0 }
  el.style.fontVariantNumeric = 'tabular-nums'
  el.textContent = pre + '0' + post
  gsap.to(o, { v: target, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = pre + Math.round(o.v) + post }, onComplete: () => { el.textContent = original }, scrollTrigger: { trigger: el, start: 'top 92%', ...ONCE } })
}

function bar(el) {
  const to = parseFloat(el.dataset.bar)
  gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.out', delay: parseFloat(el.dataset.barDelay ?? '0'), scrollTrigger: { trigger: el, start: 'top 94%', ...ONCE } })
  void to
}

function magnetic(el) {
  if (!isFinePointer()) return
  const strength = parseFloat(el.dataset.magnetic || '0.28')
  const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  const move = (e) => {
    const r = el.getBoundingClientRect()
    x((e.clientX - (r.left + r.width / 2)) * strength)
    y((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x(0); y(0) }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}

function scrubFill(el) {
  gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top 62%', end: 'bottom 62%', scrub: 0.5 } })
}

const HANDLERS = [
  ['[data-split]', split],
  ['[data-reveal]', reveal],
  ['[data-stagger]', stagger],
  ['[data-clip]', clip],
  ['[data-line]', line],
  ['[data-swing]', swing],
  ['[data-parallax]', parallax],
  ['[data-count]', count],
  ['[data-bar]', bar],
  ['[data-magnetic]', magnetic],
  ['[data-scrub-fill]', scrubFill],
]

export default function Choreographer() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const main = document.querySelector('main')
    if (!main) return undefined
    const roots = [main, ...document.querySelectorAll('footer')]

    // Everything created inside ctx.add() is collected, so one revert() on route change removes every trigger, split and tween
    const ctx = gsap.context(() => {}, main)
    let observer
    let alive = true
    const marked = new Set()
    const cleanups = []

    const scan = () =>
      ctx.add(() => {
        for (const [selector, fn] of HANDLERS) {
          for (const el of roots.flatMap((r) => [...r.querySelectorAll(selector)])) {
            if (el.__anim?.has(selector)) continue
            ;(el.__anim ??= new Set()).add(selector)
            marked.add(el)
            const off = fn(el)
            if (typeof off === 'function') cleanups.push(off)
          }
        }
      })

    // Wait for fonts (so line breaks are measured correctly) and for the curtain to lift, then wire everything up
    Promise.all([document.fonts?.ready ?? Promise.resolve(), whenOpen()]).then(() => {
      if (!alive) return
      scan()
      observer = new MutationObserver((list) => {
        if (list.some((m) => m.addedNodes.length)) scan()
      })
      roots.forEach((r) => observer.observe(r, { childList: true, subtree: true }))
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    // images and the lazy 3D labs change page height after load: keep trigger positions honest
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      alive = false
      observer?.disconnect()
      window.removeEventListener('load', onLoad)
      cleanups.forEach((off) => off())
      ctx.revert()
      marked.forEach((el) => delete el.__anim)
    }
  }, [pathname])

  return null
}
