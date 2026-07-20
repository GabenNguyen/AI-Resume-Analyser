"use client";

import { FileText, Github } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/analysis", label: "Analyzer" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="flex w-full max-w-5xl items-center justify-between rounded-xl border border-border bg-background/80 px-3 py-2 shadow-sm backdrop-blur-xl sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
            <FileText className="h-[18px] w-[18px]" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            ResumeScope
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-px h-px bg-primary"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="https://github.com/GabenNguyen/AI-Resume-Analyser.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
          >
            <Github className="h-[18px] w-[18px]" />
          </Link>
          <ModeToggle />
          <Link
            href="/analysis"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Analyse
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
