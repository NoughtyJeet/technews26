import { getSinglePost, getPosts } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PostPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
    const post = await getSinglePost(params.slug);
    const allPosts = await getPosts(10);
    const relatedPosts = allPosts?.filter((p: any) => p.slug !== params.slug).slice(0, 2) || [];

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <article className="glass p-6 lg:p-12 rounded-3xl border border-white/10 relative overflow-hidden bg-black/40">
                        {/* Background glow specific to the post */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[120px] pointer-events-none" />

                        {/* Back navigation */}
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group text-sm font-medium">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Tech Feed
                        </Link>

                        {/* Header metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-400 mb-6">
                            {post.tags?.[0] && (
                                <span className="bg-white/10 text-[var(--color-neon-cyan)] px-3 py-1 rounded-full border border-[var(--color-neon-cyan)]/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                                    {post.tags[0].name}
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                <time dateTime={post.published_at || ''}>
                                    {new Date(post.published_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>
                            {post.authors?.[0] && (
                                <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{post.authors[0].name}</span>
                                </div>
                            )}
                        </div>

                        {/* Title & Excerpt */}
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
                            {post.title}
                        </h1>
                        {post.custom_excerpt && (
                            <p className="text-xl text-zinc-300 leading-relaxed mb-10 border-l-2 border-[var(--color-neon-purple)] pl-6">
                                {post.custom_excerpt}
                            </p>
                        )}

                        {/* Hero Image */}
                        {post.feature_image && (
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                                <Image
                                    src={post.feature_image}
                                    alt={post.title || 'Article Header Image'}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        )}

                        {/* Content Body */}
                        <div
                            className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-[var(--color-neon-cyan)] hover:prose-a:text-[var(--color-neon-purple)] prose-a:transition-colors prose-img:rounded-xl prose-img:border prose-img:border-white/10"
                            dangerouslySetInnerHTML={{ __html: post.html || '' }}
                        />

                        {/* Related Articles Section */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-white/10">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-[var(--color-neon-purple)] to-[var(--color-neon-cyan)] rounded-full"></span>
                                    Related Articles
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedPosts.map((relatedPost: any) => (
                                        <div key={relatedPost.id} className="group relative rounded-2xl glass p-5 flex flex-col justify-between min-h-[220px] overflow-hidden border border-white/5 hover:border-[var(--color-neon-cyan)]/30 transition-colors">
                                            <Link href={`/post/${relatedPost.slug}`} className="absolute inset-0 z-20">
                                                <span className="sr-only">Read {relatedPost.title}</span>
                                            </Link>

                                            {relatedPost.feature_image && (
                                                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                                                    <Image
                                                        src={relatedPost.feature_image}
                                                        alt={relatedPost.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                                                </div>
                                            )}

                                            <div className="relative z-10 w-full h-full flex flex-col justify-end pointer-events-none">
                                                <span className="text-[var(--color-neon-purple)] text-xs font-bold uppercase tracking-wider mb-2 block">
                                                    {relatedPost.tags?.[0]?.name || 'News'}
                                                </span>
                                                <h4 className="text-lg font-bold mb-2 leading-tight group-hover:text-[var(--color-neon-cyan)] transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-zinc-400 line-clamp-2">
                                                    {relatedPost.custom_excerpt}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 hidden lg:block">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
