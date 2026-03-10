import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export const supabase = (function () {
  try {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    }
  } catch (e) {
    console.error("Supabase Client Init Error:", e)
  }
  return null;
})();

