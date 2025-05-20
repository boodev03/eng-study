import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // Skip middleware for API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser()

    // Check user role and redirect accordingly
    if (user) {
        const role = user.user_metadata?.role
        const currentPath = request.nextUrl.pathname

        if (role === 'student' && !currentPath.startsWith('/student')) {
            return NextResponse.redirect(new URL('/student', request.url))
        }

        if (role === 'teacher' && !currentPath.startsWith('/teacher')) {
            return NextResponse.redirect(new URL('/teacher', request.url))
        }

        if (role !== 'student' && role !== 'teacher' && currentPath !== '/permission-denied') {
            return NextResponse.redirect(new URL('/permission-denied', request.url))
        }
    }

    // Check if user is trying to access auth pages while logged in
    const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
    if (user && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return supabaseResponse
}