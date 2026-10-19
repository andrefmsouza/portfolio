import Link from "next/link";
import { FiRss } from "react-icons/fi";
import { PostList, SectionLabel, TagPill } from "@/components/content";
import { Reveal, SplitText } from "@/components/motion";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { getDictionary, type Locale } from "@/lib/i18n";

export function BlogIndex({ lang, tag }: { lang: Locale; tag?: string }) {
  const t = getDictionary(lang);
  const all = getAllPosts(lang);
  const posts = tag ? all.filter((p) => p.tags.includes(tag)) : all;
  const tags = getAllTags(lang);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-28">
      <SectionLabel index={String(posts.length).padStart(2, "0")}>
        {tag ? `${t["blog-tag-title"]} #${tag}` : t["blog-title"]}
      </SectionLabel>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h1 className="font-serif text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.92] tracking-[-0.02em]">
          <SplitText text={tag ? `#${tag}` : t["blog-title"]} />
        </h1>
        <a
          href={`/${lang}/blog/feed.xml`}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          <FiRss /> {t.rss}
        </a>
      </div>

      <Reveal delay={0.3}>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t["blog-description"]}</p>
      </Reveal>

      {tags.length > 0 && (
        <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-2">
          <Link
            href={`/${lang}/blog`}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              !tag ? "border-foreground bg-foreground text-background" : "border-line text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {t["blog-all"]}
          </Link>
          {tags.map(({ tag: name }) => (
            <TagPill key={name} lang={lang} tag={name} active={name === tag} />
          ))}
        </Reveal>
      )}

      <Reveal delay={0.5} className="mt-16">
        {posts.length > 0 ? (
          <PostList posts={posts} lang={lang} t={t} />
        ) : (
          <p className="border-t border-line pt-10 text-muted">{t["blog-empty"]}</p>
        )}
      </Reveal>
    </div>
  );
}
