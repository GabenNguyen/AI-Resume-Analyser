"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Hash,
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
  if (score >= 85) colorClass = "text-emerald-600 dark:text-emerald-400";
  else if (score >= 75) colorClass = "text-emerald-500 dark:text-emerald-400";
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
          className="font-display text-6xl leading-none text-foreground tabular-nums"
        >
          {score}
        </span>
        <span className="mt-2 font-mono text-xs text-muted-foreground">
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
        color: "text-emerald-700 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
      };
    if (score >= 75)
      return {
        text: "Good — minor tweaks needed",
        color: "text-emerald-700 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
      };
    if (score >= 50)
      return {
        text: "Fair — needs revision",
        color: "text-amber-700 border-amber-500/30 bg-amber-500/10 dark:text-amber-400",
      };
    return {
      text: "Poor — likely ATS rejection",
      color: "text-destructive border-destructive/30 bg-destructive/10",
    };
  };

  const verdict = getATSScoreVerdict(analysis.atsScore);

  return (
    <main className="min-h-screen px-6 pb-24 pt-24">
      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-5 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm">
            <span className="text-muted-foreground">Target role</span>
            <span className="font-semibold">{role}</span>
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-tight md:text-6xl">
            Analysis <span className="text-primary">complete</span>
          </h1>
          <div className="mx-auto flex max-w-xl items-start gap-2.5 rounded-md border border-amber-500/25 bg-amber-500/[0.06] p-4 text-left text-sm text-amber-800 dark:text-amber-400">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Results are for reference only and may not be 100% accurate. Review
              with a mentor before applying to jobs.
            </p>
          </div>
        </motion.div>

        {/* Score */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center justify-between gap-8 overflow-hidden rounded-lg border border-border bg-card p-8 shadow-[0_1px_2px_oklch(0_0_0/0.04)] md:flex-row md:p-10"
        >
          <div className="flex-1 space-y-4 text-center md:text-left">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              ATS compatibility
            </p>
            <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
              How well does your resume read?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Based on industry-standard applicant tracking systems, this score
              reflects how well your resume matches the target role and avoids
              common parsing pitfalls.
            </p>
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${verdict.color}`}
            >
              {verdict.text}
            </div>
          </div>
          <div className="shrink-0">
            <ScoreRing score={analysis.atsScore} />
          </div>
        </motion.div>

        {/* Strengths & improvements */}
        <Reveal stagger className="grid gap-5 md:grid-cols-2">
          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">What you did well</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {analysis.strengths.length} strengths identified
                </p>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {analysis.strengths.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-md bg-amber-500/10 p-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">Areas to improve</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {analysis.improvements.length} suggestions
                </p>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {analysis.improvements.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Missing keywords */}
        <Reveal className="rounded-lg border border-border bg-card p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Hash className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Missing keywords</h3>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Weaving these in naturally can meaningfully improve your ATS match rate.
          </p>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((keyword: string) => (
              <span
                key={keyword}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
            {analysis.missingKeywords.length === 0 && (
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                No major keywords missing — great job.
              </span>
            )}
          </div>
        </Reveal>

        {/* Actionable suggestions */}
        <Reveal className="rounded-lg bg-foreground p-7 text-background md:p-10">
          <div className="mb-7 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-background/60">
              Priority edits
            </span>
            <span className="h-px flex-1 bg-background/15" aria-hidden />
          </div>
          <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            Actionable suggestions
          </h3>
          <ol className="mt-7 space-y-3">
            {analysis.suggestions.map((suggestion: string, index: number) => (
              <li
                key={index}
                className="flex gap-4 rounded-md border border-background/12 bg-background/[0.05] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background/10 font-mono text-xs font-medium">
                  {index + 1}
                </span>
                <p className="mt-0.5 text-sm leading-relaxed text-background/80">
                  {suggestion}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Footer CTA */}
        <Reveal className="flex justify-center">
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCcw className="h-4 w-4" />
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
