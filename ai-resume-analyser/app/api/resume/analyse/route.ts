import { PDFParse } from 'pdf-parse';

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const role = formData.get("role") as string;

    if(!file || !role) {
        return Response.json({ error: "Missing file or role!"}, { status: 400 });
    }

    // Convert PDF to buffer
    const pdfBuffer = Buffer.from(await file.arrayBuffer());

    try {
        // extract text from pdf
        const pdfData = new PDFParse({data: pdfBuffer});;
        const pdfText = pdfData.getText();

        if(!pdfText) {
            return Response.json( { error: "Unable to extract text from PDF!"}, { status: 400 });
        }

        // Call AI API (Mock for now later replace with actual AI Call)
        const aiAnalysisResult = {
            atsScore: 78,
            strengths: [
                "Clear work experience section",
                "Relevant technical skills listed",
            ],
            improvements: [
                "Add more measurable achievements",
                "Include keywords related to the role",
            ],
            missingKeywords: ["React", "TypeScript", "REST APIs"],
            role,
        };
        return Response.json(aiAnalysisResult, { status: 200})
    
    } catch (error) {
        console.error(`Error: ${error}`)
        return Response.json( { error: "Error processing PDF file!"}, {status: 500})
    }

}