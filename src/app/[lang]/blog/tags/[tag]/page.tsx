import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllTags } from "@/lib/blog";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

type Params = Promise<{ lang: string; tag: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllTags(lang).map(({ tag }) => ({ lang, tag })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag: raw, ...rest } = await params;
  const lang = rest.lang as Locale;
  const tag = decodeURIComponent(raw);
  const t = getDictionary(lang);
  return {
    title: `${t["blog-tag-title"]} #${tag}`,
    description: t["blog-description"],
    alternates: { canonical: `/${lang}/blog/tags/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag: raw, ...rest } = await params;
  const lang = rest.lang as Locale;
  const tag = decodeURIComponent(raw);
  if (!getAllTags(lang).some((x) => x.tag === tag)) notFound();
  return <BlogIndex lang={lang} tag={tag} />;
}
