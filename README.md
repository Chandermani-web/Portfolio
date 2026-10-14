# Chandermani Mishra: 3D portfolio

Vite + React 19 + Tailwind CSS v4 + shadcn/ui + lucide-react + three.js + **GSAP** (ScrollTrigger, SplitText) + **Lenis**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## How the 3D works
One fixed `<canvas>` serves the whole page (`src/components/Scene3D.jsx`). Each section that wants 3D
renders a `<Stage create={...}/>`; `src/three/stage.js` scissors the canvas to that element and renders
its scene there, with its own pointer state (hover, drag, click). Scenes live in `src/three/scenes/`:

| Scene | File |
| --- | --- |
| Page backdrop (stars, grid, scroll flythrough) | `background.js` |
| Hero reactor around the portrait (**no longer used**: the hero is now the dark poster below; safe to delete) | `hero.js` |
| Gaze portrait: photo as a 2.5D plane that looks toward the focused node (Architecture and Stack labs) | `gazePortrait.js` |
| Java / Spring Boot layer stack with a request travelling through it | `javaStack.js` |
| 3D AWS architecture diagram (CDN, ALB, proxies, cache, shards, replicas, CI/CD) | `architecture.js` |
| Contact globe | `globe.js` |

`prefers-reduced-motion` slows animation to near-still. If WebGL is unavailable the content still reads normally.

## Pages and routes
Each nav link is its own page (React Router, one lazy-loaded chunk per page), all in the dark poster style of the hero:

| Route | Page |
|---|---|
| `/` | Hero, index of every page, "now", closing call to action |
| `/about` `/stack` `/mern-java` `/projects` `/architecture` `/services` `/experience` `/contact` | One page each, opening with a poster header (`PageHeader`) and ending with a link to the next page |

The route list, page titles and one-line descriptions all come from `nav` in `src/data/portfolio.js`; routes are declared in
`src/App.jsx`. Because these are real URLs, the host must serve `index.html` for unknown paths: `nginx.conf` (Docker),
`vercel.json` and `public/_redirects` (Netlify) are included. Shared pieces: `layout/Layout.jsx` (nav, footer, scroll reset),
`components/PageShell.jsx`, `HomeIndex.jsx`, `CtaBand.jsx`, `Footer.jsx`.

## Hero (dark poster)
`src/sections/Hero.jsx` is the only dark section: giant name, a red sun with the portrait in front of it, Onest +
Instrument Serif italic. Its background is `src/components/RedField.jsx`, a small WebGL shader (rays that meet behind the
portrait, travelling pulses, a bolt to the cursor). It measures where the portrait sits so the rays always meet behind it,
pauses off-screen, draws one still frame under `prefers-reduced-motion`, and leaves plain CSS glow if WebGL is missing.
All hero styles are scoped under `.hero-poster` in `index.css` (red `#e0231c`); the rest of the site keeps the cream theme.
`Nav.jsx` switches to a dark glass bar while the hero is on screen.

## Interactive labs (Architecture + Stack)
`src/components/HoloLab.jsx` renders a photo on the shared canvas (`gazePortrait.js`) plus an SVG layer for data-flow
lines and a gaze beam. `src/sections/ArchitectureLab.jsx` (photo `public/lab/architecture-portrait.webp`) shows each
project's real data flow; `src/sections/Stack.jsx` (photo `public/lab/skills-portrait.webp`) is the skills explorer.
Content: `projectFlows`, `skillNotes`, `skillTargets` in `portfolio.js`. Nothing is rated.

The gaze is **simulated**: depth-parallax (hand-placed depth bumps) turns the head slightly, and a few-pixel iris shift
inside a mask around each eye moves the real iris pixels. Eyes respond faster than the head. It is not a facial rig.
For true eye movement you would need layered assets (eyes, lids, head separated) or a rigged 3D model.
Eye/head/depth coordinates are image pixels in the `IMAGE` config at the top of each lab file; if you swap a photo, re-measure them.
Hover/focus previews, click/tap pins (Esc releases). Below 1024px nodes become a button grid. Reduced motion disables head
movement, sweep, particles and beam animation.

## Freelance / MERN additions
- `src/sections/MernStack.jsx`: "MERN, from the controller to the container" (reuses `javaStack.js` with `prop: 'container'`). Layers, topics and code: `mernLayers`, `mernTopics`, `mernCode`.
- `src/sections/Services.jsx`: freelance services and process (`services`, `process`).
- Stack hover boxes (power, speed, ability, best for, pairs with): `techStats` + `src/components/TechStats.jsx`. They describe the tool, not a skill rating.
- Architecture lab: hovering the cube opens a project dossier (overview, what I built, tech stack, links).

## Editing content
Everything (projects, stack, timeline, links, Java layers and code samples, architecture nodes and edges) is in `src/data/portfolio.js`.

## Architecture diagram
`arch` in `portfolio.js` drives the 3D diagram: `nodes` (position, shape, tone, note), typed `edges`
(`req`, `cache`, `repl`, `egress`, `deploy`) and floor `zones`. It shows one database only (PostgreSQL on RDS),
sharded by `hash(user_id)` with a read replica per shard.

## Contact form
Uses EmailJS. The old keys are the defaults; override with `.env`:
`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

## shadcn/ui
Components in `src/components/ui/` follow the shadcn "new-york" style; `components.json` is set up
(JS, not TS) so `npx shadcn@latest add <component>` works.

## Docker
`docker build -t portfolio . && docker run -p 8080:80 portfolio`


## Motion system (GSAP + Lenis)
Everything animated is driven by GSAP, with Lenis for smooth scrolling, both on one shared ticker (`components/SmoothScroll.jsx`) so
scroll, ScrollTrigger and the WebGL canvas stay in the same frame. Plugins are registered once in `src/lib/gsap.js`.

| Piece | File | What it does |
|---|---|---|
| Preloader | `components/Preloader.jsx` | First visit only: counter, name rising out of masks, a sun that swells and lifts away like a curtain |
| Page curtain | `components/RouteTransition.jsx` | Internal links are intercepted: two curved slabs cover the page showing the destination name, the route changes, they lift. Back/forward skip it |
| Choreographer | `components/Choreographer.jsx` | Watches `<main>` and the footer and wires the `data-*` attributes below the moment elements mount, so lazy routes and tabs animate with no per-page code. Tears down per route |
| Hero / page headers | `sections/Hero.jsx`, `components/PageHeader.jsx` | Split-text name, sun ignition, portrait unmask, pointer depth layers, scroll-scrubbed exit |
| Nav | `components/Nav.jsx` | Drops in after the curtain, hides on scroll down and returns on scroll up, scrubbed progress bar, mobile menu cascade |
| Cursor | `components/Cursor.jsx` | Trailing ring that swells on links and shows words (`data-cursor="Drag"`). Fine pointers only |
| Marquee | `components/TechMarquee.jsx` | Two rows of tools; scrolling speeds them up and reverses them with your scroll direction |

### Animate anything with an attribute
| Attribute | Effect |
|---|---|
| `data-split="lines"` (or `words`, `chars`) | Headline rises out of a mask; the DOM is reverted to plain text once it lands |
| `data-reveal="up"` (or `left`, `right`, `scale`, `blur`, `fade`) | One element eases in. Use `fade` for anything holding a WebGL stage |
| `data-stagger="rise"` (or `up`, `left`, `pop`) + `data-stagger-each="0.09"` | Children arrive one after another |
| `data-clip="left"` (or `up`, `right`) | Image/panel unwrapped by a clip-path while its image settles from a zoom |
| `data-line`, `data-bar="72"`, `data-count` | A rule draws itself, a bar grows, numbers count up |
| `data-parallax="0.3"` | Scrubbed vertical drift |
| `data-magnetic="0.3"` | Element leans toward the pointer |
| `data-swing` | Hangs from the top and swings still (the lanyard badge) |
| `data-scrub-fill` | ScaleY follows scroll through its parent (Experience spine) |

Rules the system follows: it never transforms an element that contains a WebGL `Stage` (the canvas scissors to its rect); CSS
transitions are switched off while GSAP plays so they do not chase each frame; `prefers-reduced-motion` removes the preloader,
curtain, smooth scroll, cursor and every entrance, leaving the final state; `data-lenis-prevent` keeps dialogs scrollable.
