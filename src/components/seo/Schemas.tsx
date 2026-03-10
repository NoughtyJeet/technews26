import React from 'react';

// Common SEO schema structures required for competitive News SEO in 2026.

export function SpeakableSchema({ url, title, text }: { url: string; title: string; text: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "name": title,
        "speakable": {
            "@type": "SpeakableSpecification",
            "xpath": [
                "//h1",
                "//p[@class='speakable']"
            ]
        },
        "url": url,
        "description": text
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ProductHeroSchema({ name, brand, description, image }: { name: string; brand: string; description: string; image: string }) {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": name,
        "image": image,
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": brand
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function FAQSchema({ questions }: { questions: { question: string, answer: string }[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
