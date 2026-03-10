import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Image from 'next/image';

export const metadata = {
    title: 'About Us | technews26',
    description: 'Learn about the mission and team behind technews26.'
};

export default function AboutPage() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <article className="glass p-6 lg:p-12 rounded-3xl relative overflow-hidden">
                        {/* Background glow specific to the post */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[120px] pointer-events-none" />

                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-8">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]">technews26</span>
                        </h1>

                        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12 border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200"
                                alt="Team at work"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <p className="text-2xl font-bold max-w-2xl">
                                    Documenting the bleeding edge of hardware and generative AI from the frontlines.
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <h2>Our Mission</h2>
                            <p>
                                Founded in the wake of the generative AI boom, <strong>technews26</strong> exists to cut through the marketing fluff and deliver hard-hitting, technically accurate news. We believe that understanding the intersection of advanced silicon (Nvidia Blackwell, Qualcomm Snapdragon) and profound software architectures (Gemini 3, Apple Intelligence) is crucial for navigating the next decade.
                            </p>
                            <p>
                                We don't just review gadgets; we analyze ecosystems. We don't just echo press releases; we investigate the supply chain leaks that paint the true picture of tomorrow.
                            </p>

                            <h2>The Team</h2>
                            <p>
                                Our editorial team consists of former software engineers, silicon analysts, and tech enthusiasts who live and breathe 'vibe coding'. We leverage AI extensively in our own workflows to bring you faster, more comprehensive coverage than legacy media outlets.
                            </p>

                            <h3>Editorial Independence</h3>
                            <p>
                                Transparency is our core metric. technews26 maintains strict editorial independence. While we cover major tech conglomerates rapidly, our opinions and analyses are never purchased. If a tri-fold phone has a terrible hinge, we will say so. If a local LLM underperforms, you will read about it here first.
                            </p>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-8">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
