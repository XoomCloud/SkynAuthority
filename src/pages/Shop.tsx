import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import type { Category } from '../data/products'

const categories: ('All' | Category)[] = ['All', 'Cleanse', 'Hydrate', 'Treat', 'Protect', 'Sets']

export function Shop() {
  const [active, setActive] = useState<'All' | Category>('All')
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-32">
      {/* header */}
      <div className="mb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          The whole shelf
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-[clamp(2.6rem,7vw,5rem)] leading-none"
        >
          Shop gentle
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-4 max-w-md text-ink-soft text-pretty"
        >
          Everything's made to be simple, soft, and easy to love. Start with one,
          or build your whole little routine.
        </motion.p>
      </div>

      {/* filter pills */}
      <div className="no-scrollbar mb-10 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`btn shrink-0 px-5 py-2.5 text-sm ${
              active === c ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </motion.div>
    </div>
  )
}
