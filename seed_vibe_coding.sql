-- Run this script in your Supabase SQL Editor to insert Vibe Coding blog posts.

INSERT INTO public.posts (slug, title, custom_excerpt, feature_image, published_at, html, author_name, tags)
VALUES
(
  'vibe-coding-frontend-future', 
  'Vibe Coding: The Future of Frontend Development', 
  'Forget writing boilerplate HTML and CSS. Vibe coding allows you to generate complete user interfaces by simply describing what you want.', 
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200', 
  NOW(), 
  '<h2>What is Vibe Coding?</h2><p>Vibe coding is the practice of using AI tools to generate code based on natural language descriptions or visual references.</p><h3>The Impact on Frontend</h3><p>This approach drastically reduces the time spent on mundane tasks, allowing developers to focus on architecture and complex logic.</p>', 
  'Tech Hunter AI', 
  ARRAY['Vibe Coding', 'AI']
),
(
  'mastering-prompt-engineering-vibe-coding', 
  'Mastering Prompt Engineering for Vibe Coding', 
  'The secret to successful vibe coding lies in the prompt. Learn how to craft perfect descriptions to get exactly the UI you envision.', 
  'https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&q=80&w=1200', 
  NOW() - INTERVAL '1 day', 
  '<h2>The Art of the Prompt</h2><p>When vibe coding, your words are your compiler. Being specific about layout constraints, color palettes, and interactive states is crucial.</p><h3>Iterative Refinement</h3><p>Don''t expect perfection on the first try. The key is iterative refinement, adjusting your prompt based on the AI''s output.</p>', 
  'Tech Hunter AI', 
  ARRAY['Vibe Coding', 'Tutorials']
),
(
  'top-5-vibe-coding-tools-2026', 
  'Top 5 Tools for Vibe Coding in 2026', 
  'A comprehensive roundup of the best AI-powered development environments that support true vibe coding workflows.', 
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200', 
  NOW() - INTERVAL '2 days', 
  '<h2>The Toolscape is Evolving</h2><p>We evaluate the latest contenders in the AI IDE space, focusing on their ability to understand context and generate production-ready code.</p><h3>Our Top Picks</h3><p>From visual builders to terminal-integrated agents, here are the tools leading the vibe coding revolution.</p>', 
  'Tech Hunter AI', 
  ARRAY['Vibe Coding', 'Tools']
);
