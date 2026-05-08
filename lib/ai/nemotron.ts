import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export default async function callNemotron(prompt: string) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    try {
        if (!OPENROUTER_API_KEY) {
            throw new Error("Missing OpenRouter API Key");
        }

        const openrouter = createOpenRouter({
            apiKey: OPENROUTER_API_KEY,
        })


        const response = streamText({
            model: openrouter('nvidia/nemotron-nano-12b-v2-vl:free'),
            prompt: prompt,
        });

        await response.consumeStream();

        return response.text ?? "";

    } catch (err: any) {
        console.error(`Nemotron error: ${err}`);
        throw err;
    }
}