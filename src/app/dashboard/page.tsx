import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { LogOut, User as UserIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    // Verify User Session
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
        redirect('/login')
    }

    // Fetch Profile Metadata
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="max-w-4xl mx-auto w-full px-8 py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                <p className="text-zinc-400 text-sm mt-1">Manage your technews26 account and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="md:col-span-2 glass rounded-3xl border border-white/10 overflow-hidden relative">
                    <div className="h-32 bg-gradient-to-br from-[var(--color-neon-cyan)]/20 to-[var(--color-neon-purple)]/20 border-b border-white/5" />

                    <div className="px-8 pb-8">
                        <div className="-mt-12 mb-6 w-24 h-24 rounded-full bg-black border-4 border-[#09090b] flex items-center justify-center text-[var(--color-neon-cyan)]">
                            <UserIcon className="w-10 h-10" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">
                            {profile?.name || user.user_metadata?.full_name || 'Anonymous User'}
                        </h2>
                        <p className="text-zinc-400 mb-6">{user.email}</p>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10 mb-6">
                            <div>
                                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Account Role</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 capitalize">
                                    {profile?.role || 'User'}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Member Since</p>
                                <p className="text-sm font-medium text-white">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <form action={logout}>
                                <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="glass rounded-3xl border border-white/10 p-6 flex flex-col justify-center text-center items-center">
                    <h3 className="text-lg font-bold text-white mb-2">More coming soon!</h3>
                    <p className="text-sm text-zinc-400">
                        You currently do not have any saved bookmarks or active comments. Browse our latest articles to join the conversation.
                    </p>
                </div>

            </div>
        </div>
    )
}
