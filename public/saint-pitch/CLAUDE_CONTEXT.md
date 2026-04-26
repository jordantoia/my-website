# Saint Creative Lead Pitch — Project Context

This is a single-page pitch website built for Jordan Toia to present to Aiden (CEO of Saint), a Melbourne clothing brand with two lines:
- **Saint Clothing** — motorcycle apparel (late 20s–60s, safety-focused riders)
- **Saint Layers** — activewear (broader, younger demographic, growth-stage)

---

## What the site is

A high-end scrollable pitch website (`index.html`) built with vanilla HTML/CSS/JS — no frameworks. It runs on a local Python HTTP server (`python3 -m http.server 8080`).

---

## Design system

- **Fonts:** Barlow Condensed (display/headings) + Inter (body) via Google Fonts
- **Colours:**
  - `#0f0f0e` dark background
  - `#faf8f4` cream (light sections)
  - `#D97A3A` orange (accents, labels, highlights)
- **Logo:** `assets/saint-logo-wing.png` — Sa1nt Wing logo, black on transparent, used in nav + landing header
- **Animations:** Scroll-reveal via IntersectionObserver, load animations on hero

---

## Page sections (in order)

1. **Fixed nav** — Sa1nt logo (dark → inverts white on scroll), "Creative Lead Proposal" label
2. **Intro / Current Situation** — Cream. Large Wing logo header + doc meta. "All the raw material. My direction." headline. Two-col grid: what Saint has vs. lacks.
3. **Brand Strategy** — Dark. Two brand cards: Saint Clothing + Saint Layers with content strategies.
4. **Weekly Structure** — Cream. 4-day grid (Planning, Stock & Accounts, Edit & AI Production, Shoot Day).
5. **YouTube Strategic Case** — Dark. Split layout: large editorial headline + 6 numbered points.
6. **Work References** — Dark. 5 items — click opens video modal (Instagram reels via iframe embed, Vimeo via player embed, portfolio as external link).
7. **Engagement / Footer** — Dark. "32 Hours / Week", engagement terms, salary info, Jordan's contact details.

---

## Engagement terms

- **32 hrs/week · 4 days** (3 in-house, 1 WFH — Day 01 Planning)
- **$1,500 / week inc. super**
- **$46.88 / hr** ($1,500 ÷ 32 hrs)
- Flexible to business schedule

---

## Jordan's details

- **Name:** Jordan Toia
- **Role:** Director · Cinematographer · Editor
- **Portfolio:** https://www.jordantoia.com/
- **Phone:** 0448 174 270

---

## Work references (with embed URLs)

1. Audience Engagement Concept — `https://www.instagram.com/reel/DQ3k9SEErGx/embed/`
2. Audience Engagement Concept — `https://www.instagram.com/reel/DQlu16UEmkJ/embed/`
3. Audience Engagement Concept — `https://www.instagram.com/reel/DQV9mn5Esrx/embed/`
4. Fashion Campaign — `https://player.vimeo.com/video/369984877`
5. Portfolio & Showreel — `https://www.jordantoia.com/`

---

## File structure

```
saint-pitch/
├── index.html              ← entire site (HTML + CSS + JS, ~1400 lines)
├── assets/
│   ├── saint-logo-wing.png ← Sa1nt Wing logo (846×645, transparent PNG)
│   └── saint-logo.jpg      ← old logo (unused)
├── docs/
│   └── SAINT_PITCH_PROJECT_BRIEF.md
└── .claude/
    └── launch.json         ← dev server configs (Python :8080, npx serve :3000)
```

---

## Things already decided / don't change without asking

- No frameworks — pure HTML/CSS/JS only
- Single file output preferred (all CSS/JS inline in index.html)
- Orange accent `#D97A3A` must stay consistent throughout
- Logo must use `assets/saint-logo-wing.png`
- Salary is $1,500/wk inc. super, $46.88/hr
