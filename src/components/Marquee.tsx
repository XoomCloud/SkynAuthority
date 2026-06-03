import { SparkleIcon } from './icons'

const items = [
  'Gentle on first-time skin',
  'Dermatologist guided',
  'Never tested on animals',
  'Fragrance light',
  'Made simple, on purpose',
  'Recyclable packaging',
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/60 bg-white/35 py-4 backdrop-blur-sm">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-sm font-semibold text-ink-soft">
            <SparkleIcon size={15} className="text-mint-deep" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
