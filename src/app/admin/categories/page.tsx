"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Tag, Trash2, Edit, Loader2, Save } from "lucide-react";

export default function AdminCategories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Categories on Mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            if (!supabase) return;
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name", { ascending: true });

            if (error) throw error;
            if (data) setCategories(data);
        } catch (err: any) {
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(
            newName
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "")
        );
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !slug) return alert("Name and Slug are required.");

        setIsSubmitting(true);

        try {
            if (!supabase) throw new Error("Supabase is not configured.");

            const payload = { name, slug, description };

            // Select the newly inserted row to return it
            const { data, error } = await supabase
                .from("categories")
                .insert([payload])
                .select()
                .single();

            if (error) throw error;

            // Update local state instantly instead of re-fetching everything
            if (data) {
                setCategories((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            }

            // Clear Form
            setName("");
            setSlug("");
            setDescription("");

        } catch (err: any) {
            alert("Error saving category: " + err.message);
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCategory = async (id: string, catName: string) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the category "${catName}"? This action cannot be undone.`);
        if (!isConfirmed) return;

        try {
            if (!supabase) throw new Error("Supabase is not configured.");

            const { error } = await supabase
                .from("categories")
                .delete()
                .eq("id", id);

            if (error) throw error;

            // Update local state by stripping out the deleted item
            setCategories((prev) => prev.filter((cat) => cat.id !== id));

        } catch (err: any) {
            alert("Error deleting category: " + err.message);
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                        Categories
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Organize your articles with categories and tags.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories List View */}
                <section className="md:col-span-2 glass rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-5 border-b border-white/10 flex items-center gap-2 bg-white/5">
                        <Tag className="w-4 h-4 text-[var(--color-neon-purple)]" />
                        <h2 className="font-bold">Active Categories</h2>
                    </div>
                    <div className="divide-y divide-white/5 relative min-h-[200px]">
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500">
                                No categories found. Use the quick add form.
                            </div>
                        ) : (
                            categories.map((category: any) => (
                                <div key={category.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                    <div>
                                        <h3 className="font-semibold text-lg text-white mb-1">{category.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                                            <span className="font-mono text-zinc-500">/{category.slug}</span>
                                            <span>•</span>
                                            <span className="line-clamp-1">{category.description || 'No description provided.'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-zinc-400 hover:text-[var(--color-neon-cyan)] bg-white/5 rounded-lg transition-colors" title="Edit coming soon">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id, category.name)}
                                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 bg-white/5 rounded-lg transition-colors"
                                            title="Delete Category"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Quick Add Form */}
                <section className="glass rounded-2xl border border-white/10 p-5 h-fit sticky top-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Plus className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                        <h2 className="font-bold">Quick Add</h2>
                    </div>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Category Name *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="e.g. Gaming"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">URL Slug *</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="e.g. gaming"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-zinc-300 focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Description</label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short description for SEO..."
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full bg-[var(--color-neon-purple)] text-white font-bold py-2.5 flex items-center justify-center gap-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSubmitting ? "Saving..." : "Save Category"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
