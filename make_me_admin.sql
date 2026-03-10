-- Run this script in your Supabase SQL Editor to make yourself an admin

UPDATE public.profiles
SET role = 'admin'
WHERE id = 'f448400f-17ba-4da3-ae59-e5c459a1f878';

-- Verify the update
SELECT name, email, role FROM public.profiles WHERE id = 'f448400f-17ba-4da3-ae59-e5c459a1f878';
