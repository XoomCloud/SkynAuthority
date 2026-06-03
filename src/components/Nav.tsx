import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { BagIcon } from './icons'
import { useCart } from '../store/cart'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/routine', label: 'Your Routine' },
  { to: '/about', label: 'Our Story' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const count = useCart((s) => s.count())
  const openCart = useCart((s) => s.open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-[26px] px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass' : 'border border-transparent'
        }`}
      >
        <Logo className="h-10" />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'neu-pressed text-ink'
                    : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="btn-round relative text-ink"
            aria-label={`Open bag, ${count} items`}
          >
            <BagIcon size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[0.65rem] font-bold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="btn-round text-ink md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`h-[2px] w-4 rounded bg-ink transition-all ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-[2px] w-4 rounded bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-4 rounded bg-ink transition-all ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass pointer-events-auto fixed inset-x-4 top-20 z-40 rounded-3xl p-3 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-lg font-semibold text-ink transition hover:neu-pressed"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
