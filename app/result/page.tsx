"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Hash, Sparkles, TrendingUp, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "../context/analysisStore";
import { useEffect, Suspense } from "react";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";

// Helper Circular Progress Component
const ScoreRing = ({ score }: { score: number }) => {
  const strokeWidth = 8;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-red-500";
  if (score >= 85) colorClass = "text-emerald-500";
  else if (score >= 75) colorClass = "text-green-400";
  else if (score >= 50) colorClass = "text-amber-500";

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
      <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 160 160">
        <circle
          className="text-slate-200 dark:text-slate-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        <motion.circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          {score}
        </span>
        <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">/ 100</span>
      </div>
    </div>
  );
};

function ResultContent() {
  const { analysis } = useAnalysis();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();

  useEffect(() => {
    if (!analysis) {
      router.push("/analysis");
    }
  }, [analysis, router]);

  if (!analysis) return null;

  const getATSScoreVerdict = (score: number) => {
    if (score >= 85) return { text: "Excellent — You are job-ready!", color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" };
    if (score >= 75) return { text: "Good — Minor tweaks needed.", color: "text-green-500 border-green-500/20 bg-green-500/10" };
    if (score >= 50) return { text: "Fair — Needs revision.", color: "text-amber-500 border-amber-500/20 bg-amber-500/10" };
    return { text: "Poor — likely ATS rejection.", color: "text-red-500 border-red-500/20 bg-red-500/10" };
  };

  const verdict = getATSScoreVerdict(analysis.atsScore);

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 selection:bg-purple-500/30">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-0 w-full max-w-4xl h-100 bg-purple-500/5 dark:bg-purple-600/5 rounded-[100%] blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md mb-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Target Role:</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{role?.toUpperCase()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Analysis <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Complete</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-400 font-medium bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 mt-6 shadow-sm">
            <span className="font-bold flex items-center justify-center gap-2 mb-1"><AlertTriangle className="w-4 h-4" /> Important Note</span>
            The result is for reference only and may not be 100% accurate. Review with a mentor before applying to jobs.
          </p>
        </motion.div>

        {/* Hero Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-[2.5rem] bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-2xl shadow-xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">ATS Compatibility Score</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Based on industry-standard applicant tracking systems, this score reflects how well your resume matches the target role and avoids common algorithmic pitfalls.
            </p>
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold tracking-wide ${verdict.color}`}>
              {verdict.text}
            </div>
          </div>
          <div className="shrink-0">
            <ScoreRing score={analysis.atsScore} />
          </div>
        </motion.div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-8 shadow-sm flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">What You Did Well</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-1">{analysis.strengths.length} strengths identified</p>
              </div>
            </div>
            <ul className="space-y-4 flex-1">
              {analysis.strengths.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-8 shadow-sm flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Areas to Improve</h3>
                <p className="text-amber-600 dark:text-amber-400 font-medium text-sm mt-1">{analysis.improvements.length} improvements suggested</p>
              </div>
            </div>
            <ul className="space-y-4 flex-1">
              {analysis.improvements.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Missing Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 p-8 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Hash className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-2xl font-bold tracking-tight">Missing Keywords</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
            Adding these naturally throughout your bullet points can significantly improve your ATS ranking match rate.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {analysis.missingKeywords.map((keyword: string) => (
              <div key={keyword} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold shadow-sm text-sm">
                {keyword}
              </div>
            ))}
            {analysis.missingKeywords.length === 0 && (
              <div className="px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 font-semibold text-sm">
                No major keywords missing! Great job.
              </div>
            )}
          </div>
        </motion.div>

        {/* Actionable Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-[2rem] bg-linear-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold tracking-tight">Actionable Suggestions</h3>
            </div>
            <ul className="space-y-6">
              {analysis.suggestions.map((suggestion: string, index: number) => (
                <li key={index} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium mt-1">
                    {suggestion}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8"
        >
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            Upload New Resume
          </Link>
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
