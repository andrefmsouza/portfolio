import { getPost } from "@/lib/blog";
import { formatDate, getDictionary, type Locale } from "@/lib/i18n";
import { ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug, ...rest } = await params;
  const lang = rest.lang as Locale;
  const t = getDictionary(lang);
  const post = await getPost(lang, slug);
  return renderOgImage({
    eyebrow: t["blog-title"],
    title: post?.title ?? site.name,
    footer: post ? `${site.name} · ${formatDate(post.date, lang)} · ${post.readingMinutes} ${t["reading-time"]}` : site.name,
    photo: "small",
  });
}
