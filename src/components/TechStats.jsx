import { cn } from '@/lib/utils'

function Pips({ n, color }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-3.5 rounded-[1px]"
          style={{ background: i <= n ? color : 'rgba(80,60,30,0.13)' }}
        />
      ))}
    </span>
  )
}

/**
 * Five small boxes about one tool: power, speed, ability, best for, pairs with.
 * They describe the tool itself, not a rating of the person using it.
 */
export default function TechStats({ name, stats, color, className }) {
  if (!stats) return null
  const boxes = [
    { label: 'Power', pips: stats.power, text: stats.powerText },
    { label: 'Speed', pips: stats.speed, text: stats.speedText },
    { label: 'Ability', text: stats.ability },
    { label: 'Best for', text: stats.best },
    { label: 'Pairs with', text: stats.pairs },
  ]
  return (
    <ul className={cn('flex flex-col gap-1.5', className)} aria-label={`${name}: traits of the tool`}>
      {boxes.map((b, i) => (
        <li
          key={b.label}
          className="hud-panel hud-clip-sm animate-in fade-in-0 slide-in-from-right-3 bg-abyss/85 px-2.5 py-1.5 duration-200 fill-mode-backwards"
          style={{ animationDelay: `${i * 45}ms`, borderColor: `${color}66` }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: `color-mix(in srgb, ${color} 62%, #1c2430)` }}>{b.label}</span>
            {b.pips ? <Pips n={b.pips} color={color} /> : null}
          </div>
          <p className="mt-0.5 text-[12px] leading-snug text-foreground/90">{b.text}</p>
        </li>
      ))}
    </ul>
  )
}
