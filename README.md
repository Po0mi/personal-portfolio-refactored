# Personal Portfolio v3

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A brutalist editorial portfolio built with React + Vite. Features a split-half hero,
GSAP scramble animations, IBM Plex Mono system typography, orange/black palette,
and a consistent 7-column grid design system across all sections.

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

---

## Project Structure
```
src/
├── assets/
├── components/
│   ├── About.jsx / About.scss
│   ├── Contact.jsx / Contact.scss
│   ├── Cursor.jsx / Cursor.scss
│   ├── Hero.jsx / Hero.scss
│   ├── Principles.jsx / Principles.scss
│   └── Projects.jsx / Projects.scss
├── hooks/
│   ├── useActiveLink.js
│   ├── useContactAnimation.js
│   ├── useHeroAnimation.js
│   ├── useMaskAnimation.js
│   ├── useMobileMenu.js
│   ├── useNavAnimation.js
│   ├── usePrinciplesAnimation.js
│   └── useProjectsAnimation.js
├── layouts/
│   ├── navbar.jsx
│   └── navbar.scss
├── styles/
│   └── global.scss
├── App.jsx
├── App.css
└── main.jsx
```

---

## Sections

### Hero
- Split-half layout — orange block left, dark stack right
- FRONTEND on orange block, DEVELOPER/PORTFOLIO/DEVELOPER outline stack on right
- Entrance: orange block slams in from left, scramble text reveal on all titles
- Cursor parallax on FRONTEND and both DEVELOPER words
- Name byline with orange accent on surname

### About
- 7×5 CSS grid with left gutter vertical label
- Large paragraph with mask animation word-by-word reveal on scroll
- Gutter label animates in on scroll
- Tech grid — 3-column bordered box: Frontend / Backend / Tools
- Badges animate in with GSAP stagger on scroll

### Projects
- 7×5 CSS grid with left gutter vertical label
- Full-screen hover preview image follows cursor with lerp
- Project rows — orange full-height fill sweep on hover
- Number, outlined Syncopate title, meta, mono tech tags, arrow
- Rows snap in from left with skewX on scroll

### Principles
- Interrupt block — orange "05 PROJ." stat left, principles list right
- 7×5 CSS grid below with left gutter vertical label
- Interrupt animates: orange slams from left, dark items stagger from right
- Rows snap in from left with skewX on scroll

### Contact
- Massive outlined "LET'S TALK" heading
- Diagonal orange marquee tape
- Email display
- Footer: name, role, nav links, socials, copyright

---

## Hooks

| Hook | Purpose |
|---|---|
| `useHeroAnimation` | GSAP timeline — orange block entrance + scramble text |
| `useMaskAnimation` | IntersectionObserver + GSAP mask wipe reveal |
| `useNavAnimation` | Navbar + links slide in from right on mount |
| `useProjectsAnimation` | Header + rows snap in with ScrollTrigger |
| `usePrinciplesAnimation` | Interrupt block + gutter label entrance animations |
| `useContactAnimation` | Contact section elements animate in on scroll |
| `useActiveLink` | Tracks active section via IntersectionObserver |
| `useMobileMenu` | Mobile menu open/close state with closing animation |

---

## Design System

| Token | Value |
|---|---|
| `--bg-color` | `#0a0908` |
| `--main-text` | `#ff6a00` |
| `--secondary-text` | `#f4f3ee` |

**Typography**
- Display: `Syncopate` 700 — outlined with `-webkit-text-stroke`
- Mono: `IBM Plex Mono` 400/700 — all meta, labels, tags, numbers
- Body: `Space Grotesk` 300/400 — paragraph text

**Grid**
- 7-column × 5-row CSS grid used consistently across all sections
- Column 1 reserved for vertical gutter label
- Content spans columns 2–7

**Borders**
- Section borders: `rgba(255, 255, 255, 0.08)`
- Internal row borders: `rgba(244, 243, 238, 0.08)`
- Orange accent: `var(--main-text)` at various opacities

---

## Getting Started
```bash
# install dependencies
npm install

# start dev server
npm run dev -- --force

# build for production
npm run build
```

---

## Notes
- Remove `<StrictMode>` from `main.jsx` — causes GSAP ScrollTrigger to double-fire
- CSS variables defined in `src/styles/global.scss` — single source of truth
- GSAP plugins registered once in `main.jsx`
- `max-width: 1600px` on containers for large monitor support
- `overflow: hidden` on gutter elements required for label entrance animations

---

## Live Site

[![Live](https://img.shields.io/badge/Live-dandev.online-ff6a00?style=for-the-badge&logoColor=white)](https://dandev.online)

---

## Author

**Dan Gabrielle De Castro**
![CPU](https://img.shields.io/badge/CPU-Iloilo%20PH-ff6a00?style=flat-square)
![Role](https://img.shields.io/badge/Role-Frontend%20Developer-0a0908?style=flat-square&labelColor=ff6a00)
![Year](https://img.shields.io/badge/Year-4th%20Year%20IT-0a0908?style=flat-square&labelColor=ff6a00)

[decastrogab21@gmail.com](mailto:decastrogab21@gmail.com) · [gabdev.online](https://gabdev.online)
