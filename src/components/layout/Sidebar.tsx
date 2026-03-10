import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Rss, Activity, Box, MessageSquare, Info, Mail } from 'lucide-react';
import TechPilot from '@/components/widgets/TechPilot';

export default function Sidebar({ className }: { className?: string }) {
    return (
        <aside className={cn("flex flex-col gap-6 w-full lg:w-80 glass p-6 rounded-3xl", className)}>
            <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.5)] shrink-0">
                    <Image src="/logo.png" alt="technews26 Logo" fill className="object-cover" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">technews26</h1>
                    <p className="text-xs text-zinc-400">March 2026 Edition</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    <Rss className="w-4 h-4 text-[var(--color-neon-cyan)]" /> Latest Leaks
                </Link>
                <Link href="/apple" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    <Activity className="w-4 h-4 text-[var(--color-neon-purple)]" /> Apple Spring Event
                </Link>
                <Link href="/mwc" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    <Box className="w-4 h-4 text-zinc-400" /> MWC 2026 Foldables
                </Link>
                <div className="h-px bg-white/10 my-2 w-full"></div>
                <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    <Info className="w-4 h-4 text-zinc-400" /> About
                </Link>
                <Link href="/contact" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    <Mail className="w-4 h-4 text-zinc-400" /> Contact
                </Link>
            </nav>

            {/* RAG Tech Pilot Chat */}
            <div className="mt-auto pt-6 border-t border-[var(--color-glass-border)] flex-1 flex flex-col min-h-0">
                <TechPilot />
            </div>
        </aside>
    );
}
