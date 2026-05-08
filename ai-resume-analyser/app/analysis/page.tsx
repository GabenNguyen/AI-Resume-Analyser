"use client";

import { motion } from "framer-motion";
import { UploadCloud, ShieldCheck, Zap, FileText } from "lucide-react";

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
            Analyze Your Resume
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
          {/* Upload Area */}
          <label className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-10 cursor-pointer hover:bg-muted/40 transition">
            <UploadCloud className="h-10 w-10 text-primary" />
            <div className="text-center">
              <p className="font-medium">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">
                PDF only • Max 5MB
              </p>
            </div>
            <input type="file" accept="application/pdf" hidden />
          </label>

          {/* CTA */}
          <button
            disabled
            className="mt-8 w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground opacity-50 cursor-not-allowed"
          >
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
      </div>
    </main>
  );
}
