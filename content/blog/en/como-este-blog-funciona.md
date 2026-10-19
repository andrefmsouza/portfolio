---
title: "How this blog works: Markdown, Next.js and no database"
description: "Posts on this site are .md files in the repository. A commit publishes, Google indexes, and there's no admin panel to look after."
date: 2026-10-19
tags: [nextjs, markdown, seo]
draft: true
---

This is a sample post. It shows how writing works here and doubles as a formatting reference. While `draft: true` is set at the top of the file, it only shows up in `npm run dev` and is left out of the published site.

## The idea

Each post is a Markdown file in `content/blog/en/` (or `content/blog/pt/` for the Portuguese version). At build time, Next.js reads those files and generates a static HTML page for each one, so there's no database, no CMS and no server querying anything on each visit.

To publish a new post:

1. Create `content/blog/en/my-post.md`
2. Fill in the header (the *frontmatter*)
3. Commit and push

The post URL comes from the file name: `my-post.md` becomes `/en/blog/my-post`.

## The header

```yaml title="content/blog/en/my-post.md"
---
title: "Post title"
description: "One or two sentences. Shown on Google and in share previews."
date: 2026-10-19
updated: 2026-11-02 # optional
tags: [nodejs, ai]
cover: /images/blog/my-cover.png # optional
draft: false
---
```

If a file with the **same name** exists in both `pt/` and `en/`, the site treats them as translations of each other and links them, both in the language switcher and for Google.

## Code

Code blocks get syntax highlighting, a copy button, and can highlight lines:

```ts {3}
export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}
```

Inline code works too: `npm run dev`.

### Tables and lists

| Feature       | How                        |
| ------------- | -------------------------- |
| Table of contents | Built from the `##` headings |
| Reading time  | Calculated automatically   |
| Preview image | Generated for every post   |

- [x] Markdown with GFM (tables, checklists, ~~strikethrough~~)
- [x] RSS feed
- [ ] Write the first real post

> Quotes look like this: larger, in serif, with a rule on the side.

## Images

Put the file in `public/images/blog/` and use `![image description](/images/blog/file.png)`. The description matters: it's what screen readers and Google rely on.
