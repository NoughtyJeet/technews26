import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tgcbpgclavhvzaedwmya.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnY2JwZ2NsYXZodnphZWR3bXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTkxMjgsImV4cCI6MjA4ODczNTEyOH0.e_r0reDFC8_oeqf-bufiYsnmjdA9QxVUT0NZIYnvmX4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkPosts() {
    console.log("Checking Supabase posts...");
    const { data, error } = await supabase.from('posts').select('*').limit(5);
    if (error) {
        console.error("Error fetching posts:", error);
    } else {
        console.log("Posts found:", data?.length || 0);
        if (data && data.length > 0) {
            console.log("Sample post:", data[0].title);
        }
    }
}

checkPosts();
