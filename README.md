# Skyn Authority

A distinctive ecommerce experience for **Skyn Authority** — gentle, confidence-building
skincare made simple for teens. Soft, fresh, and easy to love.

## Design direction — "Soft tactile lab"

- **Immersive parallax hero**: the real product bottles float at different depths,
  bobbing gently and responding to the cursor with spring-based parallax, lit by soft
  colour blooms and floating dew. Product pages give each bottle a cursor-tilt viewer.
- **Real brand assets**: the actual SKYN AUTHORITY logo and product photography are used
  throughout — the three bottles (Gentle Cream Cleanser, Daily Balance Moisturiser, Glow
  Mist) were isolated onto transparent backgrounds and composited into the experience.
- **Skeuomorphism & neumorphism**: dewy glass surfaces, embossed/pressed buttons,
  tactile droplets, layered soft shadows, a fine grain overlay — nothing flat or clinical.
- **Palette**: drawn from the brand — sage green `#AFBE94` and warm honey `#DDAC70` from
  the logo, with cream, vanilla, soft lemon and gentle mint. No dark, harsh or muddy tones.
- **Typography**: *Fraunces* (soft, characterful serif) paired with *Hanken Grotesk*.
- **Tone of voice**: calm, friendly, supportive — gentle guidance, never hype.
  Tagline: *Confident skin. Every day.*

## Features

- **Home** — immersive 3D hero, staggered reveals, best-sellers, the "three soft steps"
  routine explainer, gentle promise, and real-skin testimonials.
- **Shop** — filterable product grid with tilt-reactive skeuomorphic cards.
- **Product detail** — cursor-tilt floating bottle, accordions, quantity picker, related items.
- **Your Routine** — a friendly 60-second skin-check quiz that recommends a routine and
  can add the whole set to the bag.
- **Our Story** — brand values and gentle FAQs.
- **Cart** — slide-in glass drawer with a free-delivery meter, persisted via localStorage.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4 + a custom design-system layer (`src/styles/index.css`)
- Framer Motion for parallax, motion & page transitions
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
