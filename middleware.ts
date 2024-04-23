import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req, secret: process.env.SECRET });
    const isAuthenticated = token !== null;

    if (isAuthenticated) {
        if (req.nextUrl.pathname === '/login') {
            const url = req.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url.toString())
        }
    } else {
        if (req.nextUrl.pathname === '/user' || req.nextUrl.pathname === '/checkout') {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url.toString())
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/user', '/checkout']
}