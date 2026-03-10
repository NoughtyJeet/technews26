import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
    title: 'Privacy Policy | technews26',
    description: 'Privacy policy and data handling procedures for technews26.'
};

export default function PrivacyPage() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <article className="glass p-6 lg:p-12 rounded-3xl border border-white/5">
                        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>

                        <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
                            <p>Last Updated: March 10, 2026</p>

                            <h2>1. Standard Data Collection</h2>
                            <p>
                                At technews26, we value your privacy. When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                            </p>

                            <h2>2. Analytics and "Vibe" Metrics</h2>
                            <p>
                                We use standard analytics tools to understand how our readers navigate our content. This helps us optimize our layout and determine which leaking hardware categories (e.g., Apple AR glasses vs. Samsung Tri-Folds) deserve more coverage. This data remains strictly anonymized.
                            </p>

                            <h2>3. AI Interactions</h2>
                            <p>
                                If you utilize our interactive "TechPilot" AI chatbot, please be aware that your queries may be temporarily processed to generate relevant responses. Do not submit sensitive personal information into the chat interface. We do not use your chat logs to train underlying large language models.
                            </p>

                            <h2>4. Contact Information</h2>
                            <p>
                                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:privacy@technews26.com" className="text-[var(--color-neon-cyan)]">privacy@technews26.com</a>.
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
