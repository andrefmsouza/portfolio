import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SkillsBubbles } from "@/components/SkillsBubbles";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { CountUp, Parallax, Reveal, SplitText, Spotlight } from "@/components/motion";
import { CopyEmailButton } from "@/components/interactive";
import { JsonLd, PostList, SectionLabel, SocialLinks } from "@/components/content";
import { getDictionary, type Education, type Locale, type WorkExperience } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

const MARQUEE = [
  "Node.js", "TypeScript", "React", "React Native", "Next.js", "AWS", "PHP", "Python",
  "PostgreSQL", "MySQL", "Claude", "OpenAI", "MCP", "Vue.js", "Angular", "Arduino",
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const posts = getAllPosts(lang).slice(0, 3);

  const work: TimelineEntry[] = (t["work-experience-list"] as WorkExperience[]).map((job) => ({
    id: `work-${job.id}`,
    title: job.company,
    period: job.period,
    items: job.roles.map((role, i) => ({
      key: `work-${job.id}-${i}`,
      title: role.role,
      period: role.period,
      bullets: role.description,
    })),
  }));

  const education: TimelineEntry[] = (t["education-list"] as Education[]).map((edu) => ({
    id: `edu-${edu.id}`,
    title: edu.school,
    period: edu.period,
    items: [{ key: `edu-${edu.id}`, title: edu.course, bullets: edu.description }],
  }));

  const timelineLabels = { more: t["read-more"], less: t["read-less"] };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          url: absoluteUrl(`/${lang}`),
          image: absoluteUrl("/images/avatar.png"),
          jobTitle: t.status,
          email: `mailto:${site.email}`,
          sameAs: [site.social.linkedin, site.social.github],
          worksFor: { "@type": "Organization", name: "iScholar" },
        }}
      />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section id="home" className="relative isolate overflow-hidden">
        <Spotlight className="-z-10" />
        <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-[1.4fr_1fr] md:pt-24">
          <div>
            <Reveal y={10}>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-background/60 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {t.status}
              </p>
            </Reveal>

            <h1 className="mt-8">
              <SplitText text={t.hello} className="block font-mono text-sm tracking-wider text-muted uppercase" />
              <SplitText
                text={t.name}
                delay={0.15}
                className="mt-3 block font-serif text-[clamp(3.6rem,11vw,8.5rem)] leading-[0.92] tracking-[-0.02em]"
              />
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t.description}</p>
            </Reveal>

            <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={`/${lang}/blog`}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform active:scale-[0.97]"
              >
                {t["cta-blog"]}
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
              >
                {t["cta-contact"]}
              </a>
              <SocialLinks className="ml-1" />
            </Reveal>
          </div>

          <Reveal delay={0.3} y={40} className="mx-auto w-full max-w-[22rem] md:max-w-none">
            <Parallax offset={80}>
              <div className="relative">
                <div aria-hidden className="avatar absolute -inset-3 border border-line" />
                <Image
                  className="avatar aspect-square w-full bg-surface object-cover"
                  src="/images/avatar.png"
                  alt={site.name}
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </Parallax>
          </Reveal>
        </div>

        <a
          href="#stats"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground md:flex"
        >
          <FiArrowDown className="animate-bounce" />
          {t["scroll-hint"]}
        </a>
      </section>

      {/* ─── Números ──────────────────────────────────────────────────── */}
      <section id="stats" className="scroll-mt-20 border-y border-line">
        <div className="mx-auto grid max-w-6xl divide-line px-6 sm:grid-cols-3 sm:divide-x">
          {t.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="py-10 sm:px-8 sm:first:pl-0">
              <p className="font-serif text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Faixa de tecnologias ─────────────────────────────────────── */}
      <div aria-hidden className="overflow-hidden border-b border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max gap-10 font-mono text-sm text-muted">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="text-accent">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Habilidades ──────────────────────────────────────────────── */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-center">
          <Reveal>
            <SectionLabel index="01">{t["menu-skills"]}</SectionLabel>
            <h2 className="font-serif text-5xl leading-[1.02] md:text-6xl">{t.skills}</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{t["skills-description"]}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <SkillsBubbles dragHint={t["skills-drag-hint"]} />
          </Reveal>
        </div>
      </section>

      {/* ─── Trajetória ───────────────────────────────────────────────── */}
      <section id="journey" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
        <Reveal>
          <SectionLabel index="02">{t["menu-journey"]}</SectionLabel>
          <h2 className="font-serif text-5xl leading-[1.02] md:text-6xl">{t.journey}</h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">{t["journey-description"]}</p>
        </Reveal>

        <h3 className="mt-24 mb-12 font-mono text-xs tracking-wider text-muted uppercase">{t["work-experience"]}</h3>
        <Timeline entries={work} labels={timelineLabels} />

        <h3 className="mt-28 mb-12 font-mono text-xs tracking-wider text-muted uppercase">{t.education}</h3>
        <Timeline entries={education} labels={timelineLabels} />
      </section>

      {/* ─── Blog ─────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section id="writing" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
          <Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel index="03">{t["menu-blog"]}</SectionLabel>
              <h2 className="font-serif text-5xl leading-[1.02] md:text-6xl">{t["latest-posts"]}</h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">{t["latest-posts-description"]}</p>
            </div>
            <Link href={`/${lang}/blog`} className="group inline-flex shrink-0 items-center gap-2 text-sm">
              <span className="link-underline">{t["see-all-posts"]}</span>
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <PostList posts={posts} lang={lang} t={t} />
          </Reveal>
        </section>
      )}

      {/* ─── Contato ──────────────────────────────────────────────────── */}
      <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden border-t border-line">
        <Spotlight className="-z-10" />
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
          <Reveal>
            <SectionLabel index={posts.length > 0 ? "04" : "03"}>{t["menu-contact"]}</SectionLabel>
            <h2 className="font-serif text-6xl leading-none md:text-8xl">
              {t.contact}
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t["contact-description"]}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 flex flex-col gap-6">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex w-fit items-center gap-3 font-serif text-[clamp(1.8rem,5.5vw,4rem)] leading-none italic"
            >
              <span className="link-underline pb-1">{site.email}</span>
              <FiArrowUpRight className="size-[0.7em] text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <CopyEmailButton email={site.email} label={t["copy-email"]} copiedLabel={t["email-copied"]} />
              <SocialLinks />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
