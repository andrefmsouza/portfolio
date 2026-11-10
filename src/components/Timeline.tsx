"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiPlus } from "react-icons/fi";

export type TimelineEntry = {
  id: string;
  title: string;
  period: string;
  items: { key: string; title: string; period?: string; bullets: string[]; tags?: string[] }[];
};

interface Props {
  entries: TimelineEntry[];
  labels: { more: string; less: string };
}

/** Linha do tempo cuja linha vertical "se desenha" conforme a página rola */
export function Timeline({ entries, labels }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-2 bottom-0 left-[5px] w-px bg-line md:left-[calc(12rem+5px)]" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute top-2 bottom-0 left-[5px] w-px origin-top bg-accent md:left-[calc(12rem+5px)]"
      />

      {entries.map((entry) => (
        <li key={entry.id} className="relative grid gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-0 md:pl-0">
          <span
            aria-hidden
            className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-accent bg-background md:left-48"
          />
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-28 md:self-start md:pr-8"
          >
            <p className="font-medium">{entry.title}</p>
            <p className="font-mono text-xs text-muted">{entry.period}</p>
          </motion.div>

          <div className="flex flex-col gap-6 md:pl-10">
            {entry.items.map((item, i) => {
              const isOpen = open.has(item.key);
              const expandable = item.bullets.length > 0;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <h4 className="font-display text-lg leading-tight">{item.title}</h4>
                  {item.period && <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>}

                  {/* Tecnologias sempre visíveis: é o que o recrutador procura de relance */}
                  {item.tags && item.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-muted">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  {expandable && (
                    <button
                      type="button"
                      onClick={() => toggle(item.key)}
                      aria-expanded={isOpen}
                      className="group mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <span className="grid size-5 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
                        <FiPlus className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                      </span>
                      {isOpen ? labels.less : labels.more}
                    </button>
                  )}

                  {/* Sempre no HTML (o Google indexa); só a altura anima */}
                  {expandable && (
                    <div
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <ul className="flex flex-col gap-2 overflow-hidden">
                        {item.bullets.map((bullet, b) => (
                          <li
                            key={bullet}
                            className={`relative pl-5 text-[0.95rem] leading-relaxed text-muted ${b === 0 ? "mt-4" : ""}`}
                          >
                            <span aria-hidden className="absolute top-[0.8em] left-0 h-px w-2.5 bg-accent" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </li>
      ))}
    </ol>
  );
}
