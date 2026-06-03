export type Category = 'Cleanse' | 'Hydrate' | 'Refresh' | 'Sets'

export type Hue = 'sage' | 'honey' | 'mint' | 'blend'

export interface Product {
  id: string
  slug: string
  name: string
  /** the three-word product promise, e.g. "Hydrate. Nourish. Glow." */
  promise: string
  tagline: string
  description: string
  price: number
  size: string
  category: Category
  hue: Hue
  image: string
  bestSeller?: boolean
  isNew?: boolean
  ingredients: { name: string; note: string }[]
  benefits: string[]
  howTo: string
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'gentle-cream-cleanser',
    name: 'Gentle Cream Cleanser',
    promise: 'Cleanse. Refresh. Be you.',
    tagline: 'Gentle today, glowing tomorrow.',
    description:
      "A soft, creamy cleanse that lifts away the day without that tight, squeaky feeling. Made for skin that's still finding its way — calming, fresh, and kind from the very first wash.",
    price: 18,
    size: '200ml',
    category: 'Cleanse',
    hue: 'sage',
    image: '/products/cleanser.png',
    bestSeller: true,
    ingredients: [
      { name: 'Green Tea', note: 'calms and refreshes' },
      { name: 'Glycerin', note: 'keeps skin comfy, never tight' },
      { name: 'Aloe Vera', note: 'a cool, gentle finish' },
    ],
    benefits: ['Soap-free & non-stripping', 'Calms first-time breakouts', 'Fragrance light'],
    howTo: 'Massage a coin-sized amount onto damp skin in soft circles. Rinse with lukewarm water. Morning and night.',
    rating: 4.9,
    reviews: 212,
  },
  {
    id: 'p2',
    slug: 'daily-balance-moisturiser',
    name: 'Daily Balance Moisturiser',
    promise: 'Hydrate. Nourish. Glow.',
    tagline: 'Lightweight love for everyday confidence.',
    description:
      'Featherlight hydration that melts in and leaves a soft, lit-from-within finish. No grease, no heaviness — just a calm, balanced glow that lasts all day.',
    price: 24,
    size: '75ml',
    category: 'Hydrate',
    hue: 'honey',
    image: '/products/moisturiser.png',
    bestSeller: true,
    ingredients: [
      { name: 'Squalane', note: 'lightweight, drama-free moisture' },
      { name: 'Oat Extract', note: 'soothes sensitive moments' },
      { name: 'Vitamin B5', note: 'soft, bouncy comfort' },
    ],
    benefits: ['Oil-free glow', 'Great under SPF', 'For combination & normal skin'],
    howTo: 'Smooth a pea-sized amount over clean skin. Pat gently until it sinks in. Use morning and night.',
    rating: 4.8,
    reviews: 188,
  },
  {
    id: 'p3',
    slug: 'glow-mist',
    name: 'Glow Mist',
    promise: 'Hydrate. Refresh. Shine on.',
    tagline: 'Refresh. Revive. You’ve got this.',
    description:
      'A fresh spritz of calm you can reach for anytime — after cleansing, over makeup, or whenever skin needs a moment. Soft, hydrating, and quietly confidence-boosting.',
    price: 19,
    size: '120ml',
    category: 'Refresh',
    hue: 'mint',
    image: '/products/mist.png',
    isNew: true,
    ingredients: [
      { name: 'Hyaluronic Acid', note: 'a drink of water for skin' },
      { name: 'Chamomile', note: 'gentle, settling calm' },
      { name: 'Cucumber Water', note: 'fresh, cooling hydration' },
    ],
    benefits: ['Use anytime, anywhere', 'Alcohol-free', 'Sets makeup softly'],
    howTo: 'Close eyes and mist over skin from 20cm away. Pat in lightly. Reach for it whenever you like.',
    rating: 4.8,
    reviews: 97,
  },
  {
    id: 'p4',
    slug: 'the-glow-routine',
    name: 'The Glow Routine',
    promise: 'Cleanse. Hydrate. Refresh.',
    tagline: 'Your whole 3-step routine, made simple.',
    description:
      'Skincare, simplified. Cleanse, hydrate, refresh — the only three steps you need, together in one set. A gentle, foolproof routine that grows up with you, with 15% off versus buying separately.',
    price: 56,
    size: 'Cleanser + Moisturiser + Mist',
    category: 'Sets',
    hue: 'blend',
    image: '/products/trio.png',
    bestSeller: true,
    ingredients: [
      { name: 'Gentle Cream Cleanser', note: 'step one · cleanse' },
      { name: 'Daily Balance Moisturiser', note: 'step two · hydrate' },
      { name: 'Glow Mist', note: 'step three · refresh' },
    ],
    benefits: ['Save 15% vs. buying separately', 'Perfect first routine', 'Comes in a reusable pouch'],
    howTo: 'Morning & night: cleanse, then moisturise. Mist anytime to refresh. Three steps, every day — that’s it.',
    rating: 5.0,
    reviews: 264,
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

/* Soft brand-tinted backdrops that make the white bottles pop. */
export const hueGradient: Record<Hue, string> = {
  sage: 'linear-gradient(160deg, #eef3e2 0%, #c7d6ac 100%)',
  honey: 'linear-gradient(160deg, #fdf5e0 0%, #f0dcb0 100%)',
  mint: 'linear-gradient(160deg, #e4f2e8 0%, #b3ddc4 100%)',
  blend: 'linear-gradient(150deg, #f4f0e2 0%, #dfe7cb 55%, #f2e6cf 100%)',
}

export const hueGlow: Record<Hue, string> = {
  sage: 'rgba(175, 190, 148, 0.55)',
  honey: 'rgba(221, 172, 112, 0.4)',
  mint: 'rgba(155, 211, 174, 0.5)',
  blend: 'rgba(199, 214, 172, 0.5)',
}
