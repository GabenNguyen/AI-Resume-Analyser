"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  Target,
  Wand2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import { fadeUp, fadeIn } from "@/lib/motion";

const features = [
  {
    icon: FileCheck2,
    title: "Instant ATS scoring",
    desc: "See exactly how Applicant Tracking Systems parse your resume and surface hidden formatting errors before you apply.",
  },
  {
    icon: Target,
    title: "Keyword optimization",
    desc: "Match your resume against any job description and surface the missing skills recruiters are actively screening for.",
  },
  {
    icon: Wand2,
    title: "Action-driven feedback",
    desc: "Get line-by-line rewrites that turn vague bullet points into measurable, impact-led achievements.",
  },
];

export default function HomePage() {
  const previewRef = useRef<HTMLDivElement>(null);

  // GSAP: scroll-driven draw-in + progress bar fill for the dashboard mock.
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
          y: 40,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
        }).from(
          bars,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
          },
          "-=0.4"
        );
      });

      return () => mm.revert();
    },
    { scope: previewRef }
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(55%_45%_at_50%_0%,color-mix(in_oklch,var(--primary)_9%,transparent),transparent)]"
      />

      {/* HERO (framer-motion — immediate, above the fold) */}
      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-40 text-center md:pt-48">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          AI-powered resume review
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Land more interviews with a{" "}
          <span className="text-primary">resume that clears the bots.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          ResumeScope scores your CV against real ATS logic, pinpoints the gaps,
          and gives you concrete edits — so you apply with confidence.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/analysis"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Analyze your resume
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <span className="text-sm text-muted-foreground">
            Free &bull; No sign-up required
          </span>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW (GSAP scroll-driven) */}
      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        <div
          ref={previewRef}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/[0.04]"
        >
          <div className="grid md:grid-cols-[0.85fr_1.15fr]">
            {/* Sidebar mock */}
            <div className="border-b border-border bg-muted/40 p-8 md:border-b-0 md:border-r">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Overall ATS score
              </p>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="text-5xl font-semibold tracking-tight">85</span>
                <span className="mb-1 text-base font-medium text-muted-foreground">
                  / 100
                </span>
              </div>

              <div className="mt-8 space-y-6">
                {[
                  { label: "ATS parsability", value: 92, tone: "bg-emerald-500" },
                  { label: "Impact & metrics", value: 65, tone: "bg-amber-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{row.label}</span>
                      <span className="font-semibold tabular-nums">{row.value}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        data-bar
                        className={`h-full rounded-full ${row.tone}`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions mock */}
            <div className="p-8">
              <div className="mb-6 flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">AI suggestions</h3>
              </div>

              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 pl-5">
                  <span className="absolute inset-y-0 left-0 w-1 bg-destructive/70" />
                  <p className="text-xs font-medium text-muted-foreground">
                    Original
                  </p>
                  <p className="mt-1 text-sm text-foreground/70 line-through decoration-destructive/40">
                    Responsible for managing a team of 5 engineers.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] p-4 pl-5">
                  <span className="absolute inset-y-0 left-0 w-1 bg-emerald-500" />
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Recommended
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Led 5 engineers to ship 3 features, lifting retention 15%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Example output — your results will reflect your own resume.
        </p>
      </section>

      {/* FEATURES (GSAP scroll reveal + stagger) */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              A focused toolkit for fixing your resume
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Concrete feedback, not vague advice — so you can ship edits today.
            </p>
          </Reveal>

          <Reveal
            stagger
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-card p-7 transition-colors duration-200 hover:bg-muted/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA (GSAP scroll reveal) */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">
            Your next interview starts here.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            Upload a PDF and get a scored, actionable breakdown in under a minute.
          </p>
          <Link
            href="/analysis"
            className="group mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Analyze your resume
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ResumeScope. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
