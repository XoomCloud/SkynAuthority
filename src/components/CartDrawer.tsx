import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cart'
import { hueGradient } from '../data/products'
import { CloseIcon, PlusIcon, MinusIcon, BagIcon, ArrowIcon } from './icons'

const FREE_SHIP = 45

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove } = useCart()
  const subtotal = useCart((s) => s.subtotal())
  const toFree = Math.max(0, FREE_SHIP - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-[rgba(58,68,56,0.28)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-md flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            <div className="m-3 flex h-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-[30px] glass">
              {/* header */}
              <div className="flex items-center justify-between px-6 pb-4 pt-6">
                <div className="flex items-center gap-2.5">
                  <BagIcon size={22} />
                  <h2 className="font-display text-2xl">Your bag</h2>
                </div>
                <button onClick={close} className="btn-round text-ink" aria-label="Close bag">
                  <CloseIcon />
                </button>
              </div>

              {/* free shipping meter */}
              {lines.length > 0 && (
                <div className="px-6 pb-4">
                  <p className="mb-2 text-sm text-ink-soft">
                    {toFree > 0 ? (
                      <>
                        You're <span className="font-semibold text-ink">${toFree.toFixed(0)}</span> away
                        from free delivery
                      </>
                    ) : (
                      <span className="font-semibold text-ink">Yay — you've unlocked free delivery! 🌿</span>
                    )}
                  </p>
                  <div className="h-2.5 w-full overflow-hidden rounded-full neu-pressed">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg,#c7e8d2,#f4e58a)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              )}

              {/* lines */}
              <div className="no-scrollbar flex-1 overflow-y-auto px-4">
                {lines.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                    <div className="droplet mb-5 h-20 w-20 bg-mint/60 shadow-[var(--shadow-float)]" />
                    <p className="font-display text-2xl">Your bag is empty</p>
                    <p className="mt-2 text-ink-soft">
                      Let's find your gentle everyday routine.
                    </p>
                    <Link to="/shop" onClick={close} className="btn btn-mint mt-6">
                      Browse products <ArrowIcon size={16} />
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3 py-2">
                    <AnimatePresence initial={false}>
                      {lines.map((l) => (
                        <motion.li
                          key={l.product.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex gap-3 rounded-3xl bg-white/55 p-3"
                        >
                          <div
                            className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl"
                            style={{ background: hueGradient[l.product.hue] }}
                          >
                            <div className="droplet h-10 w-7 bg-white/50" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-display text-lg leading-tight">{l.product.name}</p>
                                <p className="text-xs text-ink-soft">{l.product.tagline}</p>
                              </div>
                              <button
                                onClick={() => remove(l.product.id)}
                                className="text-ink-soft transition hover:text-ink"
                                aria-label={`Remove ${l.product.name}`}
                              >
                                <CloseIcon size={16} />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-1 rounded-full bg-cream/80 p-1 neu-subtle">
                                <button
                                  onClick={() => setQty(l.product.id, l.qty - 1)}
                                  className="grid h-7 w-7 place-items-center rounded-full text-ink transition hover:bg-white"
                                  aria-label="Decrease quantity"
                                >
                                  <MinusIcon size={14} />
                                </button>
                                <span className="w-5 text-center text-sm font-semibold tabular-nums">
                                  {l.qty}
                                </span>
                                <button
                                  onClick={() => setQty(l.product.id, l.qty + 1)}
                                  className="grid h-7 w-7 place-items-center rounded-full text-ink transition hover:bg-white"
                                  aria-label="Increase quantity"
                                >
                                  <PlusIcon size={14} />
                                </button>
                              </div>
                              <span className="font-semibold tabular-nums">
                                ${(l.product.price * l.qty).toFixed(0)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* footer */}
              {lines.length > 0 && (
                <div className="border-t border-white/60 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-display text-2xl">${subtotal.toFixed(0)}</span>
                  </div>
                  <button className="btn btn-primary w-full text-base">
                    Checkout <ArrowIcon size={18} />
                  </button>
                  <p className="mt-3 text-center text-xs text-ink-soft">
                    Gentle returns within 30 days · Taxes calculated at checkout
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
