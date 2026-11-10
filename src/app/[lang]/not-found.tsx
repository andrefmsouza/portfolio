import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Spotlight } from "@/components/motion";
import { getDictionary, locales } from "@/lib/i18n";

// not-found.tsx não recebe params; o idioma é resolvido pelo cookie no cliente, então mostramos os dois
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Spotlight className="-z-10" />
      <div className="mx-auto w-full max-w-6xl px-6 pt-24">
        <p className="font-mono text-xs tracking-wider text-accent uppercase">404</p>
        <div className="mt-6 grid gap-16 md:grid-cols-2">
          {locales.map((lang) => {
            const t = getDictionary(lang);
            return (
              <div key={lang} lang={lang}>
                <h1 className="font-display text-3xl leading-tight md:text-4xl">{t["not-found-title"]}</h1>
                <p className="mt-6 max-w-sm leading-relaxed text-muted">{t["not-found-description"]}</p>
                <Link
                  href={`/${lang}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                >
                  <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                  {t["not-found-cta"]}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
