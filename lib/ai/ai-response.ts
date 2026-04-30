import callGemini from "./gemini";
import callNemotron from "./nemotron";

export default async function generateResponse(prompt: string) {
    try {
        const result = await callGemini(prompt);

        return {
            output: result,
            model: "gemini"
        };
    } catch (err: any) {
        console.warn(err);

        const fallbackResult = await callNemotron(prompt);

        return {
            output: fallbackResult,
            model: "nemotron"
        }
    }
}  