"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LiveTechPulse() {
    const items = [
        { symbol: "NVDA", price: "845.20", change: "+12.4%", up: true },
        { symbol: "AAPL", price: "185.10", change: "-1.2%", up: false },
        { symbol: "BTC", price: "89,200", change: "+5.1%", up: true },
        { symbol: "LLM Elo: GPT-5", price: "#1", change: "NEW", up: true },
        { symbol: "LLM Elo: Claude 3.7", price: "#2", change: "Steady", up: true }
    ];

    return (
        <div className="glass rounded-2xl p-3 overflow-hidden flex items-center border-[var(--color-neon-cyan)]/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Live Pulse</span>
            </div>
            <div className="flex-1 overflow-hidden relative w-full h-6 flex items-center ml-4">
                <motion.div
                    className="flex gap-8 whitespace-nowrap absolute"
                    animate={{ x: [0, -1000] }}
                    transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                >
                    {/* Duplicate for infinite marquee effect */}
                    {[...items, ...items, ...items].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-zinc-400">{item.symbol}</span>
                            <span className="text-white">{item.price}</span>
                            <span className={`flex items-center text-xs ${item.up ? 'text-[var(--color-neon-cyan)]' : 'text-red-400'}`}>
                                {item.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {item.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
