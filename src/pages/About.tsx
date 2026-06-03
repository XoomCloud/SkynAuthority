import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { ArrowIcon, LeafIcon, DropIcon, SunIcon } from '../components/icons'

const values = [
  {
    icon: LeafIcon,
    title: 'Gentle, always',
    body: 'Every formula is made for sensitive, still-developing skin — soft enough for the very first time you try it.',
    tint: 'mint',
  },
  {
    icon: DropIcon,
    title: 'Simple on purpose',
    body: 'No ten-step routines or confusing labels. We make the few things that matter, and we make them well.',
    tint: 'lemon',
  },
  {
    icon: SunIcon,
    title: 'Quietly confident',
    body: 'We’re here to guide, not lecture. Skincare should feel like a calm part of your day — never a chore.',
    tint: 'sprout',
  },
]

const faqs = [
  {
    q: 'Is this okay for my first ever routine?',
    a: 'Absolutely — that’s exactly who we made it for. Start with The Glow Routine set and you’ll have a complete, gentle routine in three steps.',
  },
  {
    q: 'Will it work for sensitive skin?',
    a: 'Yes. Everything is fragrance-light, dermatologist-guided, and free from harsh actives. We always recommend patch-testing something new first.',
  },
  {
    q: 'How soon will I see a difference?',
    a: 'Skin loves consistency. Most people feel calmer, comfier skin within a couple of weeks of daily use — slow and steady wins.',
  },
  {
    q: 'Are your products cruelty-free?',
    a: 'Always. We never test on animals, and our packaging is designed to be recyclable wherever possible.',
  },
]

export function About() {
  return (
    <div className="pt-32">
      {/* hero */}
      <section className="mx-auto max-w-4xl px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="chip mx-auto mb-5 w-fit"
        >
          <LeafIcon size={15} className="text-mint-deep" /> Our story
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.98] text-balance"
        >
          Skincare that grows up with you
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg text-ink-soft text-pretty"
        >
          Skyn Authority started with a simple thought: starting a skincare routine
          shouldn’t feel intimidating, clinical, or grown-up before its time. So we
          made gentle, fresh, fuss-free products for skin that’s still finding its way —
          and a calmer way to look after yourself.
        </motion.p>
      </section>

      {/* big soft visual */}
      <section className="mx-auto mt-16 max-w-6xl px-5">
        <Reveal>
          <div className="card-skeu overflow-hidden">
            <div className="relative grid h-64 place-items-center bg-gradient-to-r from-mint/50 via-cream to-lemon/50 sm:h-96">
              <div className="droplet h-40 w-32 bg-white/50 shadow-[var(--shadow-lift)] sm:h-56 sm:w-44" />
              <div className="droplet absolute left-[15%] top-12 h-16 w-12 bg-white/40" />
              <div className="droplet absolute bottom-12 right-[18%] h-20 w-14 bg-white/40" />
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-xl italic text-ink-soft">
                “Be gentle with yourself.”
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* values */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <h2 className="mb-12 text-center font-display text-[clamp(2rem,5vw,3.4rem)]">
            What we believe
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-[26px] bg-white/55 p-8 neu-subtle">
                  <div
                    className="mb-5 grid h-16 w-16 place-items-center rounded-2xl text-ink neu"
                    style={{ background: `var(--color-${v.tint})` }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-ink-soft text-pretty">{v.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-[clamp(2rem,5vw,3.4rem)]">
            Gentle answers
          </h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className="rounded-3xl bg-white/55 p-6 neu-subtle">
                <h3 className="font-display text-xl">{f.q}</h3>
                <p className="mt-2 text-ink-soft text-pretty">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="card-skeu relative overflow-hidden p-10 text-center sm:p-16">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-mint/40 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-lemon/40 blur-3xl" />
            <h2 className="relative font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-balance">
              Ready to start something gentle?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-ink-soft text-pretty">
              Take the 60-second skin check, or browse the whole soft little shelf.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/routine" className="btn btn-primary text-base">
                Find your routine <ArrowIcon />
              </Link>
              <Link to="/shop" className="btn btn-ghost text-base">
                Shop the basics
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
