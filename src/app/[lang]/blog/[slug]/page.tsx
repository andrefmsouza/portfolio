import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { JsonLd, TagPill } from "@/components/content";
import { CodeCopyButtons, TableOfContents } from "@/components/interactive";
import { Reveal, ScrollProgress, SplitText } from "@/components/motion";
import { getAllPosts, getPost, hasTranslation } from "@/lib/blog";
import { formatDate, getDictionary, htmlLang, locales, ogLocale, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllPosts(lang).map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, ...rest } = await params;
  const lang = rest.lang as Locale;
  const post = await getPost(lang, slug);
  if (!post) return {};

  const languages: Record<string, string> = {};
  for (const l of locales) {
    if (hasTranslation(l, slug)) languages[htmlLang[l]] = `/${l}/blog/${slug}`;
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/${lang}/blog/${slug}`, languages },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      locale: ogLocale[lang],
      url: `/${lang}/blog/${slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug, ...rest } = await params;
  const lang = rest.lang as Locale;
  const post = await getPost(lang, slug);
  if (!post) notFound();

  const t = getDictionary(lang);
  const url = absoluteUrl(`/${lang}/blog/${slug}`);

  return (
    <>
      <ScrollProgress />
      <CodeCopyButtons label={t.copy} copiedLabel={t.copied} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: htmlLang[lang],
          keywords: post.tags.join(", "),
          url,
          mainEntityOfPage: url,
          ...(post.cover ? { image: absoluteUrl(post.cover) } : {}),
          author: { "@type": "Person", name: site.name, url: absoluteUrl(`/${lang}`) },
        }}
      />

      <article className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <Reveal y={8}>
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            {t["back-to-blog"]}
          </Link>
        </Reveal>

        <header className="mt-10 max-w-4xl">
          <Reveal y={8} className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span aria-hidden>/</span>
            <span>
              {post.readingMinutes} {t["reading-time"]}
            </span>
            {post.updated && (
              <>
                <span aria-hidden>/</span>
                <span>
                  {t["updated-on"]} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
                </span>
              </>
            )}
            {post.draft && <span className="text-accent uppercase">{t.draft}</span>}
          </Reveal>

          <h1 className="mt-6 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.015em] text-balance">
            <SplitText text={post.title} stagger={0.03} />
          </h1>

          {post.description && (
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{post.description}</p>
            </Reveal>
          )}

          {post.tags.length > 0 && (
            <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagPill key={tag} lang={lang} tag={tag} />
              ))}
            </Reveal>
          )}
        </header>

        {post.cover && (
          <Reveal delay={0.4} className="mt-14">
            <Image
              src={post.cover}
              alt=""
              width={1600}
              height={900}
              priority
              className="aspect-[16/9] w-full rounded-3xl border border-line object-cover"
            />
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_15rem] lg:gap-20">
          <Reveal delay={0.45}>
            <div className="prose max-w-[68ch]" dangerouslySetInnerHTML={{ __html: post.html }} />
          </Reveal>
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-32">
              <TableOfContents headings={post.headings} title={t["on-this-page"]} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
