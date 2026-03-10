"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Save,
  Image as ImageIcon,
  Link as LinkIcon,
  Youtube,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Code,
  Eye,
  Edit3
} from "lucide-react";

export default function NewArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };

  // Editor Actions
  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById("editorContent") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const newText = currentText.substring(0, start) + textToInsert + currentText.substring(end);
    setContent(newText);

    // Reset focus and cursor position after React re-renders
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  const wrapTextAtCursor = (prefix: string, suffix: string) => {
    const textarea = document.getElementById("editorContent") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = prefix + selectedText + suffix;

    insertTextAtCursor(replacement);
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      wrapTextAtCursor(`<a href="${url}" target="_blank" rel="noopener noreferrer" className="text-[var(--color-neon-cyan)] hover:underline">`, '</a>');
    }
  };

  const handleImage = () => {
    const url = prompt("Enter the Image URL (e.g. Unsplash URL):");
    if (url) {
      const alt = prompt("Enter image description (alt text):") || "Article Image";
      insertTextAtCursor(`\n<img src="${url}" alt="${alt}" className="w-full h-auto rounded-xl my-6 border border-white/10" />\n`);
    }
  };

  const handleYoutube = () => {
    const url = prompt("Enter the YouTube Video URL (e.g. https://www.youtube.com/watch?v=XXXXXX):");
    if (url) {
      // Extract video ID safely
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (videoId) {
        insertTextAtCursor(
          `\n<div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
    <iframe src="https://www.youtube.com/embed/${videoId}" className="absolute top-0 left-0 w-full h-full" allowFullScreen></iframe>
</div>\n`
        );
      } else {
        alert("Invalid YouTube URL");
      }
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      alert("Title, Slug, and Content are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        slug,
        custom_excerpt: excerpt,
        feature_image: featureImage,
        html: content,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        author_name: "Admin User", // Alternatively get from auth session
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (!supabase) throw new Error("Supabase is not configured.");

      const { error } = await supabase.from("posts").insert([payload]);

      if (error) throw error;

      alert("Article saved successfully!");
      router.push("/admin/articles");
      router.refresh();
    } catch (err: any) {
      alert("Error saving article: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Create Article
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Write, preview, and publish a new post.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/articles')}
            className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[var(--color-neon-purple)] text-white px-5 py-2.5 flex items-center gap-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Article"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass p-6 rounded-2xl border border-white/10 space-y-5">
            <div>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Article Title..."
                className="w-full bg-transparent text-3xl font-bold text-white placeholder:text-zinc-600 focus:outline-none border-none p-0"
              />
            </div>

            {/* HTML Editor Toolbar */}
            <div className="flex flex-wrap items-center gap-2 py-3 border-y border-white/10 bg-black/20 px-2 rounded-xl">
              <button onClick={() => wrapTextAtCursor("<strong>", "</strong>")} title="Bold" className="p-2 hover:bg-white/10 text-zinc-300 rounded-lg transition-colors"><Bold className="w-4 h-4" /></button>
              <button onClick={() => wrapTextAtCursor("<em>", "</em>")} title="Italic" className="p-2 hover:bg-white/10 text-zinc-300 rounded-lg transition-colors"><Italic className="w-4 h-4" /></button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <button onClick={() => wrapTextAtCursor("<h2>", "</h2>")} title="Heading 2" className="p-2 hover:bg-white/10 text-zinc-300 rounded-lg transition-colors"><Heading2 className="w-4 h-4" /></button>
              <button onClick={() => wrapTextAtCursor("<h3>", "</h3>")} title="Heading 3" className="p-2 hover:bg-white/10 text-zinc-300 rounded-lg transition-colors"><Heading3 className="w-4 h-4" /></button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <button onClick={handleLink} title="Insert Link" className="p-2 hover:bg-[var(--color-neon-cyan)]/20 text-zinc-300 hover:text-[var(--color-neon-cyan)] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold pr-3"><LinkIcon className="w-4 h-4" /> Link</button>
              <button onClick={handleImage} title="Insert Featured Image" className="p-2 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold pr-3"><ImageIcon className="w-4 h-4" /> Image</button>
              <button onClick={handleYoutube} title="Insert YouTube Video" className="p-2 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold pr-3"><Youtube className="w-4 h-4" /> YouTube</button>

              <div className="flex-1" />
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`p-2 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-colors ${previewMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {previewMode ? 'Edit Mode' : 'Live Preview'}
              </button>
            </div>

            {/* Editor Textarea / Preview */}
            <div className="min-h-[400px]">
              {previewMode ? (
                // Live HTML Preview
                <div
                  className="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-[var(--color-neon-cyan)] p-4 bg-black/40 rounded-xl border border-white/5 min-h-[400px]"
                  dangerouslySetInnerHTML={{ __html: content || '<p class="text-zinc-500 italic">No content yet...</p>' }}
                />
              ) : (
                // Raw HTML Editor
                <textarea
                  id="editorContent"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article here using HTML or use the toolbar buttons to format your text. e.g. <p>Hello world!</p>"
                  className="w-full h-full min-h-[400px] bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 font-mono focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors resize-y leading-relaxed"
                />
              )}
            </div>
            {!previewMode && (
              <p className="text-xs text-zinc-500 flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> HTML syntax is fully supported and recommended for custom embeds.</p>
            )}
          </section>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <section className="glass p-5 rounded-2xl border border-white/10 space-y-4">
            <h2 className="font-bold border-b border-white/10 pb-3">Publishing</h2>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. apple-vision-pro-2"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors font-mono"
              />
            </div>
          </section>

          <section className="glass p-5 rounded-2xl border border-white/10 space-y-4">
            <h2 className="font-bold border-b border-white/10 pb-3">Media & SEO</h2>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Featured Image URL</label>
              <input
                type="text"
                value={featureImage}
                onChange={(e) => setFeatureImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:outline-none transition-colors"
              />
              {featureImage && (
                <div className="mt-3 aspect-video w-full rounded-lg overflow-hidden border border-white/10 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featureImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">SEO Excerpt</label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short description for search results..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Tags (Comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Apple, Hardware, Leaks"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:outline-none transition-colors"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
