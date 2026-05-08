"use client";

import { motion } from "framer-motion";
import { UploadCloud, ShieldCheck, Zap, FileText, CheckCircle2, X } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAnalysis } from "../context/analysisStore";
import validateInput from "@/utils/validateInput";
import AnalysingDialogs from "../components/AnalysingDialogs";

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
        body: JSON.stringify({ pdfText: extractedData, role, jd }),
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
    <main className="relative min-h-screen pt-32 pb-16 px-6 flex flex-col items-center selection:bg-purple-500/30">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-0 w-full max-w-2xl h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Upload & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Analyze</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Drop your resume here. Our AI will instantly score it and offer actionable insights to boost your chances.
          </p>
        </motion.div>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="w-full rounded-[2.5rem] bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            
            {/* Inputs Section */}
            <div className="grid gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Target Role <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 text-base placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Job Description (Optional)</label>
                <div className="relative">
                  <textarea
                    placeholder="Paste the job description here for highly tailored feedback..."
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 py-4 text-base placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <label 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                isHovering 
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                  : file 
                    ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" 
                    : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900"
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
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{file.name}</h3>
                    <p className="text-sm text-slate-500">Ready for analysis</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" /> Remove File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-3 pointer-events-none">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    isHovering ? "bg-purple-200 dark:bg-purple-800" : "bg-white dark:bg-slate-900 shadow-sm"
                  }`}>
                    <UploadCloud className={`w-8 h-8 ${isHovering ? "text-purple-700 dark:text-purple-300" : "text-slate-400"}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Click to upload or drag and drop</h3>
                  <p className="text-sm text-slate-500 max-w-xs">PDF format only. Maximum file size 5MB.</p>
                </div>
              )}
            </label>

            {/* Analyze Button */}
            <button
              onClick={handleSubmit}
              disabled={!canAnalyse || isAnalysing}
              className={`mt-8 w-full h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                canAnalyse && !isAnalysing
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              {isAnalysing ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-currentColor border-t-transparent animate-spin" />
                  Processing...
                </>
              ) : "Analyze Resume"}
            </button>
          </div>
          
          {/* Footer Features */}
          <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 p-6 md:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <item.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-none mb-1">{item.title}</span>
                    <span className="text-xs text-slate-500 leading-none">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <AnalysingDialogs
          open={isAnalysing}
          onClose={() => setIsAnalysing(false)}
        />
      </div>
    </main>
  );
}
