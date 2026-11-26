import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, translatedSlug } from "@/lib/blog";
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

    entries.push({ url: absoluteUrl(`/${lang}`), lastModified: now, changeFrequency: "monthly", priority: 1, alternates: bothLanguages("") });

    // Sem post publicado o blog fica fora do ar, então também fica fora do sitemap
    if (posts.length > 0) {
      entries.push({
        url: absoluteUrl(`/${lang}/blog`),
        lastModified: new Date(posts[0].updated ?? posts[0].date),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: bothLanguages("/blog"),
      });
    }

    for (const post of posts) {
      const languages = Object.fromEntries(
        locales.flatMap((l) => {
          const s = translatedSlug(lang, post.slug, l);
          return s ? [[htmlLang[l], absoluteUrl(`/${l}/blog/${s}`)]] : [];
        })
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
