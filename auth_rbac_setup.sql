-- 1. Create the `profiles` table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create an admin check function to simplify RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  SELECT (role = 'admin') INTO is_admin FROM public.profiles WHERE id = auth.uid();
  RETURN COALESCE(is_admin, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger to automatically create a profile when a new user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    'user' -- Default role is user
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists to allow re-running this script cleanly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. RLS Policies for `profiles`
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- Users can update their own profile (name, avatar), but NOT their role
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can update any profile (including roles)
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- 5. Update RLS Polices for `posts`
-- First, enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to clean up from previous states)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.posts;
DROP POLICY IF EXISTS "Enable ALL access for anonymous users" ON public.posts;
DROP POLICY IF EXISTS "Public can read posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;

-- Everyone can read published articles (or all articles if you prefer for now)
CREATE POLICY "Public can read posts" ON public.posts
  FOR SELECT USING (true);

-- Only admins can insert, update, or delete posts
CREATE POLICY "Admins can insert posts" ON public.posts
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update posts" ON public.posts
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE USING (public.is_admin());

-- 6. Update RLS Policies for `categories`
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.categories;
DROP POLICY IF EXISTS "Enable ALL access for anonymous users" ON public.categories;
DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Public can read categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert categories" ON public.categories
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update categories" ON public.categories
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete categories" ON public.categories
  FOR DELETE USING (public.is_admin());

-- 7. Update RLS Policies for `advertisements`
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read ads" ON public.advertisements;
DROP POLICY IF EXISTS "Admins can insert ads" ON public.advertisements;
DROP POLICY IF EXISTS "Admins can update ads" ON public.advertisements;
DROP POLICY IF EXISTS "Admins can delete ads" ON public.advertisements;

CREATE POLICY "Public can read ads" ON public.advertisements
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert ads" ON public.advertisements
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update ads" ON public.advertisements
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete ads" ON public.advertisements
  FOR DELETE USING (public.is_admin());
