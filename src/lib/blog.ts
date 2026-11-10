import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Root, Element, Text } from "hast";
import { visit } from "unist-util-visit";
import type { Locale } from "@/lib/i18n";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  readingMinutes: number;
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type Post = PostMeta & { html: string; headings: Heading[] };

function toDateString(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readPostFile(locale: Locale, slug: string) {
  const file = path.join(CONTENT_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  if (!data.title || !data.date) {
    throw new Error(`[blog] ${locale}/${slug}.md precisa de "title" e "date" no frontmatter.`);
  }

  const meta: PostMeta = {
    slug,
    locale,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: toDateString(data.date)!,
    updated: toDateString(data.updated),
    tags: Array.isArray(data.tags) ? data.tags.map((t: unknown) => String(t).toLowerCase()) : [],
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };

  return { meta, content };
}

// Rascunhos aparecem no `npm run dev`, mas nunca no build de produção
const showDrafts = process.env.NODE_ENV !== "production";

export const getAllPosts = cache((locale: Locale): PostMeta[] => {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(locale, f.replace(/\.md$/, ""))!.meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

/** Sem post publicado, o blog some do site: menu, rodapé, sitemap, feed e a própria página. */
export function hasPosts(locale: Locale) {
  return getAllPosts(locale).length > 0;
}

export function getAllTags(locale: Locale) {
  const counts = new Map<string, number>();
  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
}

/** O mesmo nome de arquivo em content/blog/pt e content/blog/en = tradução do mesmo post. */
export function hasTranslation(locale: Locale, slug: string) {
  return getAllPosts(locale).some((p) => p.slug === slug);
}

function collectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      let text = "";
      visit(node, "text", (t: Text) => {
        text += t.value;
      });
      headings.push({ id, text: text.trim(), depth: node.tagName === "h2" ? 2 : 3 });
    });
  };
}

export const getPost = cache(async (locale: Locale, slug: string): Promise<Post | null> => {
  const file = readPostFile(locale, slug);
  if (!file || (file.meta.draft && !showDrafts)) return null;

  const headings: Heading[] = [];

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaLabel: "Link para esta seção" },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark-dimmed" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(file.content);

  return { ...file.meta, html: String(result), headings };
});
