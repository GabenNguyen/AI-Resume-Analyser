"use client";

import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAnalysis } from "../context/analysisStore";
import validateInput from "@/utils/validateInput";
import AnalysingDialogs from "../components/AnalysingDialogs";
import Footer from "../components/Footer";

export default function ResumeUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [role, setRole] = useState<string>("");
    const [jd, setJd] = useState<string>("");
    const [isHovering, setIsHovering] = useState(false);
    const isValidRole = role.trim().length >= 2;
    const canAnalyse = Boolean(file && isValidRole);

    const [isAnalysing, setIsAnalysing] = useState(false);
    const { setAnalysis } = useAnalysis();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!validateInput(role)) {
            return toast.warning(`Invalid role: ${role}!`);
        }

        if (!file) {
            return toast.warning("Please upload your resume!");
        }

        setIsAnalysing(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("role", role);
        formData.append("jd", jd);

        try {
            const extractRes = await fetch("/api/resume/extract", {
                method: "POST",
                body: formData,
            });

            const extractedData = await extractRes.json();

            if (!extractRes.ok) {
                throw new Error(extractedData.error || "Failed to extract text!");
            }

            const analyseRes = await fetch("/api/resume/analyse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pdfText: extractedData.text, role, jd }),
            });

            const analysedData = await analyseRes.json();

            if (!analyseRes.ok) {
                throw new Error(analysedData.error || "Failed to analyse resume!");
            }

            setAnalysis(analysedData);
            router.push(`/result?role=${encodeURIComponent(role)}`);
        } catch (err) {
            console.error(`${err}`);
            toast.error("Error analysing resume. Please try again.");
            setIsAnalysing(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHovering(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHovering(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
        } else {
            toast.error("Please drop a valid PDF file.");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center px-6 pb-16 pt-24">
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 text-center"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-primary" aria-hidden />
                        <span className="text-sm font-medium text-muted-foreground">
                            Step one &middot; your details
                        </span>
                    </div>
                    <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight md:text-6xl">
                        Upload &amp; <span className="text-primary">analyse</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                        Add the role you&rsquo;re targeting. We&rsquo;ll show you how
                        your resume reads to an ATS and what to fix first.
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_2px_oklch(0_0_0/0.04),0_18px_48px_-28px_oklch(0_0_0/0.18)]"
                >
                    <div className="p-7 md:p-10">
                        <div className="mb-9 grid gap-6">
                            <div className="space-y-2">
                                <label htmlFor="role" className="ml-0.5 text-sm font-semibold">
                                    Target role <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="h-12 w-full rounded-md border border-input bg-background px-4 text-base placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="jd" className="ml-0.5 text-sm font-semibold">
                                    Job description <span className="font-normal text-muted-foreground">(optional)</span>
                                </label>
                                <textarea
                                    id="jd"
                                    placeholder="Paste the job description for more tailored feedback..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-4 py-3.5 text-base placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25 resize-none"
                                />
                            </div>
                        </div>

                        {/* Dropzone */}
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed px-6 py-10 text-center transition-colors ${
                                isHovering
                                    ? "border-primary bg-primary/[0.04]"
                                    : file
                                        ? "border-emerald-500/60 bg-emerald-500/[0.03]"
                                        : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0] ?? null;
                                    if (selectedFile?.type === "application/pdf") {
                                        setFile(selectedFile);
                                    } else if (selectedFile) {
                                        toast.error("Please select a PDF file.");
                                    }
                                }}
                            />

                            {file ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        <h3 className="text-base font-semibold">{file.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Ready for analysis</p>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFile(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                        className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <X className="h-4 w-4" /> Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="pointer-events-none flex flex-col items-center gap-2">
                                    <div className={`mb-1 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                                        isHovering ? "bg-primary/10 text-primary" : "bg-card text-muted-foreground"
                                    }`}>
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base font-semibold">
                                        Click to upload or drag and drop
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        PDF format only &bull; up to 5MB
                                    </p>
                                </div>
                            )}
                        </label>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={!canAnalyse || isAnalysing}
                            className={`mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                canAnalyse && !isAnalysing
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "cursor-not-allowed bg-muted text-muted-foreground"
                            }`}
                        >
                            {isAnalysing ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Processing...
                                </>
                            ) : (
                                "Analyse resume"
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-7 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
                        <span>PDF &middot; up to 5 MB</span>
                        <span>1&ndash;2 page resumes work best</span>
                        <span>Files are never stored</span>
                    </div>
                </motion.div>

                <AnalysingDialogs
                    open={isAnalysing}
                    onClose={() => setIsAnalysing(false)}
                />
            </div>

            <Footer />
        </main>
    );
}
