# PROFFARO // Cybersecurity Portfolio

> A futuristic, cyberpunk-themed personal portfolio for **Dayananda Bindhani** (`@proffaro`) — cybersecurity student & software developer.

Built to feel like breaking into a high-security system: terminal boot sequence, matrix rain, glitch text, decrypt animations, particle constellations, custom cursor, and an `↑↑↓↓←→←→ba` easter egg.

![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwindcss)

---

## Features

- **Terminal boot preloader** — fake system-scan sequence with progress bar before reveal
- **Hero** — glitch name, typewriter role cycler, mouse-reactive particle network
- **About** — terminal window with "decrypt" text scramble on scroll
- **Skills** — animated bars with percentage counters, scroll-triggered fill
- **Projects** — pulled **live from the GitHub API**, 3D tilt + holographic shimmer cards, graceful static fallback
- **Timeline** — animated vertical line draw + staggered card reveals
- **Certifications** — shield/badge cards with tilt
- **Contact** — floating-label form with glow focus that opens a prefilled mail draft
- **Global** — custom trailing cursor, scanline overlay, matrix-rain background, glassmorphism navbar with active-section tracking, click particle bursts, Konami-code secret terminal
- Fully responsive (`xs` 320px → `2xl`), reduced-motion aware, ~98 kB first load JS

## Tech Stack

| Layer        | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | Next.js 14 (App Router) + React 18       |
| Language     | TypeScript                               |
| Styling      | Tailwind CSS + CSS variables             |
| Animation    | GSAP, Framer Motion, custom canvas + hooks |
| Fonts        | JetBrains Mono · Orbitron · Space Grotesk |
| Data         | GitHub REST API (server-side, cached)    |

## Getting Started

```bash
# 1. install
npm install

# 2. configure env (optional)
cp .env.example .env.local

# 3. run dev server
npm run dev        # http://localhost:3000

# 4. production
npm run build && npm run start
```

## Environment Variables

| Variable                      | Required | Description                                                        |
| ----------------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_GITHUB_USERNAME` | no       | GitHub username for repo fetching (defaults to `proffaro`)         |
| `GITHUB_TOKEN`                | no       | Read-only PAT to raise API rate limit from 60 → 5000/hr (server)   |

If the API is unreachable or rate-limited, the Projects section falls back to the curated list in `src/data/profile.ts`.

## What's dynamic vs. static

**Pulled live from the GitHub API** (`src/lib/github.ts`, cached hourly):

- Name, bio, avatar, location, follower/following counts, public-repo count
- All repositories (stars, forks, language, topics, archived state, homepage)
- **Language-usage bars** — computed from real bytes-per-language across your repos

**Sourced from the résumé** (things GitHub simply doesn't store — `src/data/profile.ts`):
education, certifications, achievements, phone, and richer project write-ups that
enrich the matching live repos. No proficiency percentages are invented — skills are
shown as a plain categorized list, and the only bars use real GitHub byte counts.

## Customization

- **Résumé** — replace `public/Dayananda_Resume.pdf` with your real formatted file (the
  committed one is an auto-generated placeholder).
- **Résumé-only content** — `src/data/profile.ts` (education, certs, achievements, links).
- **Theme** — colors, fonts, animations in `tailwind.config.ts` and `src/app/globals.css`.

> Tip: set `GITHUB_TOKEN` in `.env.local` so the per-repo language calls never hit the
> unauthenticated 60-req/hr limit (raises it to 5000/hr).

## Project Structure

```
src/
├─ app/            # layout, page, globals.css, icon, robots
├─ components/     # cursor, navbar, preloader, cards, effects, easter eggs
├─ sections/       # Hero, About, Skills, Projects, Timeline, Certifications, Contact
├─ hooks/          # useReveal, useScramble, useCounter
├─ lib/            # github.ts (API + fallback)
└─ data/           # profile.ts (single source of content)
```

## Deployment

Optimized for **Vercel** (zero config) or **Netlify**:

```bash
# Vercel
vercel

# or push to GitHub and import the repo in the Vercel dashboard
```

Set `GITHUB_TOKEN` in the project's environment variables for higher API limits.

---

### Easter Egg

Type the Konami code anywhere: `↑ ↑ ↓ ↓ ← → ← → b a`

---

Built by **Dayananda Bindhani** — _"Skills matter more than degrees."_
[GitHub](https://github.com/proffaro) · [LinkedIn](https://linkedin.com/in/proffaro) · [LeetCode](https://leetcode.com/u/PROFFARO)
