"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function TechPilot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            console.log('Sending chat request...');
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            console.log('Response text:', text);

            // Parse the data stream format
            const lines = text.split('\n');
            let content = '';

            for (const line of lines) {
                if (line.startsWith('0:')) {
                    // Text content line
                    try {
                        const jsonStr = line.slice(2);
                        const parsed = JSON.parse(jsonStr);
                        content += parsed;
                    } catch {
                        // If parsing fails, just add the raw content
                        content += line.slice(2);
                    }
                }
            }

            // If no content parsed from data stream, use raw text
            if (!content) {
                content = text;
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: content || '[No response received]'
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="glass flex flex-col h-[350px] rounded-2xl overflow-hidden border-white/5 relative group mt-auto pt-4 shadow-[0_0_20px_rgba(176,38,255,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/5 to-[var(--color-neon-cyan)]/5 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-neon-cyan)] animate-pulse" />
                    <h3 className="text-sm font-bold">Tech Pilot</h3>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-zinc-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    v3.7
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide">
                {messages.length === 0 ? (
                    <div className="text-xs text-zinc-400 italic text-center my-auto flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-neon-purple)]/10 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-[var(--color-neon-purple)] opacity-70" />
                        </div>
                        <div>
                            <p className="font-medium text-zinc-300">technews26 AI Pilot</p>
                            <p>Ask me about any leaks on this page.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((m) => (
                        <div key={m.id} className={`text-xs ${m.role === 'user' ? 'text-white ml-auto bg-white/10 p-2.5 rounded-xl rounded-br-sm max-w-[85%]' : 'text-[var(--color-neon-cyan)] bg-black/40 p-2.5 rounded-xl rounded-bl-sm max-w-[90%] flex gap-2 border border-white/5'}`}>
                            {m.role !== 'user' && <Bot className="w-4 h-4 shrink-0 mt-0.5" />}
                            <p className="whitespace-pre-wrap">{m.content}</p>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="text-xs text-[var(--color-neon-purple)] animate-pulse flex items-center gap-2 bg-black/40 p-2.5 rounded-xl rounded-bl-sm max-w-[90%] border border-white/5 w-fit">
                        <Bot className="w-4 h-4 shrink-0" />
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-bounce [animation-delay:0.1s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-bounce [animation-delay:0.2s]" />
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl max-w-[90%] border border-red-500/20">
                        Error: {error}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2 bg-black/20 relative z-10">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about tech leaks..."
                    disabled={isLoading}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--color-neon-purple)]/50 focus:bg-white/5 transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[var(--color-neon-purple)] to-[var(--color-neon-cyan)] text-white shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:opacity-80 hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                >
                    <Send className="w-3.5 h-3.5" />
                </button>
            </form>
        </div>
    );
}
