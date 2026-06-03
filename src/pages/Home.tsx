import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Marquee } from '../components/Marquee'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { ArrowIcon, LeafIcon, DropIcon, SunIcon, StarIcon } from '../components/icons'

const HeroScene = lazy(() =>
  import('../three/Scenes').then((m) => ({ default: m.HeroScene })),
)

const steps = [
  { icon: LeafIcon, n: '01', name: 'Cleanse', desc: 'A soft, fresh start that never leaves skin tight.', tint: 'mint' },
  { icon: DropIcon, n: '02', name: 'Hydrate', desc: 'Lightweight moisture for a calm, lit-from-within glow.', tint: 'lemon' },
  { icon: SunIcon, n: '03', name: 'Protect', desc: 'Your invisible everyday shield. The habit that matters most.', tint: 'sprout' },
]

const testimonials = [
  { quote: "It's the first routine I've actually stuck to. Nothing stings, everything feels nice.", name: 'Maya, 15' },
  { quote: 'My skin finally feels calm. The spot gel saved me before my formal.', name: 'Priya, 17' },
  { quote: 'Simple enough that I actually remember to do it every morning.', name: 'Ella, 14' },
]

export function Home() {
  const featured = products.filter((p) => p.bestSeller).slice(0, 3)

  return (
    <div>
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* 3D layer */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="h-full w-full" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* text overlay */}
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="chip pointer-events-auto mb-6 w-fit"
          >
            <LeafIcon size={15} className="text-mint-deep" /> Gentle skincare for your everyday
          </motion.span>

          <h1 className="max-w-3xl font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.95] text-balance">
            {['Confidence,', 'made', 'simple.'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 inline-block"
              >
                {w === 'simple.' ? (
                  <span className="relative">
                    <span className="italic text-mint-deep">simple.</span>
                  </span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-md text-lg text-ink-soft text-pretty"
          >
            Soft, fresh, fuss-free products made for skin that's still finding its way.
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
              {['mint', 'lemon', 'sprout', 'petal'].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border-2 border-cream"
                  style={{ background: `var(--color-${c})` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={14} className="text-butter" />
              ))}
              <span className="ml-1 text-sm text-ink-soft">
                Loved by <span className="font-semibold text-ink">12,000+</span> teens
              </span>
            </div>
          </motion.div>
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
              <span className="eyebrow">Skincare, simplified</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-balance">
                Just three soft steps
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-ink-soft text-pretty">
                No ten-step routines. No confusing ingredients. Cleanse, hydrate,
                protect — that's a whole routine, and it grows up with you.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className="group relative h-full rounded-[26px] bg-white/55 p-7 transition-transform duration-500 hover:-translate-y-1.5">
                    <div
                      className="mb-5 grid h-16 w-16 place-items-center rounded-2xl text-ink neu"
                      style={{ background: `var(--color-${s.tint})` }}
                    >
                      <Icon size={28} />
                    </div>
                    <span className="font-display text-sm text-ink-soft">{s.n}</span>
                    <h3 className="font-display text-3xl">{s.name}</h3>
                    <p className="mt-2 text-ink-soft text-pretty">{s.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link to="/product/the-easy-three-set" className="btn btn-mint text-base">
                Get The Easy Three set <ArrowIcon />
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
                <div className="relative grid h-full place-items-center bg-gradient-to-br from-mint/50 via-cream to-lemon/40">
                  <div className="droplet h-40 w-32 bg-white/50 shadow-[var(--shadow-lift)]" />
                  <div className="droplet absolute right-12 top-12 h-16 w-12 bg-white/40" />
                  <div className="droplet absolute bottom-16 left-10 h-10 w-8 bg-white/40" />
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
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint text-ink">
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
                    <StarIcon key={j} size={15} className="text-butter" />
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
