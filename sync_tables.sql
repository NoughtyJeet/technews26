-- =================================================================================
-- TECHNEWS26 SYNC SCRIPT
-- Run this script in your Supabase SQL Editor to create and populate the tables
-- required for the Admin Panel (Categories, Advertisements, Site Settings).
-- =================================================================================

-- --------------------------------------------------------
-- 1. CATEGORIES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional, purely best practice)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Categories are Viewable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (true); -- Replace 'true' with your admin policy

-- Insert Initial Categories
INSERT INTO public.categories (name, slug, description)
VALUES 
    ('Apple', 'apple', 'iOS, macOS, and Apple Hardware News'),
    ('AI', 'ai', 'Artificial Intelligence and Machine Learning'),
    ('Hardware', 'hardware', 'Chips, PCs, and General Tech Hardware'),
    ('Nvidia', 'nvidia', 'GPUs and Enterprise Compute'),
    ('Mobile', 'mobile', 'Smartphones, Tablets, and 5G Technology')
ON CONFLICT (slug) DO NOTHING;


-- --------------------------------------------------------
-- 2. ADVERTISEMENTS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    device TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    impressions TEXT DEFAULT '0',
    ctr TEXT DEFAULT '0%',
    revenue TEXT DEFAULT '$0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Ads are Viewable" ON public.advertisements FOR SELECT USING (true);
CREATE POLICY "Admins can insert ads" ON public.advertisements FOR INSERT WITH CHECK (true);

-- Insert Initial Advertisement Placements
INSERT INTO public.advertisements (name, type, device, status, impressions, ctr, revenue)
VALUES 
    ('Homepage Hero Banner', 'Display Ad', 'Desktop & Mobile', 'Active', '1.2M', '2.4%', '$3,450'),
    ('Sidebar Sticky Square', 'Responsive Element', 'Desktop Only', 'Active', '850K', '1.1%', '$1,120'),
    ('In-Article Native Placement', 'Native Ad', 'Desktop & Mobile', 'Paused', '0', '0%', '$0')
;


-- --------------------------------------------------------
-- 3. SITE SETTINGS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Settings are Viewable by Everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can alter settings" ON public.site_settings FOR ALL USING (true);

-- Insert Initial Site Settings
INSERT INTO public.site_settings (setting_key, setting_value, description)
VALUES 
    ('site_title', 'technews26', 'The global title of the publication used in the navigation bar.'),
    ('site_description', 'Curated tech news, leaks, and deep dives into the future of computing, AI, and Apple.', 'The default SEO meta description for the homepage.'),
    ('publication_language', 'en', 'Primary language code for the site (used in HTML tags).'),
    ('google_analytics_id', '', 'Your G-XXXXXXXXX tag id for analytics tracking.'),
    ('search_engine_visibility', 'true', 'Boolean to allow or disallow robots from indexing the site.'),
    ('social_twitter', 'https://x.com/technews26', 'Link to official X/Twitter profile.'),
    ('social_youtube', 'https://youtube.com/@technews26', 'Link to official YouTube Channel.'),
    ('social_instagram', '', 'Link to official Instagram profile.')
ON CONFLICT (setting_key) DO UPDATE SET 
    setting_value = EXCLUDED.setting_value;


-- SUCCESS NOTIFICATION
SELECT 'Tables created and mock data synchronized successfully!' AS status;
