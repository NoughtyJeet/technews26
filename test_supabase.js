const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, published_at, author_name')
        .order('published_at', { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
    } else {
        console.log("Successfully fetched posts. Count:", data ? data.length : 0);
        console.log(data);
    }
}

test();
