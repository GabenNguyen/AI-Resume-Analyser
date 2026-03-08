import { PDFParse } from 'pdf-parse';

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
        const pdfData = new PDFParse({data: pdfBuffer});
        const pdfText = pdfData.getText();

        if(!pdfText) {
            return Response.json( { error: "Unable to extract text from PDF!"}, { status: 400 });
        }

        return Response.json(pdfText, { status: 200})
    
    } catch (error) {
        console.error(`Error: ${error}`)
        return Response.json( { error: "Error extracting PDF text!"}, {status: 500})
    }

}