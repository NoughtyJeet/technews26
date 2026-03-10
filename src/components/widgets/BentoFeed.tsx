import React from 'react';
import { MessageSquare, Flame } from 'lucide-react';

export default function BentoFeed() {
    return (
        <div className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-[var(--color-neon-cyan)]" />
                Quick Hits
            </h3>

            <div className="flex flex-col gap-4 flex-1">

                {/* Widget: Poll */}
                <div className="glass p-4 rounded-2xl bg-black/20">
                    <p className="text-sm font-medium mb-3">Will you buy an AI-first Phone in 2026?</p>
                    <div className="space-y-2 text-xs">
                        <div className="relative h-8 rounded-lg bg-white/5 overflow-hidden flex items-center px-3 cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="absolute left-0 top-0 bottom-0 bg-[var(--color-neon-cyan)]/20 w-[68%]" />
                            <div className="relative z-10 w-full flex justify-between font-semibold">
                                <span>Yes, absolutely</span>
                                <span>68%</span>
                            </div>
                        </div>
                        <div className="relative h-8 rounded-lg bg-white/5 overflow-hidden flex items-center px-3 cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="absolute left-0 top-0 bottom-0 bg-[var(--color-neon-purple)]/20 w-[32%]" />
                            <div className="relative z-10 w-full flex justify-between font-semibold">
                                <span>Not yet</span>
                                <span>32%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Widget: Hot Take */}
                <div className="glass p-4 rounded-2xl bg-black/20 flex-1 relative overflow-hidden min-h-[140px]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <MessageSquare className="w-16 h-16" />
                    </div>
                    <span className="text-xs font-bold text-[var(--color-neon-purple)] uppercase tracking-wider mb-2 block">Hot Take</span>
                    <p className="text-sm text-zinc-300 italic relative z-10">
                        &quot;Vibe coding will replace entry-level frontend syntax jockeys, but it will massively increase the demand for System Architects.&quot;
                    </p>
                    <div className="flex items-center gap-2 mt-4 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-zinc-800" />
                        <span className="text-xs font-medium">— Senior AI Dev</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
