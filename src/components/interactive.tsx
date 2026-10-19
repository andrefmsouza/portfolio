"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp, FiCheck, FiCopy } from "react-icons/fi";
import type { Heading } from "@/lib/blog";

export function CopyEmailButton({ email, label, copiedLabel }: { email: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "ok" : "copy"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? <FiCheck className="text-accent" /> : <FiCopy />}
          {copied ? copiedLabel : label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0 })}
          className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-line bg-background/80 text-muted backdrop-blur transition-colors hover:text-foreground"
          aria-label={label}
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Adiciona botão "copiar" em cada bloco de código do artigo */
export function CodeCopyButtons({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>(".prose figure[data-rehype-pretty-code-figure]");
    const cleanups: (() => void)[] = [];

    figures.forEach((figure) => {
      const pre = figure.querySelector("pre");
      if (!pre || figure.querySelector(".code-copy")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "code-copy absolute right-2 bottom-2 rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100";
      button.textContent = label;

      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          button.textContent = copiedLabel;
          setTimeout(() => (button.textContent = label), 1800);
        } catch {}
      };
      const show = () => (button.style.opacity = "1");
      const hide = () => (button.style.opacity = "");

      button.addEventListener("click", onClick);
      figure.addEventListener("mouseenter", show);
      figure.addEventListener("mouseleave", hide);
      figure.appendChild(button);

      cleanups.push(() => {
        button.remove();
        figure.removeEventListener("mouseenter", show);
        figure.removeEventListener("mouseleave", hide);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [label, copiedLabel]);

  return null;
}

/** Sumário lateral que destaca a seção sendo lida */
export function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label={title} className="text-sm">
      <p className="mb-4 font-mono text-xs tracking-wider text-muted uppercase">{title}</p>
      <ul className="flex flex-col gap-2 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-0.5 transition-colors ${h.depth === 3 ? "pl-7" : "pl-4"} ${
                active === h.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
