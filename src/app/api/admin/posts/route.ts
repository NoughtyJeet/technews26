import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  if (!supabase) {
    // Fallback: mirror the public getPosts behaviour so the UI still works
    const { getPosts } = await import("@/lib/ghost");
    const posts = await getPosts(20);
    return Response.json(posts);
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, custom_excerpt, feature_image, published_at")
    .order("published_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Admin posts GET error:", error);
    return new Response("Failed to load posts", { status: 500 });
  }

  return Response.json(data ?? []);
}

