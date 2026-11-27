import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2);
    if (isLocale(code)) return code;
  }

  // Navegador em outro idioma (alemão, holandês...): quem é de fora entende melhor o inglês.
  // Sem cabeçalho nenhum (robôs, por exemplo), fica o padrão do site.
  return accept ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (isLocale(firstSegment)) return;

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Ignora internos do Next, os envios do Vercel Analytics (/_vercel/insights)
  // e qualquer arquivo com extensão (imagens, sitemap.xml, robots.txt, feed.xml...)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
