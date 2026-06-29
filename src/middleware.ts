import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const LOCALES = ['en'] as const;
const DEFAULT_LOCALE = 'en';

// Refreshes the Supabase auth session cookie on admin routes so server
// components see a current session. Redirects bare / to the default locale.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect bare root to default locale.
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url));
  }

  // Redirect /ar/* paths to /en/* equivalents.
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const rest = pathname.slice(3); // strip "/ar"
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${rest || '/'}`, req.url), 301);
  }

  // Redirect unknown locale segments (e.g. /fr/...) to default locale path.
  const firstSegment = pathname.split('/')[1];
  if (firstSegment && !LOCALES.includes(firstSegment as (typeof LOCALES)[number]) && !pathname.startsWith('/admin') && !pathname.startsWith('/api') && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url));
  }

  const res = NextResponse.next({ request: req });

  // Only run Supabase session refresh on /admin.
  if (!req.nextUrl.pathname.startsWith('/admin')) return res;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return res; // not configured yet — let pages handle the empty state

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon|brand|fonts|manifest).*)'],
};
