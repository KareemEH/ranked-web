# Ranked

> **Build your definitive list through head-to-head choices.**

Ranked is a landing page and interactive concept demo for a ranking product that turns gut instinct into a scored list. Instead of asking users to sort a list manually, it presents two items at a time and asks a single question: *which one do you prefer?* The full product vision (an ELO-based algorithm that produces a ranked list from real picks, plus an AI-generated taste profile) is represented here through a working demo and a set of polished mockup sections. The live scoring, auth, and backend are not built yet; see "What's actually built" below and the roadmap at the bottom.

---

## Screenshots

### Landing Page: Animated Filmstrip Hero
![Hero](docs/screenshots/hero.png)

### How It Works: Interactive Head-to-Head Demo
![How It Works](docs/screenshots/how-it-works.png)

### Taste Profile: Mockup Section
![Taste Profile](docs/screenshots/taste-profile.png)

### Rank Page: Design Reference
![Rank Page](docs/screenshots/rank-page.png)

---

## Overview

The core product insight is that humans are bad at ranking things in the abstract, but very good at comparing two things directly. Ranked is designed around decomposing any ranking problem into a series of binary choices, each feeding a live ELO rating system (the same algorithm used in competitive chess).

This repo is the landing page for that idea: a real, interactive demo of the head-to-head pick mechanic, plus mockup sections previewing what the fuller product (community list discovery, a personal taste profile, accounts) would look like once built out. It's a single-page marketing and demo site, not yet a full-stack application.

---

## What's actually built vs. what's mocked up

Worth being upfront about this, since the visual polish can make it look more finished than it is:

**Real and interactive**
- The "How It Works" head-to-head demo: click a side, see the win/lose animation, advance through 5 preset matchups
- The animated filmstrip hero and scroll-triggered fade-ins (CSS keyframes + `IntersectionObserver`, no animation library)
- The full landing page layout, responsive design, and design system

**Static mockups, not live features**
- The ELO numbers shown in the demo are fixed values from `lib/data.ts`; picking a winner does not currently recalculate anything (see "ELO: the concept" below)
- The Trending, Social, and Taste Profile sections render hardcoded sample data, not real rankings or AI output
- There is no `/rank`, `/lists`, `/profile`, `/signin`, or `/signup` route; the whole page lives in one `app/page.tsx`
- Auth, persistence, and the TMDB integration described in the roadmap are not implemented

---

## Features

### Core Ranking Concept
- **Head-to-head demo**: the "How It Works" section presents 5 preset pairs in sequence; the user taps a preference and sees a win/lose card animation.
- **ELO scoring, designed but not yet wired up**: the product is built around a standard ELO formula (below). The demo doesn't recompute live ratings yet; that's the next real build step, not a finished feature.
- **6 categories represented**: Movies, TV Shows, Games, Books, Food, and Music appear in the static data set.

### Taste Profile (mockup)
- Podium display, full ranked list, and "AI-generated" analysis copy are static design mockups using sample data, not generated from real picks.

### Discover (mockup)
- A curated grid of trending lists with static counts and previews; not live or user-generated.

### Marketing Landing Page (fully real)
- Animated filmstrip background, the interactive demo, and a word-cloud footer CTA; all implemented and working.

### Auth (not implemented)
- No sign-in/sign-up flow exists in this build yet. Designing it is on the roadmap.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom design system |
| Fonts | DM Serif Display, DM Sans (Google Fonts via Next.js) |
| Animations | CSS keyframes + IntersectionObserver (no animation library) |
| Data | Static TypeScript data layer (TMDB-ready) |
| Deployment | Vercel-ready (static export) |

---

## Architecture

This is a single-page marketing and demo application built with the Next.js App Router. Everything lives in one `'use client'` component since the interactive demo is driven entirely by local state; there is no backend, auth, or database in this build.
