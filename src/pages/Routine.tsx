import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import type { Product } from '../data/products'
import { useCart } from '../store/cart'
import { hueGradient } from '../data/products'
import { ArrowIcon, SparkleIcon, PlusIcon } from '../components/icons'

interface QA {
  q: string
  sub: string
  options: { label: string; emoji: string; tag: string }[]
}

const questions: QA[] = [
  {
    q: 'How does your skin usually feel?',
    sub: 'No wrong answers — skin changes, and that’s okay.',
    options: [
      { label: 'A little oily by midday', emoji: '🌿', tag: 'oily' },
      { label: 'Dry or tight sometimes', emoji: '💧', tag: 'dry' },
      { label: 'A mix, depends on the day', emoji: '🍃', tag: 'combo' },
      { label: 'Sensitive & easily irritated', emoji: '🌼', tag: 'sensitive' },
    ],
  },
  {
    q: 'What’s on your mind most?',
    sub: 'Pick the one that feels biggest right now.',
    options: [
      { label: 'Surprise spots & redness', emoji: '✨', tag: 'spots' },
      { label: 'Keeping it calm & hydrated', emoji: '💛', tag: 'hydrate' },
      { label: 'A fresh, even glow', emoji: '🌞', tag: 'glow' },
      { label: 'Just getting started', emoji: '🌱', tag: 'start' },
    ],
  },
  {
    q: 'How much time feels right?',
    sub: 'We’ll keep it as simple as you like.',
    options: [
      { label: 'Quick — 1 to 2 steps', emoji: '⏱️', tag: 'quick' },
      { label: 'A little ritual — 3 steps', emoji: '🛁', tag: 'three' },
      { label: 'I’m all in', emoji: '💫', tag: 'all' },
    ],
  },
]

function recommend(tags: string[]): Product[] {
  // simple, friendly mapping — always gentle, always sensible
  const picks = new Set<string>()
  if (tags.includes('start') || tags.includes('three') || tags.includes('quick')) {
    picks.add('the-glow-routine')
  }
  if (tags.includes('spots') || tags.includes('oily')) picks.add('gentle-cream-cleanser')
  if (tags.includes('dry') || tags.includes('hydrate') || tags.includes('sensitive'))
    picks.add('daily-balance-moisturiser')
  if (tags.includes('glow') || tags.includes('combo')) picks.add('glow-mist')
  if (tags.includes('all')) {
    picks.add('gentle-cream-cleanser')
    picks.add('daily-balance-moisturiser')
    picks.add('glow-mist')
  }
  // ensure at least 3 sensible items
  const base = ['the-glow-routine', 'daily-balance-moisturiser', 'glow-mist']
  base.forEach((b) => picks.size < 3 && picks.add(b))
  return [...picks]
    .map((slug) => products.find((p) => p.slug === slug)!)
    .filter(Boolean)
    .slice(0, 4)
}

export function Routine() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const add = useCart((s) => s.add)
  const open = useCart((s) => s.open)

  const total = questions.length
  const done = step >= total
  const result = done ? recommend(answers) : []

  const choose = (tag: string) => {
    setAnswers((a) => [...a, tag])
    setTimeout(() => setStep((s) => s + 1), 220)
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  const addAll = () => {
    result.forEach((p) => add(p))
    open()
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-12 pt-32">
      <div className="mb-8 text-center">
        <span className="chip mx-auto mb-4 w-fit">
          <SparkleIcon size={15} className="text-mint-deep" /> 60-second skin check
        </span>
        <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-none">
          Find your routine
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft text-pretty">
          A few gentle questions, and we’ll suggest a simple routine that suits you.
          No pressure, no jargon.
        </p>
      </div>

      {/* progress */}
      {!done && (
        <div className="mx-auto mb-8 flex max-w-sm items-center gap-2">
          {questions.map((_, i) => (
            <div key={i} className="h-2 flex-1 overflow-hidden rounded-full neu-pressed">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#c7e8d2,#f4e58a)' }}
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="card-skeu p-8 sm:p-10"
          >
            <p className="eyebrow mb-2">
              Question {step + 1} of {total}
            </p>
            <h2 className="font-display text-3xl leading-tight text-balance">
              {questions[step].q}
            </h2>
            <p className="mt-2 text-ink-soft">{questions[step].sub}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.tag}
                  onClick={() => choose(opt.tag)}
                  className="group flex items-center gap-3 rounded-3xl bg-white/55 p-4 text-left transition-all duration-300 neu-subtle hover:-translate-y-1 hover:bg-white"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream text-2xl neu">
                    {opt.emoji}
                  </span>
                  <span className="font-semibold leading-tight">{opt.label}</span>
                  <ArrowIcon
                    size={16}
                    className="ml-auto text-ink-soft opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => {
                  setStep((s) => s - 1)
                  setAnswers((a) => a.slice(0, -1))
                }}
                className="mt-6 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                ← Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-skeu mb-6 overflow-hidden p-8 text-center sm:p-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
                className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-mint text-ink neu"
              >
                <SparkleIcon size={32} />
              </motion.div>
              <h2 className="font-display text-4xl">Your gentle routine</h2>
              <p className="mx-auto mt-3 max-w-md text-ink-soft text-pretty">
                Based on your answers, here’s a soft, simple set to start with. You can
                always adjust — skincare is a journey, not a test.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {result.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    to={`/product/${p.slug}`}
                    className="flex items-center gap-4 rounded-3xl bg-white/55 p-4 transition hover:-translate-y-1 neu-subtle"
                  >
                    <div
                      className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl"
                      style={{ background: hueGradient[p.hue] }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-[88%] w-auto object-contain drop-shadow-[0_6px_8px_rgba(110,124,96,0.28)]"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="eyebrow mb-0.5">{p.category}</p>
                      <p className="font-display text-2xl leading-none">{p.name}</p>
                      <p className="text-sm text-ink-soft">{p.tagline}</p>
                    </div>
                    <span className="font-display text-xl">${p.price}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={addAll} className="btn btn-primary text-base">
                <PlusIcon size={18} /> Add routine to bag
              </button>
              <button onClick={restart} className="btn btn-ghost text-base">
                Retake the check
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
