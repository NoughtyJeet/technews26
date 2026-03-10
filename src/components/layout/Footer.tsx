import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Github, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black mt-20 relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-neon-purple)]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-neon-cyan)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center font-bold text-white shrink-0">
                                <Image src="/logo.png" alt="technews26 Logo" fill className="object-cover" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">technews26</h1>
                        </div>
                        <p className="text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed">
                            We cover the speed of code. Documenting the intersection of hardware and generative AI in 2026.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-[var(--color-neon-cyan)] transition-colors">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                                <Github className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-red-500 transition-colors">
                                <Youtube className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white tracking-wide">Sections</h4>
                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li><Link href="/" className="hover:text-[var(--color-neon-cyan)] transition-colors">Latest Posts</Link></li>
                            <li><Link href="/apple" className="hover:text-[var(--color-neon-purple)] transition-colors">Apple Spring Event</Link></li>
                            <li><Link href="/mwc" className="hover:text-white transition-colors">MWC 2026</Link></li>
                            <li><Link href="/about" className="hover:text-[var(--color-neon-cyan)] transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-[var(--color-neon-purple)] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white tracking-wide">Legal</h4>
                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Ethics Statement</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} technews26. Crafted with Vibe Coding.</p>
                    <p>Lighthouse Score &gt; 95 target.</p>
                </div>
            </div>
        </footer>
    );
}
