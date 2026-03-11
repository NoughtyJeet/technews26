import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BentoGrid, { BentoCard } from '@/components/layout/BentoGrid';
import { getPosts, getPostsByTag } from '@/lib/ghost';
import LiveTechPulse from '@/components/widgets/LiveTechPulse';
import GadgetVault from '@/components/widgets/GadgetVault';
import BentoFeed from '@/components/widgets/BentoFeed';
import YouTubeWidget from '@/components/widgets/YouTubeWidget';
import VibeCodingSlider from '@/components/widgets/VibeCodingSlider';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  let posts: any[] = [];
  let vibePosts: any[] = [];
  try {
    posts = await getPosts(5);
    vibePosts = await getPostsByTag('Vibe Coding', 3);
  } catch (error) {
    console.error('Home Page Fetch Error:', error);
  }

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
        <div className="mb-6">
          <LiveTechPulse />
        </div>

        <BentoGrid>
          {/* Featured Hero Post - 2 cols, 2 rows */}
          {posts && posts[0] ? (
            <BentoCard colSpan={2} rowSpan={2} className="min-h-[400px]">
              <Link href={`/post/${posts[0].slug}`} className="absolute inset-0 z-20">
                <span className="sr-only">Read Post</span>
              </Link>
              <div className="absolute inset-0">
                <Image
                  src={posts[0].feature_image || ''}
                  alt={posts[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  className="object-cover opacity-80"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8 pointer-events-none">
                <span className="bg-[var(--color-neon-purple)] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider shadow-[0_0_10px_rgba(176,38,255,0.5)]">
                  Breaking
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{posts[0].title}</h2>
                <p className="text-zinc-300 mb-4 line-clamp-2">{posts[0].custom_excerpt}</p>
              </div>
            </BentoCard>
          ) : (
            <BentoCard colSpan={2} rowSpan={2} className="min-h-[400px] flex items-center justify-center bg-zinc-900/50">
              <p className="text-zinc-500">No featured articles available.</p>
            </BentoCard>
          )}

          {/* Spline Gadget Vault */}
          <BentoCard colSpan={2} rowSpan={1}>
            <GadgetVault />
          </BentoCard>

          {/* YouTube Subscription Widget */}
          <BentoCard colSpan={2} rowSpan={1}>
            <YouTubeWidget />
          </BentoCard>

          {/* Quick Hits Bento Feed */}
          <BentoCard colSpan={1} rowSpan={2}>
            <BentoFeed />
          </BentoCard>

          {/* Other recent posts */}
          {posts && posts.length > 1 && posts.slice(1, 4).map((post: any) => (
            <BentoCard key={post.id} colSpan={1} rowSpan={1} className="p-6 flex flex-col justify-between min-h-[250px] relative">
              <Link href={`/post/${post.slug}`} className="absolute inset-0 z-20">
                <span className="sr-only">Read Post</span>
              </Link>
              {post.feature_image && (
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                  <Image src={post.feature_image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              )}
              <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                <span className="text-[var(--color-neon-cyan)] text-xs font-bold uppercase tracking-wider mb-2 block shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                  {post.tags?.[0]?.name || 'News'}
                </span>
                <div>
                  <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[var(--color-neon-cyan)] transition-colors">{post.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{post.custom_excerpt}</p>
                </div>
              </div>
            </BentoCard>
          ))}

          {/* Vibe Coding Slider */}
          {vibePosts && vibePosts.length > 0 && (
            <BentoCard colSpan={3} rowSpan={1} className="w-full flex p-0">
              <VibeCodingSlider posts={vibePosts} />
            </BentoCard>
          )}
        </BentoGrid>
      </main>
    </div>
  );
}
