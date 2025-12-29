import { GoogleGenerativeAI } from '@google/generative-ai';
import { KNOWLEDGE_BASE } from './knowledge-base';

// API Keys from environment
const API_KEYS = [
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_1,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_2,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_3,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_4,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_5,
    process.env.NEXT_PUBLIC_GEMINI_API_KEY_6,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

function getNextKey(): string {
    if (API_KEYS.length === 0) {
        throw new Error('No Gemini API keys configured');
    }
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

export async function sendMessage(
    message: string,
    history: ChatMessage[] = []
): Promise<string> {
    let lastError: Error | null = null;

    // Try all keys in rotation
    for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
        try {
            const apiKey = getNextKey();
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: KNOWLEDGE_BASE,
            });

            const chat = model.startChat({
                history: history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }],
                })),
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();

        } catch (error: any) {
            lastError = error;

            // If it's a rate limit error (429), try next key
            if (error?.status === 429 || error?.message?.includes('quota')) {
                console.warn(`Rate limit hit on key ${currentKeyIndex}, trying next key...`);
                continue;
            }

            // For other errors, throw immediately
            throw error;
        }
    }

    // All keys exhausted
    throw new Error(
        `All API keys exhausted. Last error: ${lastError?.message || 'Unknown error'}`
    );
}

export function resetKeyRotation() {
    currentKeyIndex = 0;
}
