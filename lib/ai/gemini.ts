import { GoogleGenAI } from "@google/genai";

export default async function callGemini(prompt: string) {
  const gemini = new GoogleGenAI({});

  try {
    const response = await gemini.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    return response.text ?? "";
  } catch (err) {
    console.error(`Gemini error: ${err}`);
    throw err;
  }
}
