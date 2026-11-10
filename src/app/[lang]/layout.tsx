import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/content";
import { BackToTop } from "@/components/interactive";
import { MotionProvider } from "@/components/motion";
import { getDictionary, htmlLang, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n";
import { getAllPosts, getAllTags, hasPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

// Roda antes da pintura: aplica o tema salvo (ou o do sistema) sem "piscar"
const themeScript = `(function(){try{var s=localStorage.getItem('theme')||(document.cookie.match(/(?:^|; )theme=(light|dark)/)||[])[1];var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export const dynamicParams = false;

// Regera as páginas uma vez por dia para os anos de carreira ("{years}") virarem sozinhos
export const revalidate = 86400;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: t["meta-title"], template: `%s — ${site.name}` },
    description: t["meta-description"],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/en" },
      types: hasPosts(lang) ? { "application/rss+xml": `/${lang}/blog/feed.xml` } : undefined,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      url: `/${lang}`,
      title: t["meta-title"],
      description: t["meta-description"],
    },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-icon-180x180.png",
    },
    manifest: "/manifest.json",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const other: Locale = lang === "pt" ? "en" : "pt";

  return (
    <html
      lang={htmlLang[lang]}
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0"
        >
          {t["skip-to-content"]}
        </a>
        <MotionProvider>
          <SiteHeader
            lang={lang}
            labels={{
              home: t["menu-home"],
              projects: t["menu-projects"],
              skills: t["menu-skills"],
              journey: t["menu-journey"],
              blog: t["menu-blog"],
              contact: t["menu-contact"],
              toggleTheme: t["toggle-theme"],
              toggleMenu: t["toggle-menu"],
              changeLanguage: t["change-language"],
            }}
            showBlog={hasPosts(lang)}
            otherLang={{
              posts: getAllPosts(other).map((p) => p.slug),
              tags: getAllTags(other).map((x) => x.tag),
            }}
          />
          <main id="main">{children}</main>
          <SiteFooter lang={lang} t={t} showBlog={hasPosts(lang)} />
          <BackToTop label={t["back-to-top"]} />
        </MotionProvider>
      </body>
    </html>
  );
}
