"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl"
        >
          Analyze Your Resume.
          <br />
          <span className="text-muted-foreground">Get Hired Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          ResumeScope uses AI to review, score, and optimize your resume against
          real hiring criteria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 
               font-medium text-primary-foreground shadow-lg 
               transition hover:opacity-90 active:scale-95"
          >
            Analyze my resume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
