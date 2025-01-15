import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  // Protect specific paths
  const protectedPaths = ['/dashboard', '/profile'];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Specify paths for middleware
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
