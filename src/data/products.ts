export type Category = 'Cleanse' | 'Hydrate' | 'Treat' | 'Protect' | 'Sets'

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  size: string
  category: Category
  /* drives the 3D bottle + card gradient */
  hue: 'lemon' | 'mint' | 'sprout' | 'vanilla' | 'petal'
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
    slug: 'morning-melt-gel-cleanser',
    name: 'Morning Melt',
    tagline: 'Gentle gel cleanser',
    description:
      "A soft, fresh start. This featherlight gel melts away the day-before and morning dullness without that tight, squeaky feeling. Made for skin that's still figuring itself out.",
    price: 18,
    size: '150ml',
    category: 'Cleanse',
    hue: 'mint',
    bestSeller: true,
    ingredients: [
      { name: 'Green Tea', note: 'calms and refreshes' },
      { name: 'Glycerin', note: 'keeps skin comfy, never tight' },
      { name: 'Cucumber Water', note: 'a cool, clean finish' },
    ],
    benefits: ['Soap-free & non-stripping', 'Calms first-time breakouts', 'Fragrance light'],
    howTo: 'Massage a coin-sized amount onto damp skin in soft circles. Rinse with lukewarm water. Morning and night.',
    rating: 4.9,
    reviews: 212,
  },
  {
    id: 'p2',
    slug: 'quiet-glow-moisturiser',
    name: 'Quiet Glow',
    tagline: 'Everyday gel-cream',
    description:
      'Lightweight hydration that disappears into skin and leaves a soft, lit-from-within finish. No grease, no heaviness — just a calm, dewy hello every morning.',
    price: 24,
    size: '50ml',
    category: 'Hydrate',
    hue: 'lemon',
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
    slug: 'clear-skies-spot-gel',
    name: 'Clear Skies',
    tagline: 'Gentle spot gel',
    description:
      "A kind little helper for those surprise spots. It calms redness overnight without harsh stinging or peeling — because confidence shouldn't come with a side of irritation.",
    price: 16,
    size: '15ml',
    category: 'Treat',
    hue: 'sprout',
    isNew: true,
    ingredients: [
      { name: 'Salicylic Acid 1%', note: 'a soft nudge for clearer skin' },
      { name: 'Centella', note: 'famous for calming redness' },
      { name: 'Zinc', note: 'keeps things balanced' },
    ],
    benefits: ['Targets without over-drying', 'Invisible once dry', 'Gentle enough for daily use'],
    howTo: 'Dab a thin layer directly onto spots after moisturiser. Let it absorb. Use once or twice a day.',
    rating: 4.7,
    reviews: 143,
  },
  {
    id: 'p4',
    slug: 'soft-shield-spf30',
    name: 'Soft Shield',
    tagline: 'Daily mineral SPF 30',
    description:
      'Your everyday invisible layer of protection. A weightless, no-white-cast finish that sits happily under or instead of makeup. The one step we hope becomes a habit.',
    price: 22,
    size: '50ml',
    category: 'Protect',
    hue: 'vanilla',
    bestSeller: true,
    ingredients: [
      { name: 'Zinc Oxide', note: 'gentle mineral protection' },
      { name: 'Aloe', note: 'fresh, cooling comfort' },
      { name: 'Niacinamide', note: 'evens out the look of skin' },
    ],
    benefits: ['No white cast', 'Broad spectrum UVA/UVB', 'Sensitive-skin friendly'],
    howTo: 'Apply two finger-lengths as the last step of your morning routine. Reapply through the day when outside.',
    rating: 4.9,
    reviews: 301,
  },
  {
    id: 'p5',
    slug: 'dewdrop-hydrating-toner',
    name: 'Dewdrop',
    tagline: 'Hydrating mist-toner',
    description:
      'A fresh spritz of calm you can use anytime — after cleansing, over makeup, or whenever skin needs a moment. Soft, hydrating, and quietly refreshing.',
    price: 19,
    size: '120ml',
    category: 'Hydrate',
    hue: 'mint',
    isNew: true,
    ingredients: [
      { name: 'Hyaluronic Acid', note: 'a drink of water for skin' },
      { name: 'Chamomile', note: 'gentle, settling calm' },
      { name: 'Watermelon Extract', note: 'fresh, juicy hydration' },
    ],
    benefits: ['Use anytime, anywhere', 'Alcohol-free', 'Preps skin for moisturiser'],
    howTo: 'Close eyes and mist over clean skin from 20cm away. Pat in lightly. Reapply whenever you like.',
    rating: 4.8,
    reviews: 97,
  },
  {
    id: 'p6',
    slug: 'the-easy-three-set',
    name: 'The Easy Three',
    tagline: 'Starter routine set',
    description:
      "Skincare, simplified. Cleanse, hydrate, protect — the only three steps you need to start. A gentle, foolproof routine that grows up with you, packed in a reusable pouch.",
    price: 56,
    size: 'Cleanser + Glow + SPF',
    category: 'Sets',
    hue: 'petal',
    bestSeller: true,
    ingredients: [
      { name: 'Morning Melt', note: 'step one · cleanse' },
      { name: 'Quiet Glow', note: 'step two · hydrate' },
      { name: 'Soft Shield', note: 'step three · protect' },
    ],
    benefits: ['Save 15% vs. buying separately', 'Perfect first routine', 'Comes in a reusable pouch'],
    howTo: 'Morning: cleanse, glow, then shield. Night: cleanse and glow. Three steps, every day. That’s it.',
    rating: 5.0,
    reviews: 264,
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const hueGradient: Record<Product['hue'], string> = {
  lemon: 'linear-gradient(160deg, #fff7cf 0%, #f4e58a 100%)',
  mint: 'linear-gradient(160deg, #ddf3e6 0%, #9bd3ae 100%)',
  sprout: 'linear-gradient(160deg, #eef6da 0%, #c7e2a0 100%)',
  vanilla: 'linear-gradient(160deg, #fffdf2 0%, #f1e7c4 100%)',
  petal: 'linear-gradient(160deg, #fdeede 0%, #f3d9c4 100%)',
}

/* three.js bottle colors per hue */
export const hueThree: Record<Product['hue'], { glass: string; cap: string; liquid: string }> = {
  lemon: { glass: '#fbe6a3', cap: '#e9d27a', liquid: '#f6e07f' },
  mint: { glass: '#bfe6cd', cap: '#94c9a6', liquid: '#a9dcbb' },
  sprout: { glass: '#dcebb4', cap: '#b9d68f', liquid: '#cfe6a3' },
  vanilla: { glass: '#f3ead0', cap: '#e2d2a8', liquid: '#efe3c2' },
  petal: { glass: '#f6dcc8', cap: '#e9c3a6', liquid: '#f3d2bb' },
}
