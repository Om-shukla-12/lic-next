import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    const userRole = request.cookies.get('user-role')?.value;
    const { pathname } = request.nextUrl;

    // Define routes
    const authRoutes = ['/login', '/register'];
    const protectedRoutes = [
        '/agent-dashboard',
        '/customer-dashboard',
        '/profile',
        '/records',
        '/forms'
    ];

    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    const isRoot = pathname === '/';

    // 1. Root Path Redirects (Remove Home Page behavior)
    if (isRoot) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            if (userRole === 'agent') return NextResponse.redirect(new URL('/agent-dashboard', request.url));
            if (userRole === 'customer') return NextResponse.redirect(new URL('/customer-dashboard', request.url));

            // Unknown role with token? Send to login to fix it
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        // url.searchParams.set('callbackUrl', encodeURI(pathname)); // Optional: save where they were going
        return NextResponse.redirect(url);
    }

    // 2. Redirect authenticated users away from auth pages (login/register)
    if (isAuthRoute && token) {
        if (userRole === 'agent') return NextResponse.redirect(new URL('/agent-dashboard', request.url));
        if (userRole === 'customer') return NextResponse.redirect(new URL('/customer-dashboard', request.url));

        // Unknown role? Allow access to login page so they can re-auth
        return NextResponse.next();
    }

    // 3. Optional: Role-based protection (prevent customers from reaching agent pages)
    if (token && userRole) {
        if (pathname.startsWith('/agent-dashboard') && userRole !== 'agent') {
            return NextResponse.redirect(new URL('/login', request.url)); // Access denied -> Login
        }
        if (pathname.startsWith('/customer-dashboard') && userRole !== 'customer') {
            return NextResponse.redirect(new URL('/login', request.url)); // Access denied -> Login
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files if any (handled loosely by negating common extensions if needed, but the above list is standard Next.js)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
