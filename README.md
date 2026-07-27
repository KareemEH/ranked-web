# Ranked

**Build your definitive list through head-to-head choices.**

Ranked is a head-to-head ranking engine that turns gut instinct into a scored, evolving list. Pick between two things, ELO scores update in real time, and after enough matches the algorithm tells you what your taste actually says about you.

---

## Screenshots

### Hero

![Hero](docs/screenshots/hero.png)

### How It Works — Live Head-to-Head Matching

![How It Works](docs/screenshots/how-it-works.png)

### Taste Profile — AI Analysis of Your Picks

![Taste Profile](docs/screenshots/taste-profile.png)

### Rank Page — Full Ranking Experience with Live Leaderboard

![Rank Page](docs/screenshots/rank-page.png)

---

## Features

- **Head-to-head matching** — Two items, one winner. ELO scoring updates after every pick.
- **6 categories** — Movies, TV Shows, Games, Books, Food, Music.
- **Live leaderboard** — Rankings update in real time as you make picks.
- **Taste profile** — After enough matches, get an AI-generated analysis of your taste.
- **Discover lists** — Browse community rankings built from thousands of picks.
- **60+ seeded items** — Pre-loaded with films, games, albums, books and more to rank against each other.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 3** + custom design system in `app/globals.css`
- **Google Fonts** — DM Serif Display + DM Sans
- No backend — all ranking state is local (beta)

## Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page with animated filmstrip hero |
| `/rank` | Core ranking experience — pick a category, make head-to-head picks, watch ELO update live |
| `/lists` | Discover community lists with category filters |
| `/profile` | Full taste profile with podium, ranked list, and AI analysis per category |
| `/signin` | Sign in (beta: any credentials work) |
| `/signup` | Create account (beta: any credentials work) |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design tokens

| Token | Value |
|---|---|
| Background | `#0c0c0b` |
| Text | `#f4ede0` |
| Gold accent | `#f0c132` |
| Fonts | DM Serif Display (headings), DM Sans (body) |

---

Built with [Claude Code](https://claude.ai/code).
