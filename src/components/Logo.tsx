import { Link } from 'react-router-dom'

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="Skyn Authority home"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full neu transition-transform duration-500 group-hover:rotate-12">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3.5c-3.6 4.7-6 7.6-6 10.6a6 6 0 0 0 12 0c0-3-2.4-5.9-6-10.6Z"
            fill="#9bd3ae"
          />
          <ellipse cx="9.8" cy="14" rx="1.5" ry="2.3" fill="#fffdf4" opacity="0.85" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] tracking-tight text-ink">
          Skyn
        </span>
        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-ink-soft">
          Authority
        </span>
      </span>
    </Link>
  )
}
