# André Souza — Personal Portfolio

Personal portfolio built with Next.js 15, featuring a custom i18n implementation, dark/light mode, and an interactive Apple Watch–style skills section with real-time physics-based animations.

**Live:** [andresouza.dev.br](https://andresouza.dev.br)

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based i18n routing via `[lang]` dynamic segment |
| Language | TypeScript 5 | End-to-end type safety across components and dictionaries |
| Styling | Tailwind CSS 4 | Utility-first with zero runtime |
| Animations | Framer Motion | `useMotionValue` + `useTransform` for physics without re-renders |
| Icons | react-icons | Tree-shakeable icon set |
| Runtime | React 19 | Uses `use(params)` for async params in App Router |

---

## Notable implementation details

### i18n without a library
Routing is handled by Next.js middleware that detects the browser language and redirects to `/pt` or `/en`. All content lives in two JSON dictionaries (`src/dictionaries/`). A `useTranslations` hook reads the active dictionary and exposes typed translation functions — no external i18n package required.

```
src/
├── middleware.ts          # Detects language, redirects /  → /pt or /en
├── i18n.config.ts         # Supported locales
├── dictionaries/
│   ├── en.json            # All English content
│   └── pt.json            # All Portuguese content
└── hooks/
    └── useTranslations.ts # Hook that exposes t(), tWorkList(), tEducationList()
```

### Apple Watch–style skills section
The skills section renders 21 icons arranged in three concentric rings. Each icon's scale is computed in real time from its distance to the screen centre as the user drags:

```
dist  = √( (iconX + dragX)² + (iconY + dragY)² )
scale = clamp(MIN, MAX, MAX − (dist / MAX_DIST) × (MAX − MIN))
```

This runs entirely through Framer Motion's `useMotionValue` + `useTransform` pipeline — the DOM is updated by the compositor thread without triggering any React re-renders. Z-index is also derived from scale so foreground icons always sit on top.

Each icon is its own component (`IconBubble`) so that `useTransform` is called at the component level, as required by React's rules of hooks.

### Theme
Dark/light mode is stored in `localStorage` and applied synchronously before first paint via a script injected in the root layout, avoiding the flash-of-wrong-theme issue common in SSR apps.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test both languages: [/en](http://localhost:3000/en) and [/pt](http://localhost:3000/pt).

---

## Project structure

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx     # Language validation
│   │   └── page.tsx       # Main page — renders all sections
│   ├── layout.tsx         # Root layout (metadata, fonts, ThemeProvider)
│   └── globals.css
├── components/
│   ├── SkillsBubbles.tsx  # Interactive Apple Watch–style skills
│   └── ThemeProvider.tsx
├── dictionaries/
│   ├── en.json
│   └── pt.json
├── hooks/
│   ├── useTranslations.ts
│   └── useTheme.ts
└── middleware.ts
```
