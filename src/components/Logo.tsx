import { Link } from 'react-router-dom'

export function Logo({ onClick, className = 'h-9' }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center transition-transform duration-500 hover:-translate-y-0.5"
      aria-label="Skyn Authority home"
    >
      <img
        src="/brand/logo.png"
        alt="Skyn Authority"
        className={`${className} w-auto select-none`}
        draggable={false}
      />
    </Link>
  )
}
