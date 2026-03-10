import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
        }

        const { data, error } = await supabase
            .from('posts')
            .select('id, slug, title, published_at, author_name')
            .order('published_at', { ascending: false });

        return NextResponse.json({ data, error });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
