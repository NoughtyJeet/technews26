"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Megaphone, Plus, Monitor, Smartphone, LayoutTemplate, Loader2, Save, Trash2 } from "lucide-react";

export default function AdminAds() {
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [isAddingAd, setIsAddingAd] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [type, setType] = useState("Display Ad");
    const [device, setDevice] = useState("Desktop & Mobile");
    const [adCode, setAdCode] = useState("");

    // Fetch Ads on Mount
    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            if (!supabase) return;
            const { data, error } = await supabase
                .from("advertisements")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            if (data) setAds(data);
        } catch (err: any) {
            console.error("Error fetching advertisements:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return alert("Ad Name is required.");

        setIsSubmitting(true);

        try {
            if (!supabase) throw new Error("Supabase is not configured.");

            const payload = {
                name,
                type,
                device,
                ad_code: adCode,
                status: 'Active',
                impressions: '0',
                ctr: '0%',
                revenue: '$0'
            };

            // Select the newly inserted row to return it
            const { data, error } = await supabase
                .from("advertisements")
                .insert([payload])
                .select()
                .single();

            if (error) throw error;

            // Update local state instantly 
            if (data) {
                setAds((prev) => [data, ...prev]);
            }

            // Clean up UI & Form
            setIsAddingAd(false);
            setName("");
            setType("Display Ad");
            setDevice("Desktop & Mobile");
            setAdCode("");

        } catch (err: any) {
            alert("Error saving advertisement: " + err.message);
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAd = async (id: string, adName: string) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the placement "${adName}"?`);
        if (!isConfirmed) return;

        try {
            if (!supabase) throw new Error("Supabase is not configured.");

            const { error } = await supabase
                .from("advertisements")
                .delete()
                .eq("id", id);

            if (error) throw error;

            // Update local state by stripping out the deleted item
            setAds((prev) => prev.filter((ad) => ad.id !== id));

        } catch (err: any) {
            alert("Error deleting advertisement: " + err.message);
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-3">
                        Advertisements
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Manage banner placements, custom ad scripts, and monetization.
                    </p>
                </div>
                <button
                    onClick={() => setIsAddingAd(!isAddingAd)}
                    className="bg-[var(--color-neon-cyan)] text-black px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                >
                    <Plus className={`w-4 h-4 transition-transform duration-200 ${isAddingAd ? 'rotate-45' : ''}`} />
                    {isAddingAd ? 'Cancel' : 'New Placement'}
                </button>
            </header>

            {/* Ad Network Integrations Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100" />
                    <div>
                        <h3 className="text-sm font-bold text-zinc-300">Google AdSense</h3>
                        <p className="text-xs text-zinc-500 mt-1">Primary Network</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-emerald-400">Connected</span>
                    </div>
                </div>

                <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100" />
                    <div>
                        <h3 className="text-sm font-bold text-zinc-300">Carbon Ads</h3>
                        <p className="text-xs text-zinc-500 mt-1">Developer Network</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <span className="text-zinc-500">Not Configured</span>
                    </div>
                </div>

                <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100" />
                    <div>
                        <h3 className="text-sm font-bold text-zinc-300">Direct Sponsorships</h3>
                        <p className="text-xs text-zinc-500 mt-1">Custom Banners</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-emerald-400">1 Active</span>
                    </div>
                </div>
            </section>

            {/* Quick Add Form Overlay */}
            {isAddingAd && (
                <section className="glass rounded-2xl border border-[var(--color-neon-cyan)]/30 p-5 bg-[var(--color-neon-cyan)]/5 animate-in slide-in-from-top-4 fade-in duration-200">
                    <form onSubmit={handleAddAd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label className="block text-xs uppercase tracking-wider text-[var(--color-neon-cyan)] mb-2">Placement Name *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Article Footer"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-xs uppercase tracking-wider text-[var(--color-neon-cyan)] mb-2">Ad Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none"
                            >
                                <option>Display Ad</option>
                                <option>Native Ad</option>
                                <option>Responsive Element</option>
                                <option>Sponsorship</option>
                            </select>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-xs uppercase tracking-wider text-[var(--color-neon-cyan)] mb-2">Target Device</label>
                            <select
                                value={device}
                                onChange={(e) => setDevice(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none"
                            >
                                <option>Desktop & Mobile</option>
                                <option>Desktop Only</option>
                                <option>Mobile Only</option>
                            </select>
                        </div>
                        <div className="md:col-span-4 mt-4">
                            <label className="block text-xs uppercase tracking-wider text-[var(--color-neon-cyan)] mb-2">Ad Code (HTML/JS)</label>
                            <textarea
                                value={adCode}
                                onChange={(e) => setAdCode(e.target.value)}
                                placeholder="<!-- Paste your AdSense, Carbon, or custom HTML script here -->"
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-zinc-300 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors resize-y"
                            />
                            <p className="text-xs text-zinc-500 mt-2">
                                Warning: Do not share raw placement codes publicly.
                            </p>
                        </div>
                        <div className="md:col-span-1 md:col-start-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[var(--color-neon-cyan)] text-black font-bold py-2 px-4 flex items-center justify-center gap-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 h-[38px]"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* Placements Table */}
            <section className="glass rounded-2xl border border-white/10 overflow-hidden text-sm">
                <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                        <h2 className="font-bold">Active Placements</h2>
                    </div>
                </div>

                <div className="overflow-x-auto relative min-h-[200px]">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                        </div>
                    ) : ads.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 py-12">
                            <Megaphone className="w-8 h-8 mb-2 opacity-20" />
                            <p>No ad placements created yet.</p>
                            <button
                                onClick={() => setIsAddingAd(true)}
                                className="mt-4 text-[var(--color-neon-cyan)] hover:underline text-xs font-semibold"
                            >
                                + Create your first placement
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="border-b border-white/10 text-xs text-zinc-400 uppercase tracking-wider bg-black/20">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Placement Name</th>
                                    <th className="px-6 py-4 font-semibold">Device</th>
                                    <th className="px-6 py-4 font-semibold">Impressions (30d)</th>
                                    <th className="px-6 py-4 font-semibold">CTR</th>
                                    <th className="px-6 py-4 font-semibold">Est. Revenue</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {ads.map((ad) => (
                                    <tr key={ad.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-white mb-1 whitespace-nowrap">{ad.name}</p>
                                            <p className="text-xs text-zinc-500 flex items-center gap-1">{ad.type}</p>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            <div className="flex items-center gap-2">
                                                {ad.device.includes("Desktop") && <Monitor className="w-4 h-4" />}
                                                {ad.device.includes("Mobile") && <Smartphone className="w-4 h-4" />}
                                                <span className="text-xs sr-only">{ad.device}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-zinc-300">{ad.impressions}</td>
                                        <td className="px-6 py-4 font-mono text-zinc-300">{ad.ctr}</td>
                                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">{ad.revenue}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${ad.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                                }`}>
                                                {ad.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDeleteAd(ad.id, ad.name)}
                                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete Placement"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}
