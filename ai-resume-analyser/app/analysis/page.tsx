"use client";
import { motion } from "framer-motion";
import { UploadCloud, ShieldCheck, Zap, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAnalysis } from "../context/analysisStore";
import validateInput from "@/utils/validateInput";
import AnalysingDialogs from "../components/AnalysingDialogs";

const features = [
  {
    icon: FileText,
    title: "PDF Resume Upload",
    desc: "Supports standard one or two-page resume PDFs.",
  },
  {
    icon: Zap,
    title: "Instant AI Analysis",
    desc: "Receive structured feedback in under 10 seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    desc: "Files are processed securely and never stored.",
  },
];

export default function ResumeUploadPage() {
  // File and role parts
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>("");
  const [jd, setJd] = useState<string>("");
  const isValidRole = role.trim().length >= 2; // HR is still a role!
  const canAnalyse = Boolean(file && isValidRole);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Show analysing dialog state
  const [isAnalysing, setIsAnalysing] = useState(false);

  const { setAnalysis } = useAnalysis(); // get the setAnalysis function from the context

  const router = useRouter();

  const handleSubmit = async () => {
    if (!validateInput(role)) {
      return toast.warning(`Invalid role: ${role}!`);
    }

    if (!file) {
      return toast.warning("Please upload your resume!");
    }

    setIsAnalysing(true); // show the analysing dialog before routing to the result page

    // Prepare form data for the backend
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

      setAnalysis(analysedData); // store the analysis data in the context
      router.push(`/result?role=${encodeURIComponent(role)}`);
    } catch (err) {
      console.error(`${err}`);
      toast.error("Error analysing resume. Please try again.");
      setIsAnalysing(false);
    } finally {
      setIsAnalysing(false); // hide the analysing dialog after the process is done
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // useRef to change the DOM without re-rendering

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Are You{" "}
            <span className="italic font-bold text-green-500">Job-Ready?</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Upload your resume PDF and get AI-powered feedback based on real
            recruiter and ATS criteria.
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-12 rounded-3xl border bg-background/70 backdrop-blur p-10"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">Target Role</p>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer, Data Analyst"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border bg-background px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm font-medium mt-3">Job Description</p>
            <input
              type="text"
              placeholder="Paste the job description here for tailored feedback (optional)"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full rounded-xl border bg-background px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Upload Area */}
          <label className="flex flex-col mt-5 items-center justify-center gap-4 rounded-2xl border border-dashed p-10 cursor-pointer hover:bg-muted/40 transition">
            <UploadCloud className="h-10 w-10 text-primary" />
            <div className="text-center">
              <p className="font-medium">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">
                PDF only • Max 5MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] ?? null; // select the first file (only 1 file required)
                setFile(selectedFile);
                setUploadSuccess(!!selectedFile); // check if a PDF file is uploaded
              }}
            />
          </label>
          {/* Success Message */}
          {uploadSuccess && file && (
            <div className="mt-2 flex items-center justify-center gap-4">
              <p className="mt-2 text-sm text-green-600 text-center">
                ✅ {file.name} uploaded successfully
              </p>
              <button
                onClick={() => {
                  setFile(null); // remove file
                  setUploadSuccess(false); // hide success message

                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // remove the already uploaded PDF file
                  }
                }}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-900 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* CTA */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!canAnalyse}
            className={`mt-8 w-full rounded-xl py-3 font-medium transition
    ${
      canAnalyse
        ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
        : "bg-primary text-primary-foreground opacity-50 cursor-not-allowed"
    }`}
          >
            {/* Since there is a router.push() above, the anchor tag is unnecessary and therefore deleted */}
            Analyze Resume
          </button>

          {/* Trust Row */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {features.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 justify-center"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.desc}</span>
              </div>
            ))}
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
