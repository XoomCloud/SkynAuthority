import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { ArrowIcon, LeafIcon } from './icons'

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative mt-24 px-4 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* newsletter */}
        <div className="card-skeu relative overflow-hidden p-8 sm:p-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lemon/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-mint/40 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="chip mb-4"><LeafIcon size={15} /> The gentle newsletter</span>
              <h2 className="font-display text-4xl leading-tight text-balance sm:text-5xl">
                Little skin notes, sent softly.
              </h2>
              <p className="mt-3 max-w-md text-ink-soft text-pretty">
                Calm tips, early drops, and gentle reminders to look after yourself.
                No spam, no pressure — promise.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSent(true)
              }}
              className="w-full"
            >
              <div className="flex items-center gap-2 rounded-full bg-white/70 p-2 neu-subtle">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-ink outline-none placeholder:text-ink-soft/70"
                  aria-label="Email address"
                />
                <button className="btn btn-primary shrink-0">
                  {sent ? 'Welcome 🌿' : 'Join'} <ArrowIcon size={16} />
                </button>
              </div>
              {sent && (
                <p className="mt-3 pl-4 text-sm text-mint-deep">
                  You're in. Check your inbox for a soft hello.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* links */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo className="h-12" />
            <p className="max-w-xs text-sm text-ink-soft text-pretty">
              Gentle, confidence-building skincare made simple — for skin that's still
              finding its way.
            </p>
          </div>
          <FooterCol
            title="Shop"
            items={[
              ['Best sellers', '/shop'],
              ['Cleanse', '/shop'],
              ['Hydrate', '/shop'],
              ['Sets', '/shop'],
            ]}
          />
          <FooterCol
            title="Learn"
            items={[
              ['Your Routine', '/routine'],
              ['Our Story', '/about'],
              ['Ingredients', '/about'],
              ['FAQs', '/about'],
            ]}
          />
          <FooterCol
            title="Care"
            items={[
              ['Contact us', '/about'],
              ['Shipping', '/about'],
              ['Returns', '/about'],
              ['Sustainability', '/about'],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/60 pt-6 text-sm text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Skyn Authority. Be gentle with yourself.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-ink">Instagram</a>
            <a href="#" className="transition hover:text-ink">TikTok</a>
            <a href="#" className="transition hover:text-ink">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-ink-soft transition hover:text-ink">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
