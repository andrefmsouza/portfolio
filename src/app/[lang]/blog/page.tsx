import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { hasPosts } from "@/lib/blog";
import { getDictionary, ogLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return {
    title: t["blog-title"],
    description: t["blog-description"],
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { "pt-BR": "/pt/blog", en: "/en/blog", "x-default": "/en/blog" },
      types: { "application/rss+xml": `/${lang}/blog/feed.xml` },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: `/${lang}/blog`,
      title: t["blog-title"],
      description: t["blog-description"],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  if (!hasPosts(lang)) notFound();
  return <BlogIndex lang={lang} />;
}
