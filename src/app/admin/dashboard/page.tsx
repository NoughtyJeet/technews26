import { supabase } from "@/lib/supabaseClient";

export const dynamic = 'force-dynamic';

async function getStats() {
  if (!supabase) return null;

  const [articles, categories, users] = await Promise.all([
    supabase.from("posts").select("id"),
    supabase.from("categories").select("id"),
    supabase.from("profiles").select("id"),
  ]);

  const totalArticles = articles.data?.length ?? 0;
  // Since there is no 'status' column, we assume all are published
  const publishedArticles = totalArticles;
  const draftArticles = 0;

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    totalCategories: categories.data?.length ?? 0,
    totalUsers: users.data?.length ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          High-level overview of your technews26 publication.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl border border-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">
            Total Articles
          </p>
          <p className="text-3xl font-bold">
            {stats ? stats.totalArticles : "—"}
          </p>
        </div>
        <div className="glass rounded-2xl border border-emerald-500/30 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">
            Published
          </p>
          <p className="text-3xl font-bold text-emerald-400">
            {stats ? stats.publishedArticles : "—"}
          </p>
        </div>
        <div className="glass rounded-2xl border border-yellow-500/30 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">
            Drafts
          </p>
          <p className="text-3xl font-bold text-yellow-300">
            {stats ? stats.draftArticles : "—"}
          </p>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">
            Categories
          </p>
          <p className="text-3xl font-bold">
            {stats ? stats.totalCategories : "—"}
          </p>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">
            Users
          </p>
          <p className="text-3xl font-bold">
            {stats ? stats.totalUsers : "—"}
          </p>
        </div>
      </section>

      <section className="glass rounded-2xl border border-white/10 p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">
          Traffic
        </p>
        <p className="text-sm text-zinc-400">
          Traffic charts and analytics will appear here once you connect your
          analytics provider.
        </p>
      </section>
    </div>
  );
}

