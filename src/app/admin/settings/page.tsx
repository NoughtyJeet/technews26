import { Settings, Save, Globe, Share2, Search } from "lucide-react";

export default function AdminSettings() {
    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                        Site Settings
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Configure global SEO, branding, and publication rules.
                    </p>
                </div>
                <button className="bg-[var(--color-neon-purple)] text-white px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings Column */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="glass p-6 rounded-2xl border border-white/10 space-y-6">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <Globe className="w-5 h-5 text-[var(--color-neon-cyan)]" />
                            <h2 className="text-lg font-bold">General</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Site Title</label>
                                <input
                                    type="text"
                                    defaultValue="technews26"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Site Description</label>
                                <textarea
                                    rows={3}
                                    defaultValue="Curated tech news, leaks, and deep dives into the future of computing, AI, and Apple."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors resize-none"
                                />
                                <p className="text-xs text-zinc-500 mt-2">Used for the default meta description.</p>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Publication Language</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none">
                                    <option value="en">English (US)</option>
                                    <option value="en-gb">English (UK)</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="glass p-6 rounded-2xl border border-white/10 space-y-6">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <Search className="w-5 h-5 text-[var(--color-neon-purple)]" />
                            <h2 className="text-lg font-bold">SEO & Meta</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Google Analytics ID</label>
                                <input
                                    type="text"
                                    placeholder="G-XXXXXXXXXX"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <h3 className="text-sm font-bold">Search Engine Visibility</h3>
                                    <p className="text-xs text-zinc-500 mt-1">Allow search engines to index this site</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-neon-purple)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-neon-purple)]"></div>
                                </label>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Settings Column */}
                <div className="space-y-6">
                    <section className="glass p-6 rounded-2xl border border-white/10 space-y-6">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <Share2 className="w-5 h-5 text-zinc-300" />
                            <h2 className="text-lg font-bold">Social Links</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">X (Twitter) Profile</label>
                                <input
                                    type="text"
                                    defaultValue="https://x.com/technews26"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">YouTube Channel</label>
                                <input
                                    type="text"
                                    defaultValue="https://youtube.com/@technews26"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Instagram URL</label>
                                <input
                                    type="text"
                                    placeholder="https://instagram.com/..."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="glass p-6 rounded-2xl border border-red-500/20 space-y-6 bg-red-500/5">
                        <h2 className="text-lg font-bold text-red-500">Danger Zone</h2>
                        <p className="text-xs text-zinc-400">Irreversible, destructive actions.</p>
                        <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold py-2.5 rounded-xl hover:bg-red-500/20 transition-colors">
                            Purge Cache
                        </button>
                        <button className="w-full bg-red-500 text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                            Delete Entire Publication
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
