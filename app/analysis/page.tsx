"use client";

import { motion } from "framer-motion";
import { UploadCloud, ShieldCheck, Zap, FileText, CheckCircle2, X } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAnalysis } from "../context/analysisStore";
import validateInput from "@/utils/validateInput";
import AnalysingDialogs from "../components/AnalysingDialogs";
import Footer from "../components/Footer";

const features = [
    {
        icon: FileText,
        title: "PDF Only",
        desc: "1-2 page standard resumes",
    },
    {
        icon: Zap,
        title: "Fast AI",
        desc: "Structured feedback in seconds",
    },
    {
        icon: ShieldCheck,
        title: "Private",
        desc: "Files are never stored",
    },
];

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
        <main className="relative flex min-h-screen flex-col items-center px-6 pb-16 pt-32">

            {/* Background Decor */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent)]"
            />

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Upload &amp; <span className="text-primary">analyse</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
                        Drop your resume below. Our AI scores it and returns
                        actionable insights to boost your chances.
                    </p>
                </motion.div>

                {/* Action Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/[0.04]"
                >
                    <div className="p-7 md:p-10">

                        {/* Inputs Section */}
                        <div className="mb-10 grid gap-6">
                            <div className="space-y-2">
                                <label htmlFor="role" className="ml-1 text-sm font-semibold text-foreground">
                                    Target role <span className="text-destructive">*</span>
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-input bg-background px-5 text-base placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="jd" className="ml-1 text-sm font-semibold text-foreground">
                                    Job description <span className="font-normal text-muted-foreground">(optional)</span>
                                </label>
                                <textarea
                                    id="jd"
                                    placeholder="Paste the job description for more tailored feedback..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-input bg-background px-5 py-4 text-base placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none"
                                />
                            </div>
                        </div>

                        {/* Upload Area */}
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-10 transition-all
                ${isHovering
                                    ? "border-primary bg-primary/5"
                                    : file
                                        ? "border-emerald-500 bg-emerald-500/5"
                                        : "border-border bg-muted/40 hover:bg-muted/60"
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
                                <div className="flex flex-col items-center space-y-3 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold">{file.name}</h3>
                                        <p className="text-sm text-muted-foreground">Ready for analysis</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFile(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                        className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                                    >
                                        <X className="h-4 w-4" /> Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="pointer-events-none flex flex-col items-center space-y-2.5 text-center">
                                    <div className={`mb-1 flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isHovering ? "bg-primary/15 text-primary" : "bg-card text-muted-foreground shadow-sm"
                                        }`}>
                                        <UploadCloud className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-base font-semibold">
                                        Click to upload or drag and drop
                                    </h3>
                                    <p className="max-w-xs text-sm text-muted-foreground">
                                        PDF format only &bull; up to 5MB
                                    </p>
                                </div>
                            )}
                        </label>

                        {/* Analyze Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!canAnalyse || isAnalysing}
                            className={`mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${canAnalyse && !isAnalysing
                                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                : "cursor-not-allowed bg-muted text-muted-foreground"
                                }`}
                        >
                            {isAnalysing ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Processing...
                                </>
                            ) : (
                                "Analyse resume"
                            )}
                        </button>
                    </div>

                    {/* Footer Features */}
                    <div className="flex flex-col gap-4 border-t border-border bg-muted/30 px-7 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
                        {features.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold leading-none">{item.title}</span>
                                    <span className="mt-1 text-xs leading-none text-muted-foreground">{item.desc}</span>
                                </div>
                            </div>
                        ))}
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



