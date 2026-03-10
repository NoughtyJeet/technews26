import React from 'react';
import Link from 'next/link';
import { Youtube, Play } from 'lucide-react';

export default function YouTubeWidget() {
    return (
        <div className="relative w-full h-full p-6 flex flex-col justify-between overflow-hidden group min-h-[200px]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#FF0000]/5 group-hover:bg-[#FF0000]/10 transition-colors duration-500" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FF0000]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF0000]/30 transition-colors duration-500" />

            <Link
                href="https://www.youtube.com/@parganihaji?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label="Subscribe to our YouTube Channel"
            />

            <div className="relative z-10 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FF0000]/20 flex items-center justify-center text-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                    <Youtube className="w-5 h-5" />
                </div>
                <div>
                    <span className="text-xs font-bold text-[#FF0000] uppercase tracking-wider block">Subscribe Now</span>
                    <span className="text-white font-bold">@parganihaji</span>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
                <h3 className="text-2xl lg:text-3xl font-black leading-tight group-hover:text-[#FF0000] transition-colors">
                    Watch the latest Tech Reviews & Deep Dives
                </h3>

                <div className="mt-4 inline-flex items-center justify-between w-full bg-white/5 rounded-xl p-3 border border-white/10 group-hover:border-[#FF0000]/30 transition-all duration-300">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black relative overflow-hidden flex justify-center items-center">
                            <div className="w-4 h-4 bg-zinc-600 rounded-sm"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black relative overflow-hidden flex justify-center items-center">
                            <div className="w-4 h-4 bg-zinc-500 rounded-sm"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black relative overflow-hidden flex justify-center items-center">
                            <div className="w-4 h-4 bg-zinc-400 rounded-sm"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-black flex items-center justify-center text-[10px] font-bold">
                            +10k
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#FF0000]">
                        <span className="group-hover:-translate-x-1 transition-transform">Watch</span>
                        <Play className="w-4 h-4 fill-[#FF0000] group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}
