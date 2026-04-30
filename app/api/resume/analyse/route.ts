import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const { pdfText, role, jd } = await req.json();

        if (!pdfText || !role) {
            return Response.json({ error: "Missing text or role!" }, { status: 400 });
        }

        const gemini = new GoogleGenAI({});

        const prompt = `You are an expert HR recruiter and ATS (Applicant Tracking System).

        Your task is to analyse the following resume.

        Target Role:
        "${role}"

        Job Description (optional):
        """
        ${jd || "Not provided"}
        """

        Resume:
        """
        ${pdfText}
        """

        Instructions:

        If a job description is provided:
        - Compare the resume against the job description.
        - Identify missing skills and keywords.
        - Estimate ATS compatibility for this specific role.

        If no job description is provided:
        - Analyse the resume for general ATS quality for the target role.
        - Evaluate structure, clarity, skills, and experience relevance.

        Evaluation criteria:
        1. Resume structure and readability
        2. Relevant skills for the target role
        3. Work experience relevance
        4. Presence of measurable achievements
        5. Keyword optimisation for ATS systems

        Scoring rules:
        - Score must be between 0 and 100
        - 90–100 = Excellent
        - 70–89 = Strong
        - 50–69 = Average
        - 0–49 = Weak

        Important:
        The resume text may have formatting issues due to PDF extraction.
        Sections may appear in unusual order or formatting.

        Identify sections such as:
        - Contact Information
        - Summary or Objective
        - Work Experience
        - Skills
        - Education

Even if section titles are slightly different or poorly formatted.

        Return ONLY valid JSON in this exact format:

        {
        "atsScore": number,
        "matchLevel": "Excellent" | "Strong" | "Average" | "Weak",
        "strengths": [string],
        "improvements": [string],
        "missingKeywords": [string],
        "suggestions": [string],
        }

        Rules:
        - Do NOT include explanations outside JSON
        - Do NOT include markdown
        - Do NOT include code blocks
        - Output must be valid JSON only
        - Use Australian English for any text in the JSON
        `;

        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })

        const text = response.text ?? "";

        const formattedText = text.replace(/```json|```/g, "").trim();

        const outputData = JSON.parse(formattedText);

        return Response.json(outputData, { status: 200 });

    } catch (err) {
        console.error(`Error analysing resume: ${err}`);
        return Response.json({ error: "Error analysing resume!" }, { status: 500 });
    }

}