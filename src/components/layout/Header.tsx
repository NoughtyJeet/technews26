import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, User, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { logout } from '@/app/auth/actions';

export default async function Header() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Optionally fetch profile to check for admin role
    let isAdmin = false;
    if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile?.role === 'admin') {
            isAdmin = true;
        }
    }
    return (
        <header className="sticky top-0 z-50 w-full glass border-b border-white/5 bg-black/40">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Menu className="w-5 h-5 text-white" />
                    </button>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,243,255,0.3)] group-hover:shadow-[0_0_15px_rgba(176,38,255,0.6)] transition-shadow">
                            <Image src="/logo.png" alt="technews26 Logo" fill className="object-cover" />
                        </div>
                        <span className="font-bold text-xl hidden sm:block tracking-tight text-white group-hover:text-[var(--color-neon-cyan)] transition-colors">technews26</span>
                    </Link>
                </div>

                {/* Global Navigation - Desktop */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="text-zinc-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[var(--color-neon-cyan)] after:transition-all">News</Link>
                    <Link href="/apple" className="text-zinc-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[var(--color-neon-purple)] after:transition-all">Apple 2026</Link>
                    <Link href="/mwc" className="text-zinc-300 hover:text-white transition-colors">MWC Foldables</Link>
                    <Link href="/vibe" className="text-zinc-300 hover:text-white transition-colors">Vibe Coding</Link>
                </nav>

                {/* Utilities */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                        <Search className="w-5 h-5" />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href={isAdmin ? "/admin/dashboard" : "/dashboard"}
                                className="hidden sm:flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors"
                            >
                                <User className="w-4 h-4" />
                                {isAdmin ? "Admin" : "Dashboard"}
                            </Link>
                            <form action={logout}>
                                <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full border border-white/5 transition-colors flex items-center gap-2">
                                    <LogOut className="w-3 h-3" />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors hidden sm:block">
                                Sign In
                            </Link>
                            <Link href="/signup" className="bg-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)]/80 text-black text-xs font-bold px-4 py-2 rounded-full transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
