import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const { pdfText, role } = await req.json();
    
        if(!pdfText || !role) {
            return Response.json({ error: "Missing text or role!"}, {status: 400});
        }
        
        const gemini = new GoogleGenAI( {apiKey: process.env.GEMINI_KEY});
    
        const prompt = `You are a professional HR. Analyze this resume for role: "${role}".
                        Return JSON with:
                        "atsScore": number,
                        "strengths": [string],
                        "improvements": [string],
                        "missingKeywords": [string]
                        Do NOT include any explanations or extra text — ONLY return JSON.
                        Resume text:
                        """${pdfText}"""`;
        
        const response = await gemini.models.generateContent( {
            model: "gemini-2.5-flash",
            contents: prompt,
        })

        const text = response.text ?? "";
        
        const cleanText = text.replace(/```json|```/g, "").trim();
        
        const outputData = JSON.parse(cleanText);

        return Response.json(outputData, { status: 200});

    } catch (err) {
        console.error(`Error analysing resume: ${err}`);
        return Response.json({ error: "Error analysing resume!"}, {status: 500});
    }

}