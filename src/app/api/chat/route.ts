import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Read Gemini API key from environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
    console.log('Chat API called');
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    if (!GEMINI_API_KEY) {
        console.log('No GEMINI_API_KEY set, using mock mode');
        const lastMessage = messages[messages.length - 1]?.content || 'Hello';
        const responseText = `[technews26 Pilot] You asked about: "${lastMessage}". Set GEMINI_API_KEY for full AI responses!`;

        // Create a data stream in Vercel AI SDK format
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Message annotation
                controller.enqueue(encoder.encode('f:{"messageId":"mock-response"}\n'));
                // Text content (format: 0:"text content")
                const chunk = `0:${JSON.stringify(responseText)}\n`;
                controller.enqueue(encoder.encode(chunk));
                // Finish annotation
                controller.enqueue(encoder.encode('e:{"finishReason":"stop"}\n'));
                controller.close();
            }
        });

        console.log('Returning mock data stream response');
        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" }
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
        console.error('Error message:', error.message);
        console.error('Error cause:', error.cause);
        console.error('Error data:', JSON.stringify(error.data, null, 2));
        console.error('Full error:', JSON.stringify(error, null, 2));

        // Return error as a stream so frontend can parse it
        const encoder = new TextEncoder();
        const errorStream = new ReadableStream({
            start(controller) {
                const errorText = `[Error] Failed to get AI response: ${error.message || 'Unknown error'}`;
                controller.enqueue(encoder.encode(`0:${JSON.stringify(errorText)}\n`));
                controller.close();
            }
        });

        return new Response(errorStream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    }
}
