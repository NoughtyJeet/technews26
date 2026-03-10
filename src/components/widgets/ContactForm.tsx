"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="glass p-12 rounded-3xl text-center border border-[var(--color-neon-cyan)]/30 animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-[var(--color-neon-cyan)]" />
                </div>
                <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                <p className="text-zinc-400 max-w-sm">
                    Thank you for reaching out to technews26. Our team will get back to you within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl flex flex-col gap-6 relative overflow-hidden border border-white/10">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-purple)]/10 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-3xl font-black mb-2">Get in Touch</h3>
            <p className="text-zinc-400 mb-6">Have a tip on a new hardware launch? Want to report a bug? Send us a message.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-zinc-300">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-[var(--color-neon-cyan)] focus:ring-1 focus:ring-[var(--color-neon-cyan)] transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-zinc-300">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-zinc-300">Subject</label>
                <input
                    type="text"
                    id="subject"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-[var(--color-neon-cyan)] focus:ring-1 focus:ring-[var(--color-neon-cyan)] transition-all"
                    placeholder="E.g. Apple Glass Leak"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-zinc-300">Message</label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all resize-y"
                    placeholder="Tell us what's on your mind..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full md:w-auto self-start px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {/* Button glow effect running underneath */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)] opacity-0 group-hover:opacity-20 transition-opacity" />

                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
        </form>
    );
}
