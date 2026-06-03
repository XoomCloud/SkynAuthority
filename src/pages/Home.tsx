import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Marquee } from '../components/Marquee'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { ArrowIcon, LeafIcon, DropIcon, SunIcon, StarIcon } from '../components/icons'

const steps = [
  { icon: LeafIcon, n: '01', name: 'Cleanse', desc: 'A soft, creamy start that lifts the day away — never tight, never harsh.', tint: 'sage', slug: 'gentle-cream-cleanser' },
  { icon: DropIcon, n: '02', name: 'Hydrate', desc: 'Lightweight moisture for a calm, balanced, lit-from-within glow.', tint: 'honey', slug: 'daily-balance-moisturiser' },
  { icon: SunIcon, n: '03', name: 'Refresh', desc: 'A fresh mist of confidence to revive your skin any time of day.', tint: 'mint', slug: 'glow-mist' },
]

const testimonials = [
  { quote: "It's the first routine I've actually stuck to. Nothing stings, everything feels nice.", name: 'Maya, 15' },
  { quote: 'My skin finally feels calm. The Glow Mist is my favourite part of the day.', name: 'Priya, 17' },
  { quote: 'Simple enough that I actually remember to do it every morning.', name: 'Ella, 14' },
]

/* ---------- immersive parallax hero ---------- */

interface FloatBottleProps {
  src: string
  alt: string
  className: string
  depth: number // parallax strength
  mx: MotionValue<number>
  my: MotionValue<number>
  floatDur: number
  delay: number
  rotate?: number
}

function FloatBottle({ src, alt, className, depth, mx, my, floatDur, delay, rotate = 0 }: FloatBottleProps) {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        style={{ rotate }}
        className="w-full select-none drop-shadow-[0_30px_40px_rgba(110,124,96,0.34)]"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 })
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 100)
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 100)
  }
  const reset = () => {
    mxRaw.set(0)
    myRaw.set(0)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* soft light blooms */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-[14%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(175,190,148,0.5),transparent_70%)] blur-2xl" />
        <div className="absolute right-[28%] top-[40%] h-[34vw] w-[34vw] rounded-full bg-[radial-gradient(circle,rgba(253,240,168,0.45),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-6 px-5 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        {/* copy */}
        <div className="pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="chip pointer-events-auto mb-6 w-fit"
          >
            <LeafIcon size={15} className="text-sage-deep" /> Confident skin. Every day.
          </motion.span>

          <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.95] text-balance">
            {['Confidence,', 'made', 'simple.'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 inline-block"
              >
                {w === 'simple.' ? <span className="italic text-sage-deep">simple.</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-md text-lg text-ink-soft text-pretty"
          >
            Soft, fresh, fuss-free skincare made for skin that's still finding its way.
            Just the gentle basics — nothing complicated, nothing scary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/shop" className="btn btn-primary text-base">
              Shop the basics <ArrowIcon />
            </Link>
            <Link to="/routine" className="btn btn-ghost text-base">
              Find your routine
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {['mint', 'sage', 'honey-soft', 'lemon'].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border-2 border-cream"
                  style={{ background: `var(--color-${c})` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={14} className="text-honey" />
              ))}
              <span className="ml-1 text-sm text-ink-soft">
                Loved by <span className="font-semibold text-ink">12,000+</span> teens
              </span>
            </div>
          </motion.div>
        </div>

        {/* bottle composition */}
        <div className="relative h-[56vh] min-h-[420px] lg:h-[72vh]">
          {/* glossy soft platform */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="absolute bottom-[12%] left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(110,124,96,0.22),transparent_70%)] blur-md"
          />
          <FloatBottle
            src="/products/moisturiser.png"
            alt="Daily Balance Moisturiser"
            className="bottom-[20%] left-[2%] w-[34%]"
            depth={0.5}
            mx={mx}
            my={my}
            floatDur={5.5}
            delay={0.5}
            rotate={-4}
          />
          <FloatBottle
            src="/products/mist.png"
            alt="Glow Mist"
            className="bottom-[16%] right-[3%] w-[30%]"
            depth={0.75}
            mx={mx}
            my={my}
            floatDur={6.2}
            delay={0.65}
            rotate={3}
          />
          <FloatBottle
            src="/products/cleanser.png"
            alt="Gentle Cream Cleanser"
            className="bottom-[8%] left-1/2 w-[40%] -translate-x-1/2"
            depth={1.15}
            mx={mx}
            my={my}
            floatDur={5}
            delay={0.4}
          />
          {/* floating dew */}
          <div className="droplet absolute left-[18%] top-[14%] h-10 w-8 bg-white/55" />
          <div className="droplet absolute right-[16%] top-[26%] h-7 w-6 bg-white/45" />
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">scroll</span>
      </motion.div>
    </section>
  )
}

/* ---------- page ---------- */

export function Home() {
  const featured = products.filter((p) => p.bestSeller).slice(0, 3)

  return (
    <div>
      <Hero />

      <Marquee />

      {/* ───────── BEST SELLERS ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <span className="eyebrow">The gentle edit</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight">
                Everyone's first favourites
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/shop" className="btn btn-ghost">
              View all <ArrowIcon size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ───────── THREE STEPS ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="card-skeu overflow-hidden p-8 sm:p-14">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow">Your 3-step glow routine</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-balance">
                Just three soft steps
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-ink-soft text-pretty">
                No ten-step routines. No confusing ingredients. Cleanse, hydrate,
                refresh — that's a whole routine, and it grows up with you.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.name} delay={i * 0.1}>
                  <Link
                    to={`/product/${s.slug}`}
                    className="group relative block h-full rounded-[26px] bg-white/55 p-7 transition-transform duration-500 hover:-translate-y-1.5"
                  >
                    <div
                      className="mb-5 grid h-16 w-16 place-items-center rounded-2xl text-ink neu"
                      style={{ background: `var(--color-${s.tint})` }}
                    >
                      <Icon size={28} />
                    </div>
                    <span className="font-display text-sm text-ink-soft">{s.n}</span>
                    <h3 className="font-display text-3xl">{s.name}</h3>
                    <p className="mt-2 text-ink-soft text-pretty">{s.desc}</p>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link to="/product/the-glow-routine" className="btn btn-primary text-base">
                Get The Glow Routine set <ArrowIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── PROMISE / VALUES ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="card-skeu aspect-square overflow-hidden">
                <div className="relative grid h-full place-items-center bg-gradient-to-br from-sage/40 via-cream to-honey-soft/40">
                  <img
                    src="/products/trio.png"
                    alt="The Glow Routine"
                    className="h-[72%] w-auto object-contain drop-shadow-[0_30px_40px_rgba(110,124,96,0.32)]"
                  />
                  <div className="droplet absolute right-10 top-12 h-14 w-10 bg-white/45" />
                  <div className="droplet absolute bottom-14 left-10 h-9 w-7 bg-white/45" />
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Our gentle promise</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-balance">
                Kind to your skin, and to the planet
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-ink-soft text-pretty">
                Every formula is dermatologist-guided, fragrance-light, and made for
                sensitive, still-developing skin. Because looking after yourself
                should feel calm — never clinical.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Dermatologist guided',
                'Never tested on animals',
                'Fragrance light & gentle',
                'Recyclable packaging',
              ].map((v, i) => (
                <Reveal key={v} delay={0.15 + i * 0.06}>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 neu-subtle">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-ink">
                      <LeafIcon size={15} />
                    </span>
                    <span className="text-sm font-semibold">{v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-[clamp(2rem,5vw,3.2rem)]">
            Words from real skin
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-[26px] bg-white/55 p-7 neu-subtle">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} size={15} className="text-honey" />
                  ))}
                </div>
                <blockquote className="font-display text-xl leading-snug text-balance">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-ink-soft">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
