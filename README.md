# Chandermani Mishra: 3D portfolio

Vite + React 19 + Tailwind CSS v4 + shadcn/ui + lucide-react + three.js.

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
| Hero reactor around the portrait | `hero.js` |
| Gaze portrait: photo as a 2.5D plane that looks toward the focused node (Architecture and Stack labs) | `gazePortrait.js` |
| Java / Spring Boot layer stack with a request travelling through it | `javaStack.js` |
| 3D AWS architecture diagram (CDN, ALB, proxies, cache, shards, replicas, CI/CD) | `architecture.js` |
| Contact globe | `globe.js` |

`prefers-reduced-motion` slows animation to near-still. If WebGL is unavailable the content still reads normally.

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
