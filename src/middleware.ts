import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignora arquivos estáticos
  if (
    pathname.includes('.') || // arquivos com extensão
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images')
  ) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redireciona se não tiver locale
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale

    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  const lang = pathname.split('/')[1];

  if (!['pt', 'en'].includes(lang)) {
    return NextResponse.redirect(new URL('/en', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|avatar.png).*)',
    '/:lang*'
  ],
} 