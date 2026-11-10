import pt from "@/dictionaries/pt.json";
import en from "@/dictionaries/en.json";
import { yearsOfExperience } from "@/lib/site";

export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt";

export type Locale = (typeof locales)[number];
export type Dictionary = typeof pt;

export type WorkRole = {
  role: string;
  period: string;
  description: string[];
  /** Tecnologias do cargo, mostradas como etiquetas */
  skills?: string[];
};

export type WorkExperience = {
  id: number;
  company: string;
  period: string;
  roles: WorkRole[];
};

export type Project = {
  id: string;
  name: string;
  status: "open" | "private" | "wip";
  featured?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
  /** Prints em /public/images/projects/ — opcional */
  images?: string[];
};

export type Education = {
  id: number;
  school: string;
  period: string;
  course: string;
  description: string[];
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// "{years}" nos dicionários vira os anos de carreira calculados na hora da renderização.
// Entre aspas sozinho (ex.: "value": "{years}") vira número; dentro de um texto, só o número.
export function getDictionary(locale: Locale): Dictionary {
  const years = String(yearsOfExperience());
  const json = JSON.stringify(dictionaries[locale])
    .replaceAll('"{years}"', years)
    .replaceAll("{years}", years);
  return JSON.parse(json) as Dictionary;
}

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
};

export function formatDate(date: string, locale: Locale) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(htmlLang[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
