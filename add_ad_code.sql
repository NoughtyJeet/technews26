-- =================================================================================
-- TECHNEWS26 AD CODE SCRIPT
-- Run this single line in your Supabase SQL Editor to add the 'ad_code' column.
-- =================================================================================

ALTER TABLE public.advertisements ADD COLUMN IF NOT EXISTS ad_code TEXT;

SELECT 'Ad Code column added successfully!' AS status;
