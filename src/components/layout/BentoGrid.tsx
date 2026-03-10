import React from 'react';

export default function BentoGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1
}: {
    children: React.ReactNode,
    className?: string,
    colSpan?: 1 | 2 | 3 | 4,
    rowSpan?: 1 | 2
}) {
    const colSpans = {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-2 lg:col-span-3",
        4: "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4",
    };

    const rowSpans = {
        1: "row-span-1",
        2: "row-span-2",
    };

    return (
        <div className={`glass rounded-3xl overflow-hidden relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] hover:border-[var(--color-neon-purple)]/30 ${colSpans[colSpan]} ${rowSpans[rowSpan]} ${className || ''}`}>
            {children}
        </div>
    );
}
