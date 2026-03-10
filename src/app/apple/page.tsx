import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BentoGrid, { BentoCard } from '@/components/layout/BentoGrid';
import { getPosts } from '@/lib/ghost';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppleSpringEventPage() {
    // Pass a specific filter to getPosts if it supported it. Using mock index for now.
    const posts = await getPosts(5);

    // Filter mock posts for "Apple"
    const applePosts = posts?.filter((post: any) => post.tags?.some((t: any) => t.name === 'Apple'));

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
                <div className="glass p-8 rounded-3xl mb-8 border border-[var(--color-neon-purple)]/20 shadow-[0_0_30px_rgba(176,38,255,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-purple)]/20 blur-[100px] rounded-full pointer-events-none" />
                    <span className="text-[var(--color-neon-purple)] font-bold tracking-wider uppercase text-sm mb-2 block">Live Feed</span>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">Apple Spring Event 2026</h1>
                    <p className="text-zinc-400 max-w-2xl">Follow the latest leaks, rumors, and live coverage of Apple's biggest Spring event. Is the iPhone 17e a reality? Will we see the real Apple Intelligence Agent?</p>
                </div>

                <BentoGrid>
                    {applePosts && applePosts.map((post: any, i: number) => (
                        <BentoCard key={post.id} colSpan={i === 0 ? 2 : 1} rowSpan={i === 0 ? 2 : 1} className={i === 0 ? "min-h-[400px]" : "p-6 flex flex-col justify-between min-h-[250px] relative"}>
                            <Link href={`/post/${post.slug}`} className="absolute inset-0 z-20">
                                <span className="sr-only">Read Post</span>
                            </Link>

                            {i === 0 ? (
                                <>
                                    <div className="absolute inset-0">
                                        <Image
                                            src={post.feature_image || ''}
                                            alt={post.title}
                                            fill
                                            className="object-cover opacity-60 mix-blend-overlay"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                    </div>
                                    <div className="relative h-full flex flex-col justify-end p-8 pointer-events-none">
                                        <span className="bg-[var(--color-neon-purple)] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider shadow-[0_0_10px_rgba(176,38,255,0.5)]">
                                            Featured Leak
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{post.title}</h2>
                                        <p className="text-zinc-300 mb-4 line-clamp-2">{post.custom_excerpt}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {post.feature_image && (
                                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                                            <Image src={post.feature_image} alt="" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                                        <span className="text-[var(--color-neon-purple)] text-xs font-bold uppercase tracking-wider mb-2 block shadow-[0_0_10px_rgba(176,38,255,0.2)]">
                                            {post.tags?.[0]?.name || 'News'}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[var(--color-neon-cyan)] transition-colors">{post.title}</h3>
                                            <p className="text-sm text-zinc-400 line-clamp-2">{post.custom_excerpt}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </BentoCard>
                    ))}
                    {/* Fallback empty states */}
                    {(!applePosts || applePosts.length === 0) && (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            <p className="mb-2 italic">Scanning the ether for Apple leaks...</p>
                            <p className="text-xs">No posts found in the Ghost CMS for this category yet.</p>
                        </div>
                    )}
                </BentoGrid>
            </main>
        </div>
    );
}
