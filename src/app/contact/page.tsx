import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContactForm from '@/components/widgets/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata = {
    title: 'Contact Us | technews26',
    description: 'Get in touch with the technews26 team for tips, feedback, and inquiries.'
};

export default function ContactPage() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="mb-12">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">Contact technews26</h1>
                        <p className="text-xl text-zinc-400 max-w-2xl">
                            We're always looking for the next big scoop in hardware and AI. Reach out to our editorial team below.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Contact Info Cards */}
                        <div className="glass p-6 rounded-2xl flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center text-[var(--color-neon-cyan)] mb-2">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg">Email Us</h3>
                            <a href="mailto:tips@technews26.com" className="text-zinc-400 hover:text-white transition-colors">tips@technews26.com</a>
                        </div>
                        <div className="glass p-6 rounded-2xl flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-neon-purple)]/20 flex items-center justify-center text-[var(--color-neon-purple)] mb-2">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg">HQ Location</h3>
                            <p className="text-zinc-400">Silicon Valley, CA<br />Remote First</p>
                        </div>
                        <div className="glass p-6 rounded-2xl flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-2">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg">Press Line</h3>
                            <p className="text-zinc-400">For urgent media inquiries only.</p>
                        </div>
                    </div>

                    {/* Interactive Form Component */}
                    <ContactForm />
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
