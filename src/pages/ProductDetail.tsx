import { useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { getProduct, products, hueGradient, hueGlow } from '../data/products'
import { useCart } from '../store/cart'
import { ProductCard } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import {
  StarIcon,
  PlusIcon,
  MinusIcon,
  ArrowIcon,
  LeafIcon,
  DropIcon,
} from '../components/icons'

export function ProductDetail() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [open, setOpen] = useState<string | null>('ingredients')

  // cursor tilt for the bottle viewer
  const viewer = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 90, damping: 14 })
  const sry = useSpring(ry, { stiffness: 90, damping: 14 })
  const rotateX = useTransform(srx, (v) => v)
  const rotateY = useTransform(sry, (v) => v)

  if (!product) return <Navigate to="/shop" replace />

  const onMove = (e: React.MouseEvent) => {
    const r = viewer.current?.getBoundingClientRect()
    if (!r) return
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -14)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  const sections = [
    {
      id: 'ingredients',
      title: 'What’s inside',
      icon: LeafIcon,
      body: (
        <ul className="space-y-3">
          {product.ingredients.map((ing) => (
            <li key={ing.name} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sage-deep" />
              <span>
                <span className="font-semibold text-ink">{ing.name}</span>
                <span className="text-ink-soft"> — {ing.note}</span>
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'howto',
      title: 'How to use',
      icon: DropIcon,
      body: <p className="text-ink-soft text-pretty">{product.howTo}</p>,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-28">
      {/* breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-soft">
        <Link to="/shop" className="transition hover:text-ink">Shop</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* ───── viewer ───── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card-skeu sticky top-28 overflow-hidden"
        >
          <div
            ref={viewer}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className="relative grid aspect-square place-items-center"
            style={{ background: hueGradient[product.hue], perspective: 1000 }}
          >
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl"
              style={{ background: hueGlow[product.hue] }}
            />
            <div className="droplet absolute bottom-10 left-10 h-12 w-9 bg-white/45" />
            <div className="droplet absolute right-12 top-14 h-8 w-6 bg-white/40" />
            <motion.img
              src={product.image}
              alt={product.name}
              draggable={false}
              style={{ rotateX, rotateY }}
              className="relative z-[1] h-[78%] w-auto select-none object-contain drop-shadow-[0_34px_42px_rgba(110,124,96,0.34)]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="chip absolute bottom-5 left-5">↻ Move your cursor to tilt</span>
            <span className="absolute right-5 top-5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink-soft">
              {product.size}
            </span>
          </div>
        </motion.div>

        {/* ───── info ───── */}
        <div className="lg:py-4">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{product.category}</span>
              {product.bestSeller && <span className="chip">★ Loved</span>}
              {product.isNew && <span className="chip text-sage-deep">New</span>}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-3 font-display text-[clamp(2.3rem,5vw,3.8rem)] leading-[0.98]">
              {product.name}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-2 text-lg font-semibold text-sage-deep">{product.promise}</p>
            <p className="mt-1 text-ink-soft">{product.tagline}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} className="text-honey" />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-ink-soft">· {product.reviews} gentle reviews</span>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft text-pretty">
              {product.description}
            </p>
          </Reveal>

          {/* benefits */}
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.benefits.map((b) => (
                <span key={b} className="chip">{b}</span>
              ))}
            </div>
          </Reveal>

          {/* price + add */}
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-display text-4xl">${product.price}</span>
              <div className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 neu-subtle">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-white"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>
                <span className="w-7 text-center font-semibold tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-white"
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <button
              onClick={() => add(product, qty)}
              className="btn btn-primary mt-5 w-full text-base sm:w-auto sm:px-12"
            >
              <PlusIcon size={18} /> Add to bag · ${product.price * qty}
            </button>
            <p className="mt-3 text-sm text-ink-soft">
              Free delivery over $45 · Gentle 30-day returns
            </p>
          </Reveal>

          {/* accordions */}
          <div className="mt-8 space-y-3">
            {sections.map((sec) => {
              const Icon = sec.icon
              const isOpen = open === sec.id
              return (
                <div key={sec.id} className="overflow-hidden rounded-3xl bg-white/55 neu-subtle">
                  <button
                    onClick={() => setOpen(isOpen ? null : sec.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 font-display text-xl">
                      <Icon size={20} className="text-sage-deep" />
                      {sec.title}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>
                      <PlusIcon />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5">{sec.body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* related */}
      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Pairs gently with</h2>
          <Link to="/shop" className="btn btn-ghost">
            View all <ArrowIcon size={16} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
