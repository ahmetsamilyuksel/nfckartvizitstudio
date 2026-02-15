import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from './src/lib/i18n';

function hasAdminSession(request: NextRequest) {
  return Boolean(request.cookies.get('admin_session')?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasAdminSession(request)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length || !isLocale(parts[0])) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
