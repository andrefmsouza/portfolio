import { getAllPosts } from "@/lib/blog";
import { getDictionary, htmlLang, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function escape(value: string) {
  return value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

export async function GET(_: Request, { params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const posts = getAllPosts(lang).filter((p) => !p.draft);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/${lang}/blog/${post.slug}`);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${t["blog-title"]} — ${site.name}`)}</title>
    <link>${absoluteUrl(`/${lang}/blog`)}</link>
    <description>${escape(t["blog-description"])}</description>
    <language>${htmlLang[lang]}</language>
    <atom:link href="${absoluteUrl(`/${lang}/blog/feed.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
