// middleware.ts (Place in ROOT)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the role from the cookie (e.g., 'admin' or 'member')
  const isAdmin = request.cookies.get('is-admin')?.value === 'true';
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Routes
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 2. Protect Member Routes
  if (pathname.startsWith('/app') && !token) {
    // Note: Usually admins can also see member pages
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/app/:path*'],
};
