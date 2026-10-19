import { getDictionary, type Locale } from "@/lib/i18n";
import { ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return renderOgImage({ eyebrow: t.status, title: site.name, footer: t["meta-title"].split(" — ")[1], photo: "large" });
}
