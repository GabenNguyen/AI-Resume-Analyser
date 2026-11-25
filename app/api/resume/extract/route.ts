import * as PdfParse from 'pdf-parse-new';

const MAX_PDF_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
    let formData: FormData;
    try {
        formData = await req.formData();
    } catch {
        return Response.json({ error: "Invalid upload." }, { status: 400 });
    }

    const file = formData.get("file");
    if (!file || typeof file === "string") {
        return Response.json(
            { error: "No PDF file provided!" },
            { status: 400 }
        );
    }
    if (file.type !== "application/pdf" || file.size === 0 || file.size > MAX_PDF_BYTES) {
        return Response.json(
            { error: "Invalid PDF file!" },
            { status: 400 }
        );
    }

    // Convert file → buffer
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    if (!pdfBuffer.subarray(0, 1024).includes(Buffer.from("%PDF-"))) {
        return Response.json(
            { error: "Invalid PDF file!" },
            { status: 400 }
        );
    }

    try {
        // Smart parser (recommended by library)
        const parser = new PdfParse.SmartPDFParser({
            oversaturationFactor: 2.0,
            enableFastPath: true,
            forceMethod: "workers"
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
            { text: cleanText },
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
