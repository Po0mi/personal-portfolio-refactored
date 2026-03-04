# Personal Portfolio v2

A brutalist-aesthetic personal portfolio built with React + Vite. Features bold typography, GSAP animations, grain texture, and a dark amber color system.

---

## Tech Stack

- **React** + **Vite**
- **SCSS** — modular per component
- **GSAP** + **ScrollTrigger** — animations and scroll effects
- **Space Grotesk** + **Syncopate** — Google Fonts

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── About.jsx / About.scss
│   ├── Contact.jsx / Contact.scss
│   ├── Cursor.jsx
│   ├── Hero.jsx / Hero.scss
│   ├── Noise.jsx
│   ├── Principles.jsx / Principles.scss
│   └── Projects.jsx / Projects.scss
├── hooks/
│   ├── useActiveLink.js
│   ├── useContactAnimation.js
│   ├── useHeroAnimation.js
│   ├── useMaskAnimation.js
│   ├── useMobileMenu.js
│   ├── useNavAnimation.js
│   └── useProjectsAnimation.js
├── layouts/
│   ├── navbar.jsx
│   └── navbar.scss
├── App.jsx
├── App.css
└── main.jsx
```

---

## Sections

### Hero
- Massive outlined `FRONTEND` and `DEVELOPER` titles spanning full viewport
- Filled `PORTFOLIO` center title
- Name byline below portfolio
- Scroll hint with bounce animation
- Cursor parallax on top/bottom titles
- Entrance: slam in from sides with skewX + scramble text reveal

### About
- Large paragraph with mask animation word-by-word reveal on scroll
- Tech stack badges grouped by Frontend / Backend / Tools
- Badges snap in with stagger GSAP animation on scroll
- `— TECH STACK` label mask reveal

### Projects
- Full-screen hover preview image follows cursor
- Project rows with amber fill on hover
- Number, title, meta, tech tags, arrow
- Rows snap in from left with skewX on scroll

### Principles
- Same row layout as Projects for consistency
- Number, outlined title, description, tag per row
- Amber full fill on hover
- Rows snap in from left on scroll

### Contact
- Massive outlined `LET'S TALK` heading — clicks to mailto
- Diagonal amber marquee tape
- Email scramble reveal on scroll
- Footer: name, nav links, socials, copyright

---

## Hooks

| Hook | Purpose |
|---|---|
| `useHeroAnimation` | GSAP timeline — slam in + scramble text on mount |
| `useMaskAnimation` | Intersection Observer + GSAP mask wipe reveal |
| `useNavAnimation` | Navbar + links slide in from right on mount |
| `useProjectsAnimation` | Header + rows snap in with ScrollTrigger |
| `useContactAnimation` | Contact section elements animate in on scroll |
| `useActiveLink` | Tracks active section via IntersectionObserver |
| `useMobileMenu` | Mobile menu open/close state with closing animation |

---

## Design System

| Token | Value |
|---|---|
| `--bg-color` | `#0a0908` |
| `--main-text` | `#ff9e00` |
| `--secondary-text` | `#f4f3ee` |

**Typography**
- Display: `Syncopate` 700 — outlined with `-webkit-text-stroke`
- Body: `Space Grotesk` 300/500/700

**Grid**
- 7-column × 5-row CSS grid used consistently across all sections
- Content typically spans columns 2–7

---

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build
```

---

## Notes

- Remove `<StrictMode>` from `main.jsx` — it causes GSAP ScrollTrigger to double-fire in development
- GSAP plugins registered once in `main.jsx`:
  ```js
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ```
- Scroll skew was removed due to conflicts with GSAP pinning and fixed elements
- Project preview images go in `public/images/`

---

## Author

**Dan Gabrielle De Castro**  
4th-year IT Student — Central Philippine University  
[decastrogab21@gmail.com](mailto:decastrogab21@gmail.com)
