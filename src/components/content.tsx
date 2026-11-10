import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiRss } from "react-icons/fi";
import { formatDate, type Dictionary, type Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/blog";
import { site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-wider text-muted uppercase">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={site.social.linkedin}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="LinkedIn"
        className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
      >
        <FiLinkedin />
      </a>
      <a
        href={site.social.github}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="GitHub"
        className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
      >
        <FiGithub />
      </a>
    </div>
  );
}

export function TagPill({ lang, tag, active = false }: { lang: Locale; tag: string; active?: boolean }) {
  return (
    <Link
      href={`/${lang}/blog/tags/${encodeURIComponent(tag)}`}
      className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-line text-muted hover:border-foreground hover:text-foreground"
      }`}
    >
      #{tag}
    </Link>
  );
}

/** Lista editorial de posts: data à esquerda, título grande, seta que aparece no hover */
export function PostList({ posts, lang, t }: { posts: PostMeta[]; lang: Locale; t: Dictionary }) {
  return (
    <ul className="border-t border-line">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link
            href={`/${lang}/blog/${post.slug}`}
            className="group relative isolate grid gap-3 py-8 transition-colors sm:grid-cols-[9rem_1fr_auto] sm:gap-8"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 rounded-2xl bg-surface transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <div className="flex gap-3 font-mono text-xs text-muted sm:flex-col sm:gap-1 sm:pt-2">
              <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              <span>
                {post.readingMinutes} {t["reading-time"]}
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl leading-[1.2] transition-colors group-hover:text-accent sm:text-2xl">
                {post.draft && (
                  <span className="mr-3 rounded-full border border-accent px-2 py-0.5 align-middle font-mono text-[10px] tracking-wider text-accent uppercase">
                    {t.draft}
                  </span>
                )}
                {post.title}
              </h3>
              {post.description && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{post.description}</p>}
              {post.tags.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-x-3 font-mono text-xs text-muted">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </p>
              )}
            </div>
            <FiArrowUpRight
              aria-hidden
              className="hidden size-6 -translate-x-2 translate-y-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter({ lang, t, showBlog }: { lang: Locale; t: Dictionary; showBlog: boolean }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {t["footer-note"]}
        </p>
        <div className="flex items-center gap-5">
          {showBlog && (
            <>
              <Link href={`/${lang}/blog`} className="link-underline hover:text-foreground">
                {t["menu-blog"]}
              </Link>
              <a href={`/${lang}/blog/feed.xml`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                <FiRss /> {t.rss}
              </a>
            </>
          )}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
