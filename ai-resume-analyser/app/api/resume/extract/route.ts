import { PDFParse } from 'pdf-parse';
PDFParse.setWorker(
    new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url).toString()
);

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if(!file) {
        return Response.json({ error: "No PDF file provided!"}, { status: 400 });
    }

    // Convert PDF to buffer
    const pdfBuffer = Buffer.from(await file.arrayBuffer());

    try {
        // extract text from pdf
        const parser= new PDFParse({ data: pdfBuffer });

        const result = await parser.getText(); // TextResult object

        await parser.destroy();

        if(!result) {
            return Response.json({ error: "Error processing PDF file!"}, { status: 500 });
        }

        const cleanText = result.text.replace(/\r/g, "").replace(/\n{2,}/g, "\n").replace(/\s{2,}/g, " ").trim(); // actual string

        
        return Response.json(cleanText, {status: 200});
    
    } catch (error) {
        console.error(`Error: ${error}`)
        return Response.json({ error: "Error processing PDF file!"}, { status: 500 });
    }

}