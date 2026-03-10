'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        redirect('/login?message=Email and password are required')
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function adminLogin(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        redirect('/admin/login?message=Email and password are required')
    }

    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (authError) {
        redirect(`/admin/login?message=${encodeURIComponent(authError.message)}`)
    }

    // Verify Admin Role immediately
    if (authData.user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', authData.user.id).single()
        if (!profile || profile.role !== 'admin') {
            // Log them back out if not admin
            await supabase.auth.signOut()
            redirect('/admin/login?message=Unauthorized. You do not have admin privileges.')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/admin/dashboard')
}

export async function signup(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) {
        redirect('/signup?message=Name, email, and password are required')
    }

    if (password.length < 8) {
        redirect('/signup?message=Password must be at least 8 characters')
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            }
        }
    })

    if (error) {
        redirect(`/signup?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}

export async function signInWithGoogle() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (data.url) {
        redirect(data.url)
    }
}
