"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle, Zap, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Instant ATS Scoring",
      desc: "See exactly how Applicant Tracking Systems see your resume. Uncover hidden parsing errors before you apply."
    },
    {
      icon: ShieldCheck,
      title: "Keyword Optimization",
      desc: "Match your resume against any job description. We highlight the missing skills that recruiters are looking for."
    },
    {
      icon: Sparkles,
      title: "Action-Driven Feedback",
      desc: "Get line-by-line AI suggestions to transform weak bullet points into impactful, metric-driven achievements."
    }
  ];

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 selection:bg-purple-500/30 overflow-hidden">

      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-[100%] bg-purple-500/20 blur-[120px] dark:bg-purple-600/20 mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-[100%] bg-blue-500/20 blur-[120px] dark:bg-blue-600/20 mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000 delay-5000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>


      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-32 md:pt-32 md:pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm mb-10"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">AI-Powered Resume Review</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]"
        >
          Land your dream job with a <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            flawless resume.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-8 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
        >
          Stop getting rejected by automated systems. ResumeScope scans your CV, scores it against industry standards, and gives you actionable feedback to get you hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/analysis"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-base font-semibold text-white dark:text-slate-900 shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-10 dark:from-purple-400 dark:to-blue-400"></span>
            Upload your resume
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-sm text-slate-500 dark:text-slate-400">100% free &bull; No sign up required</span>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-[2.5rem] p-4 bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div className="rounded-[2rem] bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Mock */}
            <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Overall Score</h3>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-green-500">85</span>
                  <span className="text-xl font-medium text-slate-400 mb-1">/ 100</span>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ATS Parsability</span>
                  <span className="text-sm font-bold text-green-500">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-green-500 rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Impact Metrics</span>
                  <span className="text-sm font-bold text-amber-500">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-950/50">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-lg">AI Suggestions</h3>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400" />
                  <p className="text-sm text-slate-500 mb-2">Original Bullet</p>
                  <p className="text-slate-800 dark:text-slate-200 line-through decoration-red-400/50">Responsible for managing team of 5 software engineers.</p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 shadow-sm relative overflow-hidden mt-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Recommended Upgrade
                  </p>
                  <p className="text-green-900 dark:text-green-100 font-medium tracking-tight">Directed a team of 5 engineers to deliver 3 high-impact features, increasing user retention by 15%.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-24 sm:py-32 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why use ResumeScope?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">We give you the tools and insights to craft a resume that practically guarantees an interview.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your next job is waiting.</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully navigated the hiring process with a resume that stands out.
          </p>
          <div className="pt-6">
            <Link
              href="/analysis"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-purple-700 hover:scale-105 active:scale-95"
            >
              Analyze Your Resume Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-5 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} ResumeScope. All rights reserved.</p>
      </footer>
    </main>
  );
}
