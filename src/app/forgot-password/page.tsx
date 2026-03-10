import Link from 'next/link'

export default function ForgotPasswordPage({ searchParams }: { searchParams: { message: string, success: string } }) {

    // NOTE: Password reset requires a slightly more complex flow in Supabase with callback URLs.
    // For now, this is a visual mockup that could be wired to a `resetPassword` Server Action later.

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white">Reset Password</h1>
                    <p className="text-zinc-400 text-sm mt-1">Enter your email and we'll send you a recovery link.</p>
                </div>

                <form className="flex-1 flex flex-col w-full justify-center gap-4 text-zinc-300">
                    <div className="flex flex-col gap-1 mb-2">
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

                    <button className="bg-white text-black rounded-xl px-4 py-3 font-bold mb-2 hover:bg-zinc-200 transition-colors flex items-center justify-center">
                        Send Reset Link
                    </button>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-red-500/10 text-red-400 text-center rounded-xl border border-red-500/20 text-sm">
                            {searchParams.message}
                        </p>
                    )}

                    {searchParams?.success && (
                        <p className="mt-4 p-4 bg-emerald-500/10 text-emerald-400 text-center rounded-xl border border-emerald-500/20 text-sm">
                            {searchParams.success}
                        </p>
                    )}
                </form>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    Remember your password?{" "}
                    <Link href="/login" className="text-white hover:underline transition-all">Sign In</Link>
                </p>
            </div>
        </div>
    )
}
