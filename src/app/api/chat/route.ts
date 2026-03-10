import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Initialize Google provider with the key from environment
const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    if (!apiKey) {
        console.log('No Gemini API key set, using mock mode');
        const lastMessage = messages[messages.length - 1]?.content || 'Hello';
        const responseText = `[technews26 Pilot] Hello! I see your message: "${lastMessage}". Please set GOOGLE_GENERATIVE_AI_API_KEY or NEXT_GEMINI_API_KEY in your environment to unlock my full AI potential!`;

        // Create a data stream in Vercel AI SDK Data Stream protocol format (0: is text chunk)
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Return mock text as a data stream chunk
                const chunk = `0:${JSON.stringify(responseText)}\n`;
                controller.enqueue(encoder.encode(chunk));
                controller.close();
            }
        });

        console.log('Returning mock data stream response');
        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "x-vercel-ai-data-stream": "v1"
            }
        });
    }

    try {
        // Use Google Gemini
        const result = await streamText({
            model: google('gemini-1.5-flash'),
            messages,
            system: "You are the technews26 Tech Pilot, a 2026 AI concierge for a high-end tech blog. Keep answers very concise, edgy, and focused on tech leaks.",
        });

        console.log('Streaming AI response from Gemini');
        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('Gemini API error:', error);

        // Return error as a plain text response
        return new Response(`[Error] ${error.message || 'Failed to connect to AI'}`, {
            status: 500,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    }
}
