# Skyn Authority

A distinctive ecommerce experience for **Skyn Authority** — gentle, confidence-building
skincare made simple for teens. Soft, fresh, and easy to love.

## Design direction — "Soft tactile lab"

- **Immersive 3D**: real-time WebGL hero with softly floating, frosted-glass skincare
  vessels under self-contained studio lighting (React Three Fiber + drei). Each product
  page renders its own slowly turning vessel that responds to your cursor.
- **Skeuomorphism & neumorphism**: dewy glass surfaces, embossed/pressed buttons,
  tactile droplets, layered soft shadows, a fine grain overlay — nothing flat or clinical.
- **Palette**: cream, vanilla, soft lemon, butter, gentle mint, sprout & pastel green.
  Deliberately no dark, harsh, muddy, orange or earthy tones.
- **Typography**: *Fraunces* (soft, characterful serif) paired with *Hanken Grotesk*.
- **Tone of voice**: calm, friendly, supportive — gentle guidance, never hype.

## Features

- **Home** — immersive 3D hero, staggered reveals, best-sellers, the "three soft steps"
  routine explainer, gentle promise, and real-skin testimonials.
- **Shop** — filterable product grid with tilt-reactive skeuomorphic cards.
- **Product detail** — interactive 3D vessel, accordions, quantity picker, related items.
- **Your Routine** — a friendly 60-second skin-check quiz that recommends a routine and
  can add the whole set to the bag.
- **Our Story** — brand values and gentle FAQs.
- **Cart** — slide-in glass drawer with a free-delivery meter, persisted via localStorage.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4 + a custom design-system layer (`src/styles/index.css`)
- React Three Fiber, drei & three.js (lazy-loaded)
- Framer Motion for motion & page transitions
- Zustand (with persistence) for the cart
- React Router for navigation

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

> This is a frontend showcase: products are mock data (`src/data/products.ts`) and
> checkout is illustrative.
