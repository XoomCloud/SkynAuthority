import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { hueGradient, hueGlow } from '../data/products'
import { useCart } from '../store/cart'
import { StarIcon, PlusIcon } from './icons'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add)
  const ref = useRef<HTMLAnchorElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        ref={ref}
        to={`/product/${product.slug}`}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="card-skeu group relative block overflow-hidden p-5"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* badges */}
        <div className="absolute left-5 top-5 z-10 flex gap-2">
          {product.bestSeller && <span className="chip">★ Loved</span>}
          {product.isNew && <span className="chip text-mint-deep">New</span>}
        </div>

        {/* visual */}
        <div
          className="relative mb-5 grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl"
          style={{ background: hueGradient[product.hue] }}
        >
          {/* soft light bloom */}
          <div
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
            style={{ background: hueGlow[product.hue] }}
          />
          <div className="droplet absolute bottom-6 left-6 h-9 w-7 bg-white/50" />
          {/* real product bottle */}
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative z-[1] h-[80%] w-auto object-contain drop-shadow-[0_22px_28px_rgba(110,124,96,0.32)]"
            whileHover={{ y: -10, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          />
        </div>

        {/* info */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">{product.category}</p>
            <h3 className="font-display text-2xl leading-none">{product.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
          </div>
          <span className="font-display text-2xl">${product.price}</span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-ink-soft">
          <StarIcon size={14} className="text-butter" />
          <span className="text-sm font-semibold text-ink">{product.rating}</span>
          <span className="text-xs">· {product.reviews} reviews</span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            add(product)
          }}
          className="btn btn-mint mt-4 w-full"
        >
          <PlusIcon size={16} /> Add to bag
        </button>
      </Link>
    </motion.div>
  )
}
