import GhostContentAPI from '@tryghost/content-api';
import { supabase } from './supabaseClient';

// Create API instance with site credentials
// Fallback to mocking if credentials aren't provided
export const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL || 'https://demo.ghost.io',
    key: process.env.GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062', // standard demo key
    version: "v5.0"
});

function mapRowToPost(row: any) {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        custom_excerpt: row.custom_excerpt ?? row.excerpt ?? null,
        feature_image: row.feature_image ?? row.featured_image ?? null,
        published_at: row.published_at,
        html: row.html ?? row.content ?? null,
        authors: row.author_name ? [{ name: row.author_name }] : [],
        tags: Array.isArray(row.tags)
            ? row.tags.map((name: string) => ({ name }))
            : [],
    };
}

export async function getPosts(limit = 10) {
    // 1) If Supabase is configured, try posts table then articles table
    if (supabase) {
        for (const table of ['posts', 'articles'] as const) {
            try {
                const cols = table === 'posts'
                    ? 'id, slug, title, custom_excerpt, feature_image, published_at, html, author_name, tags'
                    : 'id, slug, title, custom_excerpt, featured_image, published_at, content, author_name, tags';
                let query = supabase.from(table).select(cols).order('published_at', { ascending: false }).limit(limit);
                if (table === 'articles') {
                    query = query.eq('status', 'published');
                }
                const { data, error } = await query;

                if (!error && Array.isArray(data) && data.length > 0) {
                    return data.map((row: any) => mapRowToPost({
                        ...row,
                        html: row.html ?? row.content,
                        feature_image: row.feature_image ?? row.featured_image,
                    }));
                }
                if (error) console.error(`Supabase getPosts (${table}) error:`, error.message);
            } catch (e) {
                console.error(`Supabase getPosts (${table}) exception:`, e);
            }
        }
    }

    // 2) Fallback: Ghost or mock data
    if (!process.env.GHOST_API_URL) {
        return mockPosts();
    }

    try {
        return await api.posts
            .browse({
                limit,
                include: 'tags,authors',
            })
            .catch((err: any) => {
                console.error(err);
                return mockPosts();
            });
    } catch (error) {
        console.error(error);
        return mockPosts();
    }
}

export async function getPostsByTag(tag: string, limit = 10) {
    // 1) If Supabase is configured, try posts table then articles table
    if (supabase) {
        for (const table of ['posts', 'articles'] as const) {
            try {
                const cols = table === 'posts'
                    ? 'id, slug, title, custom_excerpt, feature_image, published_at, html, author_name, tags'
                    : 'id, slug, title, custom_excerpt, featured_image, published_at, content, author_name, tags';
                let query = supabase.from(table).select(cols).contains('tags', [tag]).order('published_at', { ascending: false }).limit(limit);
                if (table === 'articles') {
                    query = query.eq('status', 'published');
                }
                const { data, error } = await query;

                if (!error && Array.isArray(data) && data.length > 0) {
                    return data.map((row: any) => mapRowToPost({
                        ...row,
                        html: row.html ?? row.content,
                        feature_image: row.feature_image ?? row.featured_image,
                    }));
                }
                if (error) console.error(`Supabase getPostsByTag (${table}) error:`, error.message);
            } catch (e) {
                console.error(`Supabase getPostsByTag (${table}) exception:`, e);
            }
        }
    }

    // 2) Fallback: Ghost or mock data
    if (!process.env.GHOST_API_URL) {
        return mockPosts().filter(post => post.tags.some(t => t.name.toLowerCase() === tag.toLowerCase())).slice(0, limit);
    }

    try {
        return await api.posts
            .browse({
                limit,
                filter: `tag:${tag.toLowerCase()}`,
                include: 'tags,authors',
            })
            .catch((err: any) => {
                console.error(err);
                return mockPosts().filter(post => post.tags.some(t => t.name.toLowerCase() === tag.toLowerCase())).slice(0, limit);
            });
    } catch (error) {
        console.error(error);
        return mockPosts().filter(post => post.tags.some(t => t.name.toLowerCase() === tag.toLowerCase())).slice(0, limit);
    }
}

export async function getSinglePost(postSlug: string) {
    // 1) Supabase: try posts then articles
    if (supabase) {
        for (const table of ['posts', 'articles'] as const) {
            try {
                const cols = table === 'posts'
                    ? 'id, slug, title, custom_excerpt, feature_image, published_at, html, author_name, tags'
                    : 'id, slug, title, custom_excerpt, featured_image, published_at, content, author_name, tags';
                let query = supabase.from(table).select(cols).eq('slug', postSlug);
                if (table === 'articles') query = query.eq('status', 'published');
                const { data, error } = await query.maybeSingle();

                if (!error && data) {
                    const row: any = data;
                    return mapRowToPost({
                        ...row,
                        html: row.html ?? row.content,
                        feature_image: row.feature_image ?? row.featured_image,
                    });
                }
                if (error) console.error(`Supabase getSinglePost (${table}) error:`, error.message);
            } catch (e) {
                console.error(`Supabase getSinglePost (${table}) exception:`, e);
            }
        }
    }

    // 2) Fallback: Ghost or mock data
    if (!process.env.GHOST_API_URL) {
        return mockPosts().find(post => post.slug === postSlug) ?? null;
    }

    try {
        return await api.posts
            .read({
                slug: postSlug
            }, { include: 'tags,authors' })
            .catch((err: any) => {
                console.error(err);
                return mockPosts().find(post => post.slug === postSlug);
            });
    } catch (error) {
        console.error(error);
        return null;
    }
}

function mockPosts() {
    return [
        {
            id: "1",
            slug: "apple-vision-pro-2-leaks-2026",
            title: "Apple Vision Pro 2 Rumors: Lighter, Cheaper, and Arriving in 2026",
            custom_excerpt: "Is Apple preparing a more accessible AR/VR headset? Here is everything we know about the highly anticipated Vision Pro 2.",
            feature_image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date().toISOString(),
            html: "<h2>The Next Generation of Spatial Computing</h2><p>Apple's first foray into spatial computing was groundbreaking but came with a hefty price tag and significant weight. Rumors now suggest the <strong>Vision Pro 2</strong> is slated for late 2026, aiming to solve these very issues.</p><h3>What to Expect</h3><p>Industry insiders point to a 30% reduction in weight and a starting price closer to $2,000. This could finally push Apple's mixed reality ambitions into the mainstream.</p><h2>FAQ: Vision Pro 2</h2><h3>When will the Vision Pro 2 be released?</h3><p>Current leaks suggest a late 2026 announcement with early 2027 availability.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Apple" }, { name: "Hardware" }, { name: "Leaks" }]
        },
        {
            id: "2",
            slug: "iphone-18-ultra-redesign",
            title: "iPhone 18 Ultra: The Biggest Redesign in a Decade?",
            custom_excerpt: "Forget the iPhone 17; rumors say the iPhone 18 Ultra will completely reimagine the smartphone form factor.",
            feature_image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 86400000).toISOString(),
            html: "<h2>Embracing the Ultra</h2><p>The tech world is already looking past the upcoming iPhone generation to what could be Apple's true next leap: the <strong>iPhone 18 Ultra</strong>. Whispers from the supply chain hint at a seamless, portless design and an under-display camera.</p><h3>Revolutionary Thermal Design</h3><p>With AI computations happening on-device, heat management is critical. The Ultra is rumored to feature an all-new graphene cooling system, allowing sustained peak performance.</p><h2>FAQ: iPhone 18 Ultra</h2><h3>Will it have a port?</h3><p>Many analysts believe the Ultra will be Apple's first completely portless iPhone, relying entirely on MagSafe for charging and data transfer.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Apple" }, { name: "Leaks" }]
        },
        {
            id: "3",
            slug: "claude-3-5-opus-vs-gemini-2",
            title: "Claude 3.5 Opus vs Gemini 1.5 Pro: Which AI Claims the Throne?",
            custom_excerpt: "A deep dive benchmark comparison of the two leading large language models in coding, reasoning, and creative writing.",
            feature_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 172800000).toISOString(),
            html: "<h2>The AI Arms Race Heats Up</h2><p>In the rapidly evolving landscape of artificial intelligence, two titans are currently battling for supremacy: Anthropic's <strong>Claude 3.5 Opus</strong> and Google's <strong>Gemini 1.5 Pro</strong>.</p><h3>Coding and Reasoning Benchmarks</h3><p>When put to the test in complex algorithmic challenges, both models perform exceptionally well, but Claude shows a slight edge in zero-shot code generation, whereas Gemini dominates in massive context-window retrieval tasks.</p><h2>FAQ: Leading AI Models</h2><h3>Which model is better for coding?</h3><p>While both are excellent, many developers currently prefer Claude 3.5 Opus for complex architectural coding tasks.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "AI" }]
        },
        {
            id: "4",
            slug: "local-ai-models-laptops-2026",
            title: "Why Local AI Models Will Dominate Laptops in 2026",
            custom_excerpt: "Cloud AI is expensive and slow. The future is running massive open-weight models locally on your NPU-equipped laptop.",
            feature_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 259200000).toISOString(),
            html: "<h2>The Shift From Cloud to Edge</h2><p>As privacy concerns and cloud API costs rise, developers and power users are turning to local AI. By 2026, the standard for a \"Pro\" laptop will be its ability to run a 30B parameter model locally.</p><h3>The Importance of NPUs</h3><p>Neural Processing Units (NPUs) are becoming as critical as GPUs. These specialized chips allow continuous AI execution without draining the battery or causing extreme thermal throttling.</p><h2>FAQ: Local AI Execution</h2><h3>Do I need a GPU to run local AI?</h3><p>While GPUs are currently best, modern NPUs (like Apple's Neural Engine or Qualcomm's Hexagon) are rapidly closing the gap for inference tasks.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "AI" }, { name: "Hardware" }]
        },
        {
            id: "5",
            slug: "snapdragon-x-elite-gen-2",
            title: "Snapdragon X Elite Gen 2: The True MacBook Killer?",
            custom_excerpt: "Qualcomm is returning with a vengeance. The second generation of their ARM PC chips promises desktop-class performance with incredible battery life.",
            feature_image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 345600000).toISOString(),
            html: "<h2>Windows on ARM is Finally Here to Stay</h2><p>The first Snapdragon X Elite proved that Windows could thrive on ARM architecture. The upcoming <strong>Gen 2</strong> aims to completely dethrone Apple's M-series chips in both efficiency and raw multi-core power.</p><h3>Emulation Enhancements</h3><p>Microsoft's Prism emulation layer, paired with the new silicon, promises near-native performance for legacy x86 applications, removing the final barrier for PC users.</p><h2>FAQ: Windows on ARM</h2><h3>Can I game on Snapdragon X Elite Gen 2?</h3><p>Yes, significant improvements to the Adreno GPU and emulation translation make lightweight and even some AAA gaming viable on these thin-and-light machines.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Hardware" }, { name: "MWC" }]
        },
        {
            id: "6",
            slug: "solid-state-batteries-ev-phones",
            title: "Solid-State Batteries: Ready for Phones Before EVs?",
            custom_excerpt: "The revolutionary battery tech might hit your pocket before it hits your driveway. Here is why smartphone manufacturers are accelerating adaptation.",
            feature_image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 432000000).toISOString(),
            html: "<h2>A Paradigm Shift in Energy Density</h2><p>We've been hearing about solid-state batteries for EVs for years, but manufacturing them at scale is difficult. Conversely, the smaller cells required for smartphones might be the perfect proving ground.</p><h3>What This Means for Daily Use</h3><p>Imagine a smartphone that is thinner than ever but packs a 7000mAh equivalent battery that charges from 0 to 100% in under 10 minutes without degrading over 5 years.</p><h2>FAQ: Solid-State Batteries</h2><h3>When will the first solid-state battery phone release?</h3><p>Several major Android OEMs are teasing very limited releases of ultra-premium devices featuring solid-state cells by late 2026 or early 2027.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Hardware" }]
        },
        {
            id: "7",
            slug: "nvidia-rtx-5090-leaked-specs",
            title: "Nvidia RTX 5090 Leaked Specs: A Power-Hungry Monster",
            custom_excerpt: "The upcoming Blackwell consumer GPU flagship is reportedly drawing up to 600W. Is the performance leap worth the massive power draw?",
            feature_image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 518400000).toISOString(),
            html: "<h2>Pushing the Limits of Silicon</h2><p>As Nvidia prepares to launch its next generation of consumer graphics cards, leakers have shed light on the flagship <strong>RTX 5090</strong>. The numbers are staggering.</p><h3>The Price of Performance</h3><p>With an estimated 600W TDP and an enormous 4-slot cooler, this GPU is not for the faint of heart (or those with small power supplies). However, rumored performance bounds suggest an 80% uplift over the 4090 in path-traced titles.</p><h2>FAQ: RTX 5090</h2><h3>Do I need a new power supply?</h3><p>If you have less than a 1000W high-quality PSU, an upgrade is highly recommended before slotting in a 5090.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Nvidia" }, { name: "Leaks" }]
        },
        {
            id: "8",
            slug: "nvidia-custom-arm-cpu",
            title: "Is Nvidia Building a Custom ARM CPU for PCs?",
            custom_excerpt: "Recent reports suggest Nvidia is partnering with MediaTek to build a PC processor to challenge Intel, AMD, and Apple.",
            feature_image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 604800000).toISOString(),
            html: "<h2>The Ultimate Integrated Platform</h2><p>Nvidia already dominates the AI and GPU markets, but a massive void remains: the central processor. Rumors indicate a collaboration with MediaTek to produce a robust ARM-based CPU for consumer and commercial PCs.</p><h3>Synergy with RTX</h3><p>A unified architecture featuring a custom Nvidia CPU and an integrated high-performance GeForce RTX GPU could redefine the modern high-end laptop, similar to how Apple unified its ecosystem with M-series chips.</p><h2>FAQ: Nvidia CPU Rumors</h2><h3>When would an Nvidia CPU launch?</h3><p>Analysts project an official announcement by early 2026, with consumer devices arriving later that year.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Nvidia" }]
        },
        {
            id: "vc1",
            slug: "vibe-coding-frontend-future",
            title: "Vibe Coding: The Future of Frontend Development",
            custom_excerpt: "Forget writing boilerplate HTML and CSS. Vibe coding allows you to generate complete user interfaces by simply describing what you want.",
            feature_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date().toISOString(),
            html: "<h2>What is Vibe Coding?</h2><p>Vibe coding is the practice of using AI tools to generate code based on natural language descriptions or visual references.</p><h3>The Impact on Frontend</h3><p>This approach drastically reduces the time spent on mundane tasks, allowing developers to focus on architecture and complex logic.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Vibe Coding" }, { name: "AI" }]
        },
        {
            id: "vc2",
            slug: "mastering-prompt-engineering-vibe-coding",
            title: "Mastering Prompt Engineering for Vibe Coding",
            custom_excerpt: "The secret to successful vibe coding lies in the prompt. Learn how to craft perfect descriptions to get exactly the UI you envision.",
            feature_image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 86400000).toISOString(),
            html: "<h2>The Art of the Prompt</h2><p>When vibe coding, your words are your compiler. Being specific about layout constraints, color palettes, and interactive states is crucial.</p><h3>Iterative Refinement</h3><p>Don't expect perfection on the first try. The key is iterative refinement, adjusting your prompt based on the AI's output.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Vibe Coding" }, { name: "Tutorials" }]
        },
        {
            id: "vc3",
            slug: "top-5-vibe-coding-tools-2026",
            title: "Top 5 Tools for Vibe Coding in 2026",
            custom_excerpt: "A comprehensive roundup of the best AI-powered development environments that support true vibe coding workflows.",
            feature_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
            published_at: new Date(Date.now() - 172800000).toISOString(),
            html: "<h2>The Toolscape is Evolving</h2><p>We evaluate the latest contenders in the AI IDE space, focusing on their ability to understand context and generate production-ready code.</p><h3>Our Top Picks</h3><p>From visual builders to terminal-integrated agents, here are the tools leading the vibe coding revolution.</p>",
            authors: [{ name: "Tech Hunter AI" }],
            tags: [{ name: "Vibe Coding" }, { name: "Tools" }]
        }
    ];
}