-- =================================================================================
-- TECHNEWS26 RLS FIX SCRIPT
-- Run this script in your Supabase SQL Editor to ensure public read access
-- to your categories and posts tables.
-- =================================================================================

-- 1. Fix Categories Table RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts (optional but safer)
DROP POLICY IF EXISTS "Public Categories are Viewable" ON public.categories;
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;

-- Create a definitive policy allowing ANYONE to read categories
CREATE POLICY "Public can view categories" 
ON public.categories 
FOR SELECT 
USING (true);


-- 2. Fix Posts Table RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Posts are Viewable" ON public.posts;
DROP POLICY IF EXISTS "Public can view posts" ON public.posts;
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;

-- Create a definitive policy allowing ANYONE to read posts
CREATE POLICY "Public can view posts" 
ON public.posts 
FOR SELECT 
USING (true);


-- 3. (Optional) Allow Anonymous Inserts for Admin Panel Testing
-- REMOVE THIS OR SECURE IT before going to production!
DROP POLICY IF EXISTS "Anon can insert posts" ON public.posts;
CREATE POLICY "Anon can insert posts"
ON public.posts
FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can insert categories" ON public.categories;
CREATE POLICY "Anon can insert categories"
ON public.categories
FOR ALL
USING (true)
WITH CHECK (true);


SELECT 'RLS Policies updated successfully!' AS status;
