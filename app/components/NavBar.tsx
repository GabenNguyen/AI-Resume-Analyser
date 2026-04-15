"use client";

import { FileText, Sparkles, Github } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-5xl flex items-center justify-between rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl px-4 py-3 sm:px-6">

        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center p-2 rounded-xl bg-slate-900 dark:bg-white transition-transform group-hover:scale-105">
            <FileText className="h-5 w-5 text-white dark:text-slate-900" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
            ResumeScope
          </span>
        </Link>

        {/* CENTER: Links */}
        <div className="hidden md:flex items-center gap-8 mx-auto absolute left-1/2 -translate-x-1/2">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${pathname === '/' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400'}`}>Home</Link>
          <Link href="/analysis" className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${pathname === '/analysis' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400'}`}>Analysis</Link>
          <Link href="#" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-purple-600 dark:hover:text-purple-400">
            <Sparkles className="w-3.5 h-3.5" /> Pro (Soon)
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          <Link href="https://github.com/GabenNguyen/AI-Resume-Analyser.git" target="_blank" className="hidden sm:flex text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block mx-2"></div>
          <ModeToggle />
          <Link href="/analysis" className="ml-1 sm:ml-2 inline-flex items-center justify-center rounded-full bg-slate-900 dark:bg-white px-5 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow-md transition-transform hover:scale-105 active:scale-95">
            Score Resume
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
