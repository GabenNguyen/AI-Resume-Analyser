"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Hash,
  Sparkles,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "../context/analysisStore";
import { useEffect, useRef, Suspense } from "react";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { fadeUp, scaleIn } from "@/lib/motion";
import Reveal from "@/components/Reveal";

const ScoreRing = ({ score }: { score: number }) => {
  const strokeWidth = 10;
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const numRef = useRef<HTMLSpanElement>(null);

  let colorClass = "text-destructive";
  if (score >= 85) colorClass = "text-emerald-500";
  else if (score >= 75) colorClass = "text-emerald-400";
  else if (score >= 50) colorClass = "text-amber-500";

  // GSAP: count the number up to the final score.
  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: score,
          duration: 1.4,
          delay: 0.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.val));
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [score] }
  );

  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
      <svg className="h-48 w-48 -rotate-90" viewBox="0 0 160 160">
        <circle
          className="text-border"
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
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          ref={numRef}
          className="text-5xl font-bold tracking-tighter text-foreground tabular-nums"
        >
          {score}
        </span>
        <span className="mt-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          / 100
        </span>
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
    if (score >= 85)
      return {
        text: "Excellent — you're job-ready",
        color: "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
      };
    if (score >= 75)
      return {
        text: "Good — minor tweaks needed",
        color: "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
      };
    if (score >= 50)
      return {
        text: "Fair — needs revision",
        color: "text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400",
      };
    return {
      text: "Poor — likely ATS rejection",
      color: "text-destructive border-destructive/30 bg-destructive/10",
    };
  };

  const verdict = getATSScoreVerdict(analysis.atsScore);

  return (
    <main className="relative min-h-screen px-6 pb-24 pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Target role
            </span>
            <span className="text-sm font-bold">{role?.toUpperCase()}</span>
          </div>
           <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Analysis <span className="text-primary">complete</span>
          </h1>

          <div className="mx-auto flex max-w-xl items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-sm text-amber-700 dark:text-amber-400">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Results are for reference only and may not be 100% accurate. Review
              with a mentor before applying to jobs.
            </p>
          </div>
        </motion.div>

        {/* Hero Score Card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg shadow-black/[0.04] md:flex-row md:p-10"
        >
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              ATS compatibility score
            </h2>
            <p className="text-muted-foreground">
              Based on industry-standard applicant tracking systems, this score
              reflects how well your resume matches the target role and avoids
              common parsing pitfalls.
            </p>
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${verdict.color}`}
            >
              {verdict.text}
            </div>
          </div>
          <div className="shrink-0">
            <ScoreRing score={analysis.atsScore} />
          </div>
        </motion.div>

        {/* Strengths & Improvements */}
        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          <div className="flex h-full flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">What you did well</h3>
                <p className="mt-0.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {analysis.strengths.length} strengths identified
                </p>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {analysis.strengths.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Areas to improve</h3>
                <p className="mt-0.5 text-sm font-medium text-amber-600 dark:text-amber-400">
                  {analysis.improvements.length} suggestions
                </p>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {analysis.improvements.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Missing Keywords */}
        <Reveal className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Hash className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Missing keywords</h3>
          </div>
          <p className="mb-6 text-muted-foreground">
            Weaving these in naturally can meaningfully improve your ATS match rate.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {analysis.missingKeywords.map((keyword: string) => (
              <span
                key={keyword}
                className="rounded-lg border border-border bg-muted/50 px-3.5 py-1.5 text-sm font-semibold text-foreground/90"
              >
                {keyword}
              </span>
            ))}
            {analysis.missingKeywords.length === 0 && (
              <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                No major keywords missing — great job.
              </span>
            )}
          </div>
        </Reveal>

        {/* Actionable Suggestions */}
        <Reveal className="relative overflow-hidden rounded-2xl bg-[oklch(0.21_0.02_264.131)] p-7 text-white md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 opacity-[0.05]"
          >
            <TrendingUp className="h-48 w-48" />
          </div>
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/20 p-2 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                Actionable suggestions
              </h3>
            </div>
            <ol className="space-y-3">
              {analysis.suggestions.map((suggestion: string, index: number) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="mt-0.5 leading-relaxed text-white/80">
                    {suggestion}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Footer CTA */}
        <Reveal className="flex justify-center">
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold shadow-sm transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCcw className="h-5 w-5" />
            Upload a new resume
          </Link>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
