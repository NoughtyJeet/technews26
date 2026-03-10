import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminArticles() {
    // Fetch posts from Supabase directly for the admin panel
    let articles: any[] = [];

    if (supabase) {
        const { data, error } = await supabase
            .from("posts")
            .select("id, slug, title, published_at, author_name")
            .order("published_at", { ascending: false });

        if (error) {
            console.error("AdminArticles Supabase error:", error);
        } else if (data) {
            console.log("AdminArticles fetched data length:", data.length);
            articles = data;
        }
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                        Articles
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Manage your publication's content and drafts.
                    </p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="bg-white text-black px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Article
                </Link>
            </header>

            <section className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/10 uppercase text-xs tracking-wider text-zinc-400">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Author</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        No articles found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article: any) => (
                                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-white mb-1 line-clamp-1">{article.title}</p>
                                            <p className="text-xs text-zinc-500">/{article.slug}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {article.status || 'Published'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {article.author_name || 'Admin'}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            {new Date(article.published_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={'/post/' + article.slug}
                                                    target="_blank"
                                                    className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg transition-colors"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button className="p-2 text-zinc-400 hover:text-[var(--color-neon-cyan)] bg-white/5 rounded-lg transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-zinc-400 hover:text-red-400 bg-white/5 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
