import pt from "@/dictionaries/pt.json";
import en from "@/dictionaries/en.json";

export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt";

export type Locale = (typeof locales)[number];
export type Dictionary = typeof pt;

export type WorkRole = {
  role: string;
  period: string;
  description: string[];
};

export type WorkExperience = {
  id: number;
  company: string;
  period: string;
  roles: WorkRole[];
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

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
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
