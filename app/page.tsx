"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import { fadeUp, fadeIn } from "@/lib/motion";
import Footer from "./components/Footer";

const features = [
  {
    title: "ATS parsability",
    desc: "See exactly how applicant tracking systems read your file, and catch the formatting that gets you filtered out before a human ever looks.",
  },
  {
    title: "Keyword coverage",
    desc: "Compare your resume with a job description and find the qualifications a screener expects but cannot find.",
  },
  {
    title: "Rewrite guidance",
    desc: "Turn vague duties into specific, measurable achievements with line-by-line edits you can paste straight in.",
  },
];

export default function HomePage() {
  const previewRef = useRef<HTMLDivElement>(null);

  // GSAP: scroll-driven draw-in + progress bar fill for the report preview.
  useGSAP(
    () => {
      const el = previewRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        tl.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
        }).from(
          bars,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
          },
          "-=0.35"
        );
      });

      return () => mm.revert();
    },
    { scope: previewRef }
  );

  return (
    <main className="min-h-screen overflow-hidden">
      {/* HERO — editorial split: argument on the left, evidence on the right */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-primary" aria-hidden />
              <span className="text-sm font-medium text-muted-foreground">
                Resume analysis, grounded in evidence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
            >
              See your resume the way an ATS sees it.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              ResumeScope scores your CV against real applicant-tracking logic,
              shows what gets lost in translation, and tells you exactly what
              to fix first.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/analysis"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Analyse my resume
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <span className="text-sm text-muted-foreground">
                Free &bull; No sign-up required
              </span>
            </motion.div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <span>ATS score</span>
              <span>Keyword match</span>
              <span>Rewrite edits</span>
            </div>
          </div>

          {/* REPORT PREVIEW */}
          <div
            ref={previewRef}
            className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_2px_oklch(0_0_0/0.04),0_18px_48px_-24px_oklch(0_0_0/0.22)]"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/60 px-6 py-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                ATS readiness report
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                PDF &middot; parsed
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Overall score
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-6xl leading-none">85</span>
                    <span className="font-mono text-sm text-muted-foreground">
                      / 100
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Strong match
                </span>
              </div>

              <div className="mt-7 space-y-5">
                {[
                  { label: "ATS parsability", value: 92, tone: "bg-emerald-600" },
                  { label: "Impact & metrics", value: 65, tone: "bg-amber-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{row.label}</span>
                      <span className="font-mono font-medium tabular-nums">
                        {row.value}%
                      </span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                      <div
                        data-bar
                        className={`h-full rounded-full ${row.tone}`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-border pt-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Rewrite &middot; impact &amp; metrics
                </p>
                <div className="mt-3 space-y-2.5">
                  <div className="rounded-md border border-border bg-background p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Before
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground line-through decoration-destructive/50">
                      Responsible for managing a team of 5 engineers.
                    </p>
                  </div>
                  <div className="rounded-md border border-emerald-500/30 bg-emerald-500/[0.04] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      After
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Led 5 engineers to ship 3 features, lifting retention 15%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Illustrative report &mdash; your results reflect your own resume.
        </p>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Built for the details that decide the outcome.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Three focused checks, no guesswork &mdash; so you know exactly what
              to change before you apply.
            </p>
          </Reveal>

          <Reveal
            stagger
            className="mt-14 grid gap-10 border-t border-border pt-8 md:grid-cols-3 md:gap-12"
          >
            {features.map((feature, index) => (
              <div key={feature.title}>
                <span className="font-mono text-xs text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="flex flex-col items-start justify-between gap-9 rounded-lg bg-primary px-8 py-12 text-primary-foreground md:flex-row md:items-center md:px-14">
          <div>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Find out what your resume is hiding.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/75">
              Upload a PDF and get a clear, scored breakdown in under a minute.
              No account, no email required.
            </p>
          </div>
          <Link
            href="/analysis"
            className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-background/90 focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Analyse my resume
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
