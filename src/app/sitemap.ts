import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, hasTranslation } from "@/lib/blog";
import { htmlLang, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

function bothLanguages(path: string) {
  return { languages: Object.fromEntries(locales.map((l) => [htmlLang[l], absoluteUrl(`/${l}${path}`)])) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    const posts = getAllPosts(lang).filter((p) => !p.draft);

    entries.push(
      { url: absoluteUrl(`/${lang}`), lastModified: now, changeFrequency: "monthly", priority: 1, alternates: bothLanguages("") },
      {
        url: absoluteUrl(`/${lang}/blog`),
        lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: bothLanguages("/blog"),
      }
    );

    for (const post of posts) {
      const languages = Object.fromEntries(
        locales.filter((l) => hasTranslation(l, post.slug)).map((l) => [htmlLang[l], absoluteUrl(`/${l}/blog/${post.slug}`)])
      );
      entries.push({
        url: absoluteUrl(`/${lang}/blog/${post.slug}`),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: { languages },
      });
    }

    for (const { tag } of getAllTags(lang)) {
      entries.push({ url: absoluteUrl(`/${lang}/blog/tags/${encodeURIComponent(tag)}`), changeFrequency: "weekly", priority: 0.4 });
    }
  }

  return entries;
}
