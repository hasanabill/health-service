import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdmin = token?.role === 'admin';
        const isDoctor = token?.role === 'doctor';
        const isPatient = token?.role === 'patient';

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // Protect doctor routes
        if (req.nextUrl.pathname.startsWith('/doctor') && !isDoctor && !isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // Protect patient routes
        if (req.nextUrl.pathname.startsWith('/patient') && !isPatient && !isDoctor && !isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/doctor/:path*', '/patient/:path*'],
}; 