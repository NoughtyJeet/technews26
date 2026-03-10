import Link from 'next/link'
import { login, signInWithGoogle } from '../auth/actions'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white">Welcome back</h1>
                    <p className="text-zinc-400 text-sm mt-1">Sign in to your technews26 account</p>
                </div>

                <form className="flex-1 flex flex-col w-full justify-center gap-4 text-zinc-300" action={login}>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="rounded-xl px-4 py-3 bg-black/50 border border-white/10 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors text-white"
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="password">
                                Password
                            </label>
                            <Link href="/forgot-password" className="text-xs text-[var(--color-neon-cyan)] hover:opacity-80 transition-opacity">Forgot password?</Link>
                        </div>

                        <input
                            className="rounded-xl px-4 py-3 bg-black/50 border border-white/10 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors text-white"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button className="bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)] rounded-xl px-4 py-3 text-black font-bold mb-2 hover:opacity-90 transition-opacity flex items-center justify-center">
                        Sign In
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-red-500/10 text-red-400 text-center rounded-xl border border-red-500/20 text-sm">
                            {searchParams.message}
                        </p>
                    )}
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-zinc-500 bg-[#09090b]">Or continue with</span>
                    </div>
                </div>

                <form action={signInWithGoogle}>
                    <button className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-3 border border-transparent rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-white hover:underline transition-all">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
