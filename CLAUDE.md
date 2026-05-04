# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint with Next.js rules
```

No test suite is configured.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 3** for utility classes; custom styles in `app/globals.css`
- **Google Fonts**: DM Serif Display (headings) + DM Sans (body) — imported in `app/layout.tsx`, applied via CSS vars (`--font-serif`, `--font-sans`)
- No component library (shadcn, MUI, etc.) — everything is hand-rolled

## Architecture

This is a **single-page marketing/demo site** — one route, no backend, no auth, no database.

### Key files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Entire landing page as a single `'use client'` component (~700+ lines) |
| `app/globals.css` | Design tokens (CSS vars), component styles, keyframe animations |
| `app/layout.tsx` | Root layout: metadata, font config, `<body>` class |
| `lib/data.ts` | All static data: `COVERS`, `MATCHES`, `PAIRS`, `LISTS`, `TASTE_TOP_5` |

### Design tokens (globals.css)

- Background: `#0c0c0b` (near-black)
- Text: `#f4ede0` (warm off-white)
- Gold accent: `#f0c132`
- All spacing/typography uses `clamp()` for fluid scaling — avoid hardcoded `px` values for layout-level sizing

### page.tsx structure

The page is divided into six sections rendered top-to-bottom:
1. **Nav** — fixed top bar
2. **Hero** — headline + animated filmstrip background (CSS keyframe scroll)
3. **How It Works** — interactive head-to-head matching demo driven by `useState`; match state lives in `currentPairIdx`, `picked`, `winnerSide`
4. **Trending** — grid of community lists from `LISTS[]`
5. **Social** — profile cards, taste comparison, activity feed (static mock)
6. **Taste Profile** — Claude AI analysis mockup (static demo)

Scroll-triggered fade-up animations use `IntersectionObserver` — sections get a `fade-up` class which CSS transitions handle; no animation library.

### Data layer (lib/data.ts)

TypeScript interfaces: `Cover`, `MatchEntry`, `Pair`, `TrendingList`. All data is hardcoded — no API calls. When TMDB integration is added, this file is the intended replacement point.

### Path aliases

`@/*` resolves to the repo root (e.g. `import { COVERS } from '@/lib/data'`).

## Copy rules

- **Never use `--` (em dash or double hyphen) in any user-facing text.** Reword sentences to avoid it.
