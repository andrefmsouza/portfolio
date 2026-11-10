# André Souza — Personal site & blog

Personal site and Markdown blog built with Next.js 16. Bilingual (PT/EN), statically generated, no database.

**Live:** [andresouza.dev.br](https://andresouza.dev.br)

---

## Writing a post

The blog is hidden while there are no published posts: no menu or footer link, no sitemap entry, and `/blog` and the feed return 404. It comes back on its own, per language, with the first published post.

Posts are Markdown files in `content/blog/<lang>/`. The file name becomes the URL.

```
content/blog/
├── pt/
│   └── meu-post.md   →  /pt/blog/meu-post
└── en/
    └── meu-post.md   →  /en/blog/meu-post
```

Every file starts with a frontmatter header:

```yaml
---
title: "Post title"                 # required
description: "One or two sentences" # used by Google and share previews
date: 2026-10-19                     # required (YYYY-MM-DD)
updated: 2026-11-02                  # optional
tags: [nodejs, ai]                   # optional, lowercase
cover: /images/blog/cover.png        # optional, file in public/images/blog/
draft: true                          # optional — drafts only show in `npm run dev`
---
```

- **Translations:** a file with the same name in `pt/` and `en/` is treated as a translation. The language switcher and the `hreflang` tags link them. A post can also exist in only one language.
- **Images:** put them in `public/images/blog/` and reference `/images/blog/file.png`. Always write the alt text.
- **Code:** fenced blocks get syntax highlighting (Shiki). Add a title with ` ```ts title="file.ts" ` and highlight lines with ` ```ts {3,5-7} `.
- **Publishing:** commit and push. The build regenerates the pages, sitemap and RSS feed.

---

## What's included for search engines

| Feature | Where |
|---|---|
| Server-rendered HTML per language, correct `<html lang>` | `src/app/[lang]/layout.tsx` |
| Canonical URLs and `hreflang` alternates | `generateMetadata` in each page |
| `sitemap.xml` (with language alternates) and `robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |
| JSON-LD (`Person` on home, `BlogPosting` on posts) | `src/components/content.tsx` |
| Generated Open Graph images for the site and each post | `opengraph-image.tsx` + `src/lib/og.tsx` |
| RSS feed per language | `/pt/blog/feed.xml`, `/en/blog/feed.xml` |

After deploying, submit `https://andresouza.dev.br/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, static generation) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 with CSS-variable design tokens |
| Animation | Framer Motion (respects `prefers-reduced-motion`) |
| Markdown | unified · remark-gfm · rehype-pretty-code (Shiki) · gray-matter |
| Fonts | Space Grotesk, Geist, Geist Mono |

---

## Notable implementation details

### i18n without a library
`src/proxy.ts` redirects paths without a locale using the `NEXT_LOCALE` cookie, then `Accept-Language`, then Portuguese. All UI copy lives in `src/dictionaries/{pt,en}.json` and is read on the server through `getDictionary()` in `src/lib/i18n.ts`, so each language ships its own HTML.

### Apple Watch–style skills section
21 icons in concentric rings. Each icon's scale is derived from its distance to the centre as the cluster is dragged:

```
dist  = √( (iconX + dragX)² + (iconY + dragY)² )
scale = clamp(MIN, MAX, MAX − (dist / MAX_DIST) × (MAX − MIN))
```

It runs through Framer Motion's `useMotionValue` + `useTransform`, so dragging never triggers React re-renders.

### Theme
An inline script in `<head>` applies the saved theme (or the OS preference) before first paint, so there's no flash of the wrong theme.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Drafts are visible in dev mode only.

---

## Project structure

```
content/blog/{pt,en}/        # Blog posts (Markdown)
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx       # Root layout: <html lang>, fonts, metadata, header/footer
│   │   ├── page.tsx         # Home
│   │   ├── opengraph-image.tsx
│   │   └── blog/
│   │       ├── page.tsx               # Post list
│   │       ├── [slug]/page.tsx        # Post
│   │       ├── [slug]/opengraph-image.tsx
│   │       ├── tags/[tag]/page.tsx    # Posts by tag
│   │       └── feed.xml/route.ts      # RSS
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── global-not-found.tsx
│   └── globals.css          # Design tokens, article typography
├── components/              # Header, timeline, skills, motion helpers…
├── dictionaries/            # pt.json, en.json
├── lib/                     # blog.ts, i18n.ts, og.tsx, site.ts
└── proxy.ts                 # Locale redirect
```
