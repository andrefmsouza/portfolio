"use client";

import { useEffect, useLayoutEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import type { Locale } from "@/lib/i18n";

type NavKey = "home" | "projects" | "skills" | "journey" | "blog" | "contact";

interface Props {
  lang: Locale;
  labels: Record<NavKey, string> & { toggleTheme: string; toggleMenu: string; changeLanguage: string };
  /** Falso enquanto não houver post publicado: o link do blog sai do menu */
  showBlog: boolean;
  /**
   * Slug deste idioma → slug da tradução, e tags que existem no outro idioma.
   * Evita mandar o visitante para um 404 ao trocar de idioma.
   */
  otherLang: { posts: Record<string, string>; tags: string[] };
}

// id da seção na home → item do menu
const SECTIONS: Record<string, NavKey> = {
  home: "home",
  projects: "projects",
  skills: "skills",
  journey: "journey",
  writing: "blog",
  contact: "contact",
};

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavKey>("home");

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(SECTIONS[entry.target.id]);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

// Mesma regra do script inline do layout: tema salvo ou, sem ele, o do sistema
function applyStoredTheme() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("theme");
  } catch {}
  saved ??= document.cookie.match(/(?:^|; )theme=(light|dark)/)?.[1] ?? null;
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.contains("dark") ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function SiteHeader({ lang, labels, showBlog, otherLang }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === `/${lang}`;
  const isBlog = pathname.startsWith(`/${lang}/blog`);
  const sectionActive = useActiveSection(isHome);
  const active: NavKey | null = isBlog ? "blog" : isHome ? sectionActive : null;

  const other: Locale = lang === "pt" ? "en" : "pt";
  const otherHref = (() => {
    const rest = pathname.replace(new RegExp(`^/${lang}`), "");
    const post = rest.match(/^\/blog\/([^/]+)$/);
    if (post && post[1] !== "tags") {
      const translated = otherLang.posts[post[1]];
      return translated ? `/${other}/blog/${translated}` : `/${other}/blog`;
    }
    const tag = rest.match(/^\/blog\/tags\/([^/]+)$/);
    if (tag && !otherLang.tags.includes(decodeURIComponent(tag[1]))) return `/${other}/blog`;
    return `/${other}${rest}`;
  })();

  // Trocar de idioma recria o <html> sem a classe do tema, e o script inline não roda de novo
  useLayoutEffect(applyStoredTheme, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { key: NavKey; href: string }[] = [
    { key: "home", href: `/${lang}#home` },
    { key: "projects", href: `/${lang}#projects` },
    ...(showBlog ? [{ key: "blog" as const, href: `/${lang}/blog` }] : []),
    { key: "skills", href: `/${lang}#skills` },
    { key: "journey", href: `/${lang}#journey` },
    { key: "contact", href: `/${lang}#contact` },
  ];

  // Na home, os links de seção (e o logo) rolam a página por conta própria: o Next ignora
  // o clique quando o endereço já termina com o mesmo #hash, e a página não se mexia
  function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome) return;
    const [path, hash] = href.split("#");
    if (path !== `/${lang}`) return; // ex.: o link do blog segue a navegação normal

    event.preventDefault();
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
    if (window.location.pathname + window.location.hash !== href) window.history.pushState(null, "", href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-line bg-background/75 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl"
            : "border-transparent"
        }`}
      >
        <Link
          href={`/${lang}`}
          onClick={(event) => scrollToSection(event, `/${lang}`)}
          className="group flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm tracking-tight"
          aria-label="André Souza"
        >
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-0.5">{"{"}</span>
          <span className="font-medium">AS</span>
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">{"}"}</span>
        </Link>

        <nav className="hidden md:block" aria-label="Principal">
          <ul className="flex items-center gap-1 text-sm">
            {links.map((link) => (
              <li key={link.key} className="relative">
                <Link
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.href)}
                  className={`relative z-10 block rounded-full px-4 py-2 transition-colors ${
                    active === link.key ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {labels[link.key]}
                </Link>
                {active === link.key && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={otherHref}
            hrefLang={other}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
            }}
            className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label={labels.changeLanguage}
          >
            {other}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label={labels.toggleTheme}
          >
            <FiMoon className="dark:hidden" />
            <FiSun className="hidden dark:block" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
            aria-label={labels.toggleMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-background/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link, i) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={(event) => {
                      setMenuOpen(false);
                      scrollToSection(event, link.href);
                    }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl ${
                      active === link.key ? "bg-surface" : ""
                    }`}
                  >
                    {labels[link.key]}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
