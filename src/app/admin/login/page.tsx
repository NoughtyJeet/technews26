import { adminLogin } from '@/app/auth/actions'
import { ShieldAlert } from 'lucide-react'

export default function AdminLoginPage({ searchParams }: { searchParams: { message: string } }) {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
            <div className="glass p-8 rounded-2xl border border-red-500/20 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="mb-8 relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-500">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase">Admin Terminal</h1>
                    <p className="text-red-400 text-sm mt-1 font-mono">Restricted Access Level</p>
                </div>

                <form className="flex-1 flex flex-col w-full justify-center gap-4 text-zinc-300 relative z-10" action={adminLogin}>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="email">
                            Authorization Email
                        </label>
                        <input
                            className="rounded-xl px-4 py-3 bg-black/80 border border-white/10 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-white font-mono"
                            name="email"
                            placeholder="admin@technews26.example.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="password">
                            Security Passkey
                        </label>
                        <input
                            className="rounded-xl px-4 py-3 bg-black/80 border border-white/10 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-white font-mono"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button className="bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl px-4 py-3 font-bold uppercase tracking-widest mb-2 hover:bg-red-500/30 transition-colors flex items-center justify-center">
                        Initialize Session
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-red-500/10 text-red-400 text-center rounded-xl border border-red-500/20 text-sm font-mono">
                            [SYSTEM ERROR] {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}
