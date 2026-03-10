import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BentoGrid, { BentoCard } from '@/components/layout/BentoGrid';
import { getPosts } from '@/lib/ghost';
import Image from 'next/image';
import Link from 'next/link';

export default async function MWCEventPage() {
    const posts = await getPosts(5);
    const mwcPosts = posts?.filter((post: any) => post.tags?.some((t: any) => t.name === 'MWC' || t.name === 'Hardware'));

    return (
        <div className="max-w-[1600px] mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
            {/* Fixed/Sticky Sidebar container */}
            <div className="lg:w-80 shrink-0">
                <div className="lg:sticky lg:top-8">
                    <Sidebar />
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <div className="glass p-8 rounded-3xl mb-8 border border-[var(--color-neon-cyan)]/20 shadow-[0_0_30px_rgba(0,243,255,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-cyan)]/20 blur-[100px] rounded-full pointer-events-none" />
                    <span className="text-[var(--color-neon-cyan)] font-bold tracking-wider uppercase text-sm mb-2 block">Hardware Feed</span>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">MWC 2026: Tri-Folds & More</h1>
                    <p className="text-zinc-400 max-w-2xl">From the show floor. Dissecting the latest bleeding-edge dual-hinge mechanics and the race to zero-bezel device dominance.</p>
                </div>

                <BentoGrid>
                    {mwcPosts && mwcPosts.map((post: any, i: number) => (
                        <BentoCard key={post.id} colSpan={1} rowSpan={1} className={"p-6 flex flex-col justify-between min-h-[250px] relative"}>
                            <Link href={`/post/${post.slug}`} className="absolute inset-0 z-20">
                                <span className="sr-only">Read Post</span>
                            </Link>
                            {post.feature_image && (
                                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                                    <Image src={post.feature_image} alt="" fill className="object-cover" />
                                </div>
                            )}
                            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                                <span className="text-[var(--color-neon-cyan)] text-xs font-bold uppercase tracking-wider mb-2 block shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                    {post.tags?.[0]?.name || 'Hardware'}
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[var(--color-neon-purple)] transition-colors">{post.title}</h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2">{post.custom_excerpt}</p>
                                </div>
                            </div>
                        </BentoCard>
                    ))}

                    {(!mwcPosts || mwcPosts.length === 0) && (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            <p className="mb-2 italic">Waiting for embargo lifts...</p>
                            <p className="text-xs">No MWC posts found in Ghost CMS.</p>
                        </div>
                    )}
                </BentoGrid>
            </main>
        </div>
    );
}
