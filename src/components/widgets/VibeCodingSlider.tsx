'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  slug: string;
  title: string;
  custom_excerpt: string | null;
  feature_image: string | null;
  published_at: string;
  tags: { name: string }[];
}

export default function VibeCodingSlider({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col p-6 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-neon-purple)]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-neon-magenta)] shadow-[0_0_10px_var(--color-neon-magenta)] animate-pulse" />
          Vibe Coding
        </h2>
        <Link href="/vibe" className="text-sm font-medium text-zinc-400 hover:text-[var(--color-neon-cyan)] transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 relative z-10">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col relative group/card rounded-2xl overflow-hidden bg-black/40 border border-white/5 hover:border-[var(--color-neon-magenta)]/30 transition-all hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]"
          >
            <Link href={`/post/${post.slug}`} className="absolute inset-0 z-20">
              <span className="sr-only">Read {post.title}</span>
            </Link>
            
            <div className="relative h-48 w-full overflow-hidden">
              {post.feature_image ? (
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105 opacity-80 group-hover/card:opacity-100"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 border-b border-white/5" />
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              
              {/* Top Right Tag */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-neon-magenta)] rounded-md border border-[var(--color-neon-magenta)]/30">
                {post.tags?.[0]?.name || 'Vibe Coding'}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between relative bg-gradient-to-b from-transparent to-black/80">
              <div>
                <h3 className="text-lg font-bold mb-2 leading-tight text-zinc-100 group-hover/card:text-white transition-colors">{post.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{post.custom_excerpt}</p>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="block w-4 h-[1px] bg-zinc-700" />
                <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
