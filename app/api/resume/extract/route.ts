import * as PdfParse from 'pdf-parse-new';

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return Response.json(
            { error: "No PDF file provided!" },
            { status: 400 }
        );
    }

    // Convert file → buffer
    const pdfBuffer = Buffer.from(await file.arrayBuffer());

    try {
        // Smart parser (recommended by library)
        const parser = new PdfParse.SmartPDFParser({
            oversaturationFactor: 2.0,
            enableFastPath: true
        });

        const result = await parser.parse(pdfBuffer);

        if (!result?.text) {
            return Response.json(
                { error: "Error processing PDF file!" },
                { status: 500 }
            );
        }

        const cleanText = result.text
            .replace(/\r/g, "")
            // Keep double newlines so sections stay separated
            .replace(/\n{3,}/g, "\n\n")
            // Only reduce horizontal spaces, keep vertical structure
            .replace(/[ \t]{2,}/g, " ")
            .trim();

        return Response.json(
            {
                text: cleanText,
                meta: result._meta // optional debug info (method, duration, etc.)
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("PDF parse error:", error);

        return Response.json(
            { error: "Error processing PDF file!" },
            { status: 500 }
        );
    }
}