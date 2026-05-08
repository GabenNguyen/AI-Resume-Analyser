"use client";

import { motion } from "framer-motion";

const steps = [
  "Upload your resume (PDF)",
  "AI analyzes structure, content & keywords",
  "Get instant feedback & improvement tips",
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-6 text-center py-16">
      {/* Animated title */}
      <motion.h2
        className="text-4xl font-bold tracking-tight sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        How <span className="font-bold italic">ResumeScope</span> Works
      </motion.h2>

      {/* Animated steps */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="relative rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/20 hover:shadow-2xl hover:-translate-y-2 transition-all dark:hover:shadow-zinc-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
          >
            <span className="text-sm font-medium text-muted-foreground">
              Step {i + 1}
            </span>
            <p className="mt-2 font-medium">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
