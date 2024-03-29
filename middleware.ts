import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (isAuthenticated) {
        const url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url.toString())
    }

    const authMiddleware = withAuth({
        pages: {
            signIn: `/login`,
        },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
}

export const config = {
    matcher: ['/login', '/register']
}