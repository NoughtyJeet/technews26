import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
    title: 'Terms of Service | technews26',
    description: 'Terms of Service for utilizing technews26 website.'
};

export default function TermsPage() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <article className="glass p-6 lg:p-12 rounded-3xl border border-white/5">
                        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>

                        <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
                            <p>Last Updated: March 10, 2026</p>

                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the technews26.com website, you accept and agree to be bound by the terms and provision of this agreement.
                            </p>

                            <h2>2. Content and Intellectual Property</h2>
                            <p>
                                All articles, graphics, custom CSS visualizations, logos, and digital content provided on technews26 are the intellectual property of our publication. You may not republish, reproduce, or distribute our deep-dive analyses without explicit attribution and permission.
                            </p>

                            <h2>3. User Conduct in Next-Gen Interfaces</h2>
                            <p>
                                We strive to maintain a clean environment. When using our AI tools or commenting (if enabled), you agree not to post defamatory, offensive, or malicious code payloads.
                            </p>

                            <h2>4. Modification of Service</h2>
                            <p>
                                technews26 reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
                            </p>

                            <h2>5. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at <a href="mailto:legal@technews26.com" className="text-[var(--color-neon-purple)]">legal@technews26.com</a>.
                            </p>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-8">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
