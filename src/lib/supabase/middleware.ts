import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // 1. Defensively check for environment variables to prevent Middleware crash
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        return supabaseResponse
    }

    try {
        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
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

        // IMPORTANT: Avoid writing any logic between createServerClient and
        // supabase.auth.getUser(). A simple mistake could make it very hard to debug
        // issues with cross-browser cookies.

        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Protect Admin Routes
        if (request.nextUrl.pathname.startsWith('/admin')) {
            // Allow access to admin login page even if not logged in
            if (request.nextUrl.pathname === '/admin/login') {
                if (user) {
                    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
                    if (profile?.role === 'admin') {
                        const url = request.nextUrl.clone()
                        url.pathname = '/admin/dashboard'
                        return NextResponse.redirect(url)
                    }
                }
                return supabaseResponse
            }

            if (!user) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin/login'
                return NextResponse.redirect(url)
            }

            // Checking profile role
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (!profile || profile.role !== 'admin') {
                const url = request.nextUrl.clone()
                url.pathname = '/dashboard'
                return NextResponse.redirect(url)
            }
        }

        // Protect user dashboard route
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            if (!user) {
                const url = request.nextUrl.clone()
                url.pathname = '/login'
                return NextResponse.redirect(url)
            }
        }

        // Prevent logged-in users from seeing /login or /signup
        if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
            const url = request.nextUrl.clone()
            url.pathname = profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard'
            return NextResponse.redirect(url)
        }

    } catch (e) {
        // If anything fails (e.g. database connection in Edge), just return the default response
        console.error('Middleware Error:', e)
        return supabaseResponse
    }

    return supabaseResponse
}
